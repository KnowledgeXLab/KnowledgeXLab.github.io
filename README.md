# KnowledgeXLab Website

Official homepage for **KnowledgeX Lab**, built with Jekyll and hosted on GitHub Pages.

🌐 **Live site:** https://knowledgexlab.github.io

---

## Local Development

**Prerequisites:** Ruby via conda (system Ruby not used).

```bash
# Install dependencies (first time only)
bundle install

# Start local server
bundle exec jekyll serve
```

Open http://localhost:4000

---

## Updating Content

All content lives in `_data/` and `_config.yml` — no code changes needed.

### Add / edit a team member

Edit `_data/people.yml`:

```yaml
- name: "Firstname Lastname"
  role: "Faculty"          # Faculty | PhD Student | Master Student | Principal Investigator
  photo: "/assets/images/people/filename.jpg"
  bio: "One-line bio."
  research: "Research area"
  links:
    homepage: "https://..."
    scholar: "https://scholar.google.com/..."
    github: "https://github.com/..."
    email: "you@example.com"
```

Place the photo in `assets/images/people/`.

### Add a publication

Edit `_data/publications.yml`.

### Add a project

Edit `_data/projects.yml`.

### Update news

Edit the `news:` array in `_config.yml`.

---

## Deployment

Push to the `main` branch. GitHub Pages builds and deploys automatically.

```bash
git push origin main
```

First-time setup: go to **Settings → Pages → Source** and set branch to `main`, root `/`.

---

## Stack

| Layer | Tech |
|-------|------|
| Generator | Jekyll (github-pages gem) |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Icons | Font Awesome 6 + Academicons |
| Hosting | GitHub Pages |
