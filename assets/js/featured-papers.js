// assets/js/featured-papers.js
// Renders featured papers on the homepage by matching arXiv IDs
// against data/papers.json. Featured IDs are injected by Jekyll
// via window.FEATURED_IDS (from _data/featured_papers.yml).

(function () {
  'use strict';

  function extractUrl(v) {
    if (!v) return '';
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) { var f = v[0]; return f ? (f.link || f.url || f.text || '') : ''; }
    if (typeof v === 'object') return v.link || v.url || v.text || '';
    return '';
  }

  function cleanAuthors(raw) {
    if (!raw) return '';
    return raw.split(/[\n;]+/)
      .map(function (a) { return a.replace(/\s*\d+[,\d]*\s*/g, ' ').replace(/[*^∗]/g, '').trim(); })
      .filter(Boolean).join(', ');
  }

  function extractArxivId(v) {
    var url = extractUrl(v);
    var m = url.match(/(\d{4}\.\d{4,5})/);
    return m ? m[1] : '';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function normalise(raw) {
    var authors = raw['作者信息（每人一行,分号换行,数字表示单位信息,*表示Equal Contribution, ^表示通讯作者）'] || raw['作者'] || '';
    return {
      title:     raw['论文标题'] || '',
      authors:   cleanAuthors(typeof authors === 'string' ? authors : extractUrl(authors)),
      venue:     raw['期刊/会议'] || '',
      pdf:       extractUrl(raw['arXiv主页']),
      code:      extractUrl(raw['Github仓库链接']),
      project:   extractUrl(raw['刊印链接']),
      thumbnail: raw['_thumbnail'] || '',
      arxivId:   extractArxivId(raw['arXiv主页'])
    };
  }

  function render(papers) {
    var container = document.getElementById('featured-papers-list');
    if (!container) return;

    var ids = window.FEATURED_IDS || [];
    // Preserve order from FEATURED_IDS
    var map = {};
    papers.forEach(function (p) { if (p.arxivId) map[p.arxivId] = p; });
    var featured = ids.map(function (id) { return map[id]; }).filter(Boolean);

    if (!featured.length) {
      container.innerHTML = '';
      return;
    }

    var html = '<div class="featured-papers">';
    featured.forEach(function (p) {
      html += '<div class="featured-paper">';
      html += '<div class="featured-paper-meta"><span class="featured-paper-venue">' + esc(p.venue) + '</span></div>';
      html += '<div class="featured-paper-title">';
      if (p.pdf) {
        html += '<a href="' + esc(p.pdf) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>';
      } else {
        html += esc(p.title);
      }
      html += '</div>';
      if (p.authors) html += '<div class="featured-paper-authors">' + esc(p.authors) + '</div>';
      html += '<div class="featured-paper-links">';
      if (p.pdf)     html += '<a href="' + esc(p.pdf)     + '" target="_blank" rel="noopener" class="paper-link"><i class="fas fa-file-pdf"></i> PDF</a>';
      if (p.code)    html += '<a href="' + esc(p.code)    + '" target="_blank" rel="noopener" class="paper-link"><i class="fab fa-github"></i> Code</a>';
      if (p.project) html += '<a href="' + esc(p.project) + '" target="_blank" rel="noopener" class="paper-link"><i class="fas fa-newspaper"></i> Paper</a>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<div style="text-align:right;margin-top:12px;"><a href="/publications/" class="view-all-link">View all publications →</a></div>';
    container.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('featured-papers-list');
    if (!container) return;

    fetch('/data/papers.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var papers = data.filter(function (p) { return p['论文标题']; }).map(normalise);
        render(papers);
      })
      .catch(function () { container.innerHTML = ''; });
  });
})();
