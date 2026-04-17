// assets/js/publications.js
// Fetches data/papers.json (synced from Feishu) and renders the publications
// page with thumbnail cards. Falls back to window.STATIC_PAPERS when the JSON
// is empty or fails.

(function () {
  'use strict';

  // ── Field-name detection ──────────────────────────────────────────────────

  var FIELD_PATTERNS = {
    title:     ['论文标题', 'title', '标题', '题目', '论文', 'paper', 'name'],
    authors:   ['作者信息', '作者', 'author', '参与者'],
    venue:     ['期刊/会议', '期刊', '会议', 'venue', 'conference', 'journal', 'publish', '发表', '来源'],
    publishedAt: ['论文发表日期', '发表日期', 'publication date', 'published at', 'published', 'date'],
    pdf:       ['arXiv主页', 'arxiv', 'pdf', '链接', 'link', 'url'],
    code:      ['Github仓库链接', 'github', 'code', '代码', 'repo', '仓库'],
    project:   ['刊印链接', 'project', '项目页', '主页', '刊印'],
    tags:      ['录用类型', '标签', '分类', 'tag', '类别', 'topic', 'keyword', '关键词'],
    thumbnail: ['_thumbnail', 'thumbnail', '封面', '缩略图']
  };

  function detectKey(keys, fieldType) {
    var patterns = FIELD_PATTERNS[fieldType] || [];
    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i].toLowerCase();
      for (var j = 0; j < keys.length; j++) {
        if (keys[j].toLowerCase().indexOf(p) !== -1) return keys[j];
      }
    }
    return null;
  }

  function extractUrl(v) {
    if (!v) return '';
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) {
      var first = v[0];
      if (!first) return '';
      return first.link || first.url || first.text || '';
    }
    if (typeof v === 'object') return v.link || v.url || v.text || '';
    return '';
  }

  function cleanAuthors(raw) {
    if (!raw) return '';
    return raw
      .split(/[\n;]+/)
      .map(function (a) { return a.replace(/\s*\d+[,\d]*\s*/g, ' ').replace(/[*^∗]/g, '').trim(); })
      .filter(Boolean)
      .join(', ');
  }

  function yearFromPublishedAt(value) {
    if (value === null || value === undefined || value === '') return '';

    if (typeof value === 'number' || /^\d+$/.test(String(value).trim())) {
      var ts = Number(value);
      if (!Number.isNaN(ts) && ts > 0) {
        return String(new Date(ts).getUTCFullYear());
      }
    }

    var text = String(value).trim();
    var m = text.match(/\b(20\d{2})\b/);
    if (m) return m[1];

    var parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? '' : String(parsed.getUTCFullYear());
  }

  function normalise(raw, map) {
    var venue   = map.venue   ? (raw[map.venue]   || '') : '';
    var authors = map.authors ? (raw[map.authors]  || '') : '';
    var publishedAt = map.publishedAt ? (raw[map.publishedAt] || '') : '';
    var tags    = [];

    if (map.tags && raw[map.tags]) {
      var rawTags = raw[map.tags];
      if (Array.isArray(rawTags)) {
        tags = rawTags.map(function (t) {
          return (typeof t === 'object') ? (t.text || t.name || String(t)) : String(t);
        });
      } else {
        tags = String(rawTags).split(/[,，\s]+/).filter(Boolean);
      }
    }

    return {
      title:     map.title     ? (raw[map.title]     || '') : '',
      authors:   cleanAuthors(typeof authors === 'string' ? authors : extractUrl(authors)),
      venue:     typeof venue === 'string' ? venue : extractUrl(venue),
      year:      yearFromPublishedAt(publishedAt),
      pdf:       map.pdf       ? extractUrl(raw[map.pdf])       : '',
      code:      map.code      ? extractUrl(raw[map.code])      : '',
      project:   map.project   ? extractUrl(raw[map.project])   : '',
      tags:      tags,
      thumbnail: map.thumbnail ? (raw[map.thumbnail] || '')     : ''
    };
  }

  function buildMap(keys) {
    var map = {};
    ['title', 'authors', 'venue', 'publishedAt', 'pdf', 'code', 'project', 'tags', 'thumbnail'].forEach(function (f) {
      map[f] = detectKey(keys, f);
    });
    return map;
  }

  // ── Rendering ─────────────────────────────────────────────────────────────

  var activeYear = 'all';
  var activeTag  = 'all';

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPapers(papers) {
    var groups = {};
    papers.forEach(function (p) {
      var y = p.year || 'Other';
      if (!groups[y]) groups[y] = [];
      groups[y].push(p);
    });

    var years = Object.keys(groups).sort(function (a, b) {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      return b.localeCompare(a);
    });

    var allTags = [];
    papers.forEach(function (p) {
      p.tags.forEach(function (t) {
        if (t && allTags.indexOf(t) === -1) allTags.push(t);
      });
    });

    // Populate filter bars
    var yearBar = document.getElementById('year-filters');
    if (yearBar) {
      yearBar.innerHTML = '<button class="filter-btn active" data-filter-year="all">All Years</button>';
      years.forEach(function (y) {
        var btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filterYear = y;
        btn.textContent = y;
        yearBar.appendChild(btn);
      });
    }

    var tagBar = document.getElementById('tag-filters');
    if (tagBar) {
      tagBar.innerHTML = '<button class="filter-btn active" data-filter-tag="all">All Topics</button>';
      allTags.forEach(function (t) {
        var btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filterTag = t;
        btn.textContent = t;
        tagBar.appendChild(btn);
      });
    }

    // Build HTML
    var html = '';
    years.forEach(function (y) {
      html += '<div class="pub-year-group">';
      html += '<div class="section-label">' + esc(y) + '</div>';
      groups[y].forEach(function (p) {
        var tagsStr = p.tags.join(', ');
        html += '<div class="pub-card" data-year="' + esc(p.year) + '" data-tags="' + esc(tagsStr) + '">';

        // Thumbnail
        if (p.thumbnail) {
          html += '<div class="pub-thumb">';
          html += '<img src="' + esc(p.thumbnail) + '" alt="" loading="lazy">';
          html += '</div>';
        }

        // Text content
        html += '<div class="pub-body">';
        html += '<div class="pub-title">' + esc(p.title) + '</div>';
        if (p.authors) html += '<div class="pub-authors">' + esc(p.authors) + '</div>';
        html += '<div class="pub-meta">';
        if (p.venue) html += '<span class="pub-venue">' + esc(p.venue) + '</span>';
        if (p.pdf) {
          html += '<span class="pub-separator">&middot;</span>';
          html += '<a href="' + esc(p.pdf) + '" class="pub-link" target="_blank" rel="noopener">PDF</a>';
        }
        if (p.code) {
          html += '<span class="pub-separator">&middot;</span>';
          html += '<a href="' + esc(p.code) + '" class="pub-link" target="_blank" rel="noopener">Code</a>';
        }
        if (p.project) {
          html += '<span class="pub-separator">&middot;</span>';
          html += '<a href="' + esc(p.project) + '" class="pub-link" target="_blank" rel="noopener">Paper</a>';
        }
        if (tagsStr) {
          html += '<span class="pub-separator">&middot;</span>';
          p.tags.forEach(function (t) {
            html += '<span class="pub-tag">' + esc(t) + '</span>';
          });
        }
        html += '</div>';  // pub-meta
        html += '</div>';  // pub-body
        html += '</div>';  // pub-card
      });
      html += '</div>';  // pub-year-group
    });

    var list = document.getElementById('pub-list');
    if (list) list.innerHTML = html || '<p class="pub-loading">No publications found.</p>';

    attachFilters();
  }

  function renderStatic() {
    var papers = (window.STATIC_PAPERS || []).map(function (p) {
      return {
        title:     p._title   || '',
        authors:   p._authors || '',
        venue:     p._venue   || '',
        year:      String(p._year || ''),
        pdf:       p._pdf     || '',
        code:      p._code    || '',
        project:   p._project || '',
        tags:      Array.isArray(p._tags) ? p._tags : (p._tags ? [p._tags] : []),
        thumbnail: ''
      };
    });
    renderPapers(papers);
  }

  // ── Filter logic ──────────────────────────────────────────────────────────

  function updateVisibility() {
    document.querySelectorAll('.pub-card').forEach(function (el) {
      var yearMatch = activeYear === 'all' || el.dataset.year === activeYear;
      var tags = (el.dataset.tags || '').split(',').map(function (t) { return t.trim(); });
      var tagMatch = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
      el.classList.toggle('hidden', !(yearMatch && tagMatch));
    });
    document.querySelectorAll('.pub-year-group').forEach(function (g) {
      g.style.display = g.querySelectorAll('.pub-card:not(.hidden)').length ? '' : 'none';
    });
  }

  function attachFilters() {
    document.querySelectorAll('[data-filter-year]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeYear = this.dataset.filterYear;
        document.querySelectorAll('[data-filter-year]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        updateVisibility();
      });
    });
    document.querySelectorAll('[data-filter-tag]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeTag = this.dataset.filterTag;
        document.querySelectorAll('[data-filter-tag]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        updateVisibility();
      });
    });
  }

  // ── Entry point ───────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    var list = document.getElementById('pub-list');
    var jsonUrl = list ? list.dataset.jsonUrl : '/data/papers.json';

    fetch(jsonUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data) || data.length === 0) {
          renderStatic();
          return;
        }
        var allKeys = [];
        data.forEach(function (rec) {
          Object.keys(rec).forEach(function (k) {
            if (allKeys.indexOf(k) === -1) allKeys.push(k);
          });
        });
        var map = buildMap(allKeys);
        var papers = data
          .map(function (rec) { return normalise(rec, map); })
          .filter(function (p) { return p.title && p.title !== '(No title)'; });
        renderPapers(papers);
      })
      .catch(function () {
        renderStatic();
      });
  });
})();
