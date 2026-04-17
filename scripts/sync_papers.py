"""
sync_papers.py — Pull all records from a Feishu bitable table, fetch the first
                 figure from each paper's arXiv HTML page, and write
                 data/papers.json + assets/images/papers/*.

Required environment variables:
    FEISHU_APP_ID      — app credential id
    FEISHU_APP_SECRET  — app credential secret
    FEISHU_APP_TOKEN   — bitable app token
    FEISHU_TABLE_ID    — table id
"""

import json
import os
import re
import sys
import time
from html.parser import HTMLParser
from urllib.parse import urljoin

import requests

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
IMG_DIR = os.path.join(ROOT, "assets", "images", "papers")
DATA_DIR = os.path.join(ROOT, "data")
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; KnowledgeXLab-bot/1.0)"}

# ── 1. Read environment variables ──────────────────────────────────────────

REQUIRED = ["FEISHU_APP_ID", "FEISHU_APP_SECRET", "FEISHU_APP_TOKEN", "FEISHU_TABLE_ID"]
env = {}
missing = []

for key in REQUIRED:
    val = os.environ.get(key, "").strip()
    if not val:
        missing.append(key)
    env[key] = val

if missing:
    print(f"[ERROR] Missing required environment variables: {', '.join(missing)}", file=sys.stderr)
    sys.exit(1)

APP_ID     = env["FEISHU_APP_ID"]
APP_SECRET = env["FEISHU_APP_SECRET"]
APP_TOKEN  = env["FEISHU_APP_TOKEN"]
TABLE_ID   = env["FEISHU_TABLE_ID"]

# ── 2. Get tenant_access_token ─────────────────────────────────────────────

def get_tenant_access_token(app_id: str, app_secret: str) -> str:
    url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/"
    resp = requests.post(url, json={"app_id": app_id, "app_secret": app_secret}, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    if data.get("code") != 0:
        raise RuntimeError(f"Failed to get token: {data}")
    return data["tenant_access_token"]

# ── 3. Fetch all records (with pagination) ─────────────────────────────────

def fetch_all_records(token: str, app_token: str, table_id: str) -> list[dict]:
    url = f"https://open.feishu.cn/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records"
    headers = {"Authorization": f"Bearer {token}"}
    records = []
    page_token = None

    while True:
        params = {"page_size": 100}
        if page_token:
            params["page_token"] = page_token

        resp = requests.get(url, headers=headers, params=params, timeout=15)
        resp.raise_for_status()
        body = resp.json()

        if body.get("code") != 0:
            raise RuntimeError(f"API error: {body}")

        items = body.get("data", {}).get("items", [])
        records.extend(items)

        if body.get("data", {}).get("has_more"):
            page_token = body["data"]["page_token"]
        else:
            break

    return records

# ── 4. arXiv figure extraction ─────────────────────────────────────────────

class FigureFinder(HTMLParser):
    """Find the first <img> src inside a <figure> tag."""
    def __init__(self):
        super().__init__()
        self.imgs: list[str] = []
        self._in_figure = False

    def handle_starttag(self, tag, attrs):
        if tag == "figure":
            self._in_figure = True
        if tag == "img" and self._in_figure:
            d = dict(attrs)
            src = d.get("src", "")
            if src:
                self.imgs.append(src)

    def handle_endtag(self, tag):
        if tag == "figure":
            self._in_figure = False


def extract_arxiv_id(link: str) -> str | None:
    """Extract arXiv ID like '2510.08002' from various URL forms."""
    m = re.search(r"(\d{4}\.\d{4,5})", link)
    return m.group(1) if m else None


def fetch_first_figure(arxiv_id: str) -> str | None:
    """Download first figure from arXiv HTML and return its local relative path,
    or None if unavailable."""
    html_url = f"https://arxiv.org/html/{arxiv_id}"
    try:
        resp = requests.get(html_url, headers=HEADERS, timeout=20)
        if resp.status_code != 200:
            return None
    except requests.RequestException:
        return None

    parser = FigureFinder()
    parser.feed(resp.text)
    if not parser.imgs:
        return None

    img_src = parser.imgs[0]

    # Build full image URL (src may be relative).
    # arXiv img srcs are relative — try with trailing slash first (resolves as
    # subdirectory), fall back to without (resolves as sibling).
    if img_src.startswith("http"):
        candidate_urls = [img_src]
    else:
        candidate_urls = [
            urljoin(html_url + "/", img_src),
            urljoin(html_url, img_src),
        ]

    # Determine file extension
    ext = os.path.splitext(img_src.split("?")[0])[-1] or ".png"
    local_name = f"{arxiv_id}{ext}"
    local_path = os.path.join(IMG_DIR, local_name)

    # Skip download if file already exists and is non-empty
    if os.path.isfile(local_path) and os.path.getsize(local_path) > 0:
        return f"/assets/images/papers/{local_name}"

    img_resp = None
    for img_url in candidate_urls:
        try:
            r = requests.get(img_url, headers=HEADERS, timeout=20)
            if r.status_code == 200 and len(r.content) >= 500:
                img_resp = r
                break
        except requests.RequestException:
            continue
    if img_resp is None:
        return None

    with open(local_path, "wb") as f:
        f.write(img_resp.content)

    return f"/assets/images/papers/{local_name}"


def get_arxiv_link(fields: dict) -> str:
    """Extract the arXiv URL from a record's fields."""
    val = fields.get("arXiv主页")
    if not val:
        return ""
    if isinstance(val, dict):
        return val.get("link") or val.get("text") or ""
    return str(val)

# ── 5. Main ────────────────────────────────────────────────────────────────

def main():
    os.makedirs(IMG_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)

    print("[INFO] Fetching tenant_access_token ...")
    try:
        token = get_tenant_access_token(APP_ID, APP_SECRET)
    except Exception as e:
        print(f"[ERROR] Could not obtain access token: {e}", file=sys.stderr)
        sys.exit(1)

    print(f"[INFO] Fetching records from table {TABLE_ID} ...")
    try:
        records = fetch_all_records(token, APP_TOKEN, TABLE_ID)
    except Exception as e:
        print(f"[ERROR] Could not fetch records: {e}", file=sys.stderr)
        sys.exit(1)

    papers = [rec["fields"] for rec in records]

    # Fetch thumbnails from arXiv
    img_count = 0
    for i, fields in enumerate(papers):
        title = fields.get("论文标题", "")
        if not title:
            continue

        arxiv_link = get_arxiv_link(fields)
        if not arxiv_link:
            print(f"  [{i+1}] No arXiv link — {title[:50]}")
            continue

        arxiv_id = extract_arxiv_id(arxiv_link)
        if not arxiv_id:
            print(f"  [{i+1}] Bad arXiv ID — {title[:50]}")
            continue

        thumb = fetch_first_figure(arxiv_id)
        if thumb:
            fields["_thumbnail"] = thumb
            img_count += 1
            print(f"  [{i+1}] OK  {thumb}")
        else:
            print(f"  [{i+1}] No figure — {title[:50]}")

        # Be polite to arXiv — small delay between requests
        time.sleep(1)

    out_path = os.path.join(DATA_DIR, "papers.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(papers, f, ensure_ascii=False, indent=2)

    print(f"\n[OK] Synced {len(papers)} records, {img_count} thumbnails → {out_path}")

if __name__ == "__main__":
    main()
