---
layout: default
title: People
description: Meet the KnowledgeXLab team — faculty, PhD students, and master students.
---

<h1 class="page-title">People</h1>
<p class="page-subtitle">The researchers behind KnowledgeX Lab.</p>

<!-- Principal Investigator -->
{% assign pi = site.data.people | where: "role", "Principal Investigator" | first %}
{% if pi %}
<div class="section-label">Principal Investigator</div>
<div class="pi-card">
  <div class="avatar">
    {% if pi.photo and pi.photo != "" %}
      <img src="{{ pi.photo | relative_url }}" alt="{{ pi.name }}">
    {% else %}
      {{ pi.photo_emoji | default: "👤" }}
    {% endif %}
  </div>
  <div class="info">
    <h2>{{ pi.name }}</h2>
    <div class="role">{{ pi.role }}</div>
    <div class="bio">{{ pi.bio }}</div>
    <div class="person-links">
      {% if pi.links.scholar and pi.links.scholar != "" %}
        <a href="{{ pi.links.scholar }}" class="person-link scholar" target="_blank" rel="noopener">Google Scholar</a>
      {% endif %}
      {% if pi.links.github and pi.links.github != "" %}
        <a href="{{ pi.links.github }}" class="person-link" target="_blank" rel="noopener">GitHub</a>
      {% endif %}
      {% if pi.links.homepage and pi.links.homepage != "" %}
        <a href="{{ pi.links.homepage }}" class="person-link" target="_blank" rel="noopener">Homepage</a>
      {% endif %}
    </div>
  </div>
</div>
{% endif %}

<!-- PhD Students -->
{% assign phd = site.data.people | where: "role", "PhD Student" %}
{% if phd.size > 0 %}
<div class="section-label">PhD Students</div>
<div class="people-grid">
  {% for person in phd %}
  <div class="person-card">
    <div class="avatar">
      {% if person.photo and person.photo != "" %}
        <img src="{{ person.photo | relative_url }}" alt="{{ person.name }}">
      {% else %}
        {{ person.photo_emoji | default: "👤" }}
      {% endif %}
    </div>
    <h3>{{ person.name }}</h3>
    <div class="role">{{ person.role }}{% if person.year %} · {{ person.year }}{% endif %}</div>
    {% if person.research %}<div class="research">{{ person.research }}</div>{% endif %}
    <div class="person-links">
      {% if person.links.scholar and person.links.scholar != "" %}
        <a href="{{ person.links.scholar }}" class="person-link scholar" target="_blank" rel="noopener">Scholar</a>
      {% endif %}
      {% if person.links.github and person.links.github != "" %}
        <a href="{{ person.links.github }}" class="person-link" target="_blank" rel="noopener">GitHub</a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}

<!-- Master Students -->
{% assign masters = site.data.people | where: "role", "Master Student" %}
{% if masters.size > 0 %}
<div class="section-label">Master Students</div>
<div class="people-grid">
  {% for person in masters %}
  <div class="person-card">
    <div class="avatar">
      {% if person.photo and person.photo != "" %}
        <img src="{{ person.photo | relative_url }}" alt="{{ person.name }}">
      {% else %}
        {{ person.photo_emoji | default: "👤" }}
      {% endif %}
    </div>
    <h3>{{ person.name }}</h3>
    <div class="role">{{ person.role }}{% if person.year %} · {{ person.year }}{% endif %}</div>
    {% if person.research %}<div class="research">{{ person.research }}</div>{% endif %}
    <div class="person-links">
      {% if person.links.github and person.links.github != "" %}
        <a href="{{ person.links.github }}" class="person-link" target="_blank" rel="noopener">GitHub</a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}
