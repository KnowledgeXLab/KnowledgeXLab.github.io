---
layout: default
title: Publications
description: Research papers published by KnowledgeX Lab.
---

<h1 class="page-title">Publications</h1>
<p class="page-subtitle">Our research output in AGI, knowledge graphs, reasoning, and HCI.</p>

<div class="filter-bar" id="year-filters">
  <button class="filter-btn active" data-filter-year="all">All Years</button>
</div>

<div class="filter-bar" style="margin-bottom: 32px;" id="tag-filters">
  <button class="filter-btn active" data-filter-tag="all">All Topics</button>
</div>

<div id="pub-list"
     data-json-url="{{ '/data/papers.json' | relative_url }}">
  <p class="pub-loading">Loading publications…</p>
</div>

<script>
// Fallback: static data from _data/publications.yml, embedded by Jekyll.
// Used only when data/papers.json is empty or unreachable.
window.STATIC_PAPERS = [
  {% for paper in site.data.publications %}
  {
    "_title":   {{ paper.title   | jsonify }},
    "_authors": {{ paper.authors | jsonify }},
    "_venue":   {{ paper.venue   | jsonify }},
    "_year":    {{ paper.year    | jsonify }},
    "_pdf":     {{ paper.pdf     | default: "" | jsonify }},
    "_code":    {{ paper.code    | default: "" | jsonify }},
    "_project": {{ paper.project | default: "" | jsonify }},
    "_tags":    {{ paper.tags    | default: "" | jsonify }},
    "_highlight": {{ paper.highlight | default: false | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];
</script>
<script src="{{ '/assets/js/publications.js' | relative_url }}"></script>
