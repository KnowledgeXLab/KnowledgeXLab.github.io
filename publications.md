---
layout: default
title: Publications
description: Research papers published by KnowledgeX Lab.
---

<h1 class="page-title">Publications</h1>
<p class="page-subtitle">Our research output in AGI, knowledge graphs, reasoning, and HCI.</p>

{% assign all_years = site.data.publications | map: "year" | uniq | sort | reverse %}
{% assign all_tags_nested = site.data.publications | map: "tags" %}
{% assign all_tags = "" | split: "" %}
{% for tag_list in all_tags_nested %}
  {% for tag in tag_list %}
    {% unless all_tags contains tag %}
      {% assign all_tags = all_tags | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}

<div class="filter-bar">
  <button class="filter-btn active" data-filter-year="all">All Years</button>
  {% for year in all_years %}
  <button class="filter-btn" data-filter-year="{{ year }}">{{ year }}</button>
  {% endfor %}
</div>

<div class="filter-bar" style="margin-bottom: 32px;">
  <button class="filter-btn active" data-filter-tag="all">All Topics</button>
  {% for tag in all_tags %}
  <button class="filter-btn" data-filter-tag="{{ tag }}">{{ tag }}</button>
  {% endfor %}
</div>

{% for year in all_years %}
{% assign year_papers = site.data.publications | where: "year", year %}
{% if year_papers.size > 0 %}
<div class="pub-year-group">
  <div class="section-label">{{ year }}</div>
  {% for paper in year_papers %}
  <div class="pub-paper {% if paper.highlight %}highlight{% endif %}"
       data-year="{{ paper.year }}"
       data-tags="{{ paper.tags | join: ', ' }}">
    <div class="pub-title">{{ paper.title }}</div>
    <div class="pub-authors">{{ paper.authors }}</div>
    <div class="pub-meta">
      <span class="pub-venue">{{ paper.venue }}</span>
      {% if paper.pdf and paper.pdf != "" %}
        <span class="pub-separator">·</span>
        <a href="{{ paper.pdf }}" class="pub-link" target="_blank" rel="noopener">📄 PDF</a>
      {% endif %}
      {% if paper.code and paper.code != "" %}
        <span class="pub-separator">·</span>
        <a href="{{ paper.code }}" class="pub-link" target="_blank" rel="noopener">💻 Code</a>
      {% endif %}
      {% if paper.project and paper.project != "" %}
        <span class="pub-separator">·</span>
        <a href="{{ paper.project }}" class="pub-link" target="_blank" rel="noopener">🌐 Project</a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}
{% endfor %}

<script src="{{ '/assets/js/publications.js' | relative_url }}"></script>
