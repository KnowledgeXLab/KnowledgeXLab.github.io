---
layout: default
title: Team
description: Meet the KnowledgeXLab team — faculty, PhD students, and master students.
---

<h1 class="page-title">Team</h1>
<p class="page-subtitle">The researchers behind KnowledgeXLab.</p>

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
      {% if pi.links.homepage and pi.links.homepage != "" %}
        <a href="{{ pi.links.homepage }}" class="icon-link" target="_blank" rel="noopener" title="Homepage"><i class="fas fa-house"></i></a>
      {% endif %}
      {% if pi.links.scholar and pi.links.scholar != "" %}
        <a href="{{ pi.links.scholar }}" class="icon-link" target="_blank" rel="noopener" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>
      {% endif %}
      {% if pi.links.github and pi.links.github != "" %}
        <a href="{{ pi.links.github }}" class="icon-link" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
      {% endif %}
      {% if pi.links.email and pi.links.email != "" %}
        <a href="mailto:{{ pi.links.email }}" class="icon-link" title="Email"><i class="fas fa-envelope"></i></a>
      {% endif %}
    </div>
  </div>
</div>
{% endif %}

<!-- Faculty -->
{% assign faculty = site.data.people | where: "role", "Faculty" %}
{% if faculty.size > 0 %}
<div class="section-label">Faculty</div>
<div class="people-grid">
  {% for person in faculty %}
  <div class="person-card">
    <div class="avatar{% if person.cartoon and person.cartoon != "" %} has-cartoon{% endif %}">
      {% if person.photo and person.photo != "" %}
        <img class="photo-real" src="{{ person.photo | relative_url }}" alt="{{ person.name }}">
      {% else %}
        {{ person.photo_emoji | default: "👤" }}
      {% endif %}
      {% if person.cartoon and person.cartoon != "" %}
        <img class="photo-cartoon" src="{{ person.cartoon | relative_url }}" alt="{{ person.name }} cartoon">
      {% endif %}
    </div>
    <h3>{{ person.name }}</h3>
    {% if person.research %}<div class="research">{{ person.research }}</div>{% endif %}
    <div class="person-links">
      {% if person.links.homepage and person.links.homepage != "" %}
        <a href="{{ person.links.homepage }}" class="icon-link" target="_blank" rel="noopener" title="Homepage"><i class="fas fa-house"></i></a>
      {% endif %}
      {% if person.links.scholar and person.links.scholar != "" %}
        <a href="{{ person.links.scholar }}" class="icon-link" target="_blank" rel="noopener" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>
      {% endif %}
      {% if person.links.github and person.links.github != "" %}
        <a href="{{ person.links.github }}" class="icon-link" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
      {% endif %}
      {% if person.links.email and person.links.email != "" %}
        <a href="mailto:{{ person.links.email }}" class="icon-link" title="Email"><i class="fas fa-envelope"></i></a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
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
      {% if person.links.homepage and person.links.homepage != "" %}
        <a href="{{ person.links.homepage }}" class="icon-link" target="_blank" rel="noopener" title="Homepage"><i class="fas fa-house"></i></a>
      {% endif %}
      {% if person.links.scholar and person.links.scholar != "" %}
        <a href="{{ person.links.scholar }}" class="icon-link" target="_blank" rel="noopener" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>
      {% endif %}
      {% if person.links.github and person.links.github != "" %}
        <a href="{{ person.links.github }}" class="icon-link" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
      {% endif %}
      {% if person.links.email and person.links.email != "" %}
        <a href="mailto:{{ person.links.email }}" class="icon-link" title="Email"><i class="fas fa-envelope"></i></a>
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
    <div class="avatar{% if person.cartoon and person.cartoon != "" %} has-cartoon{% endif %}">
      {% if person.photo and person.photo != "" %}
        <img class="photo-real" src="{{ person.photo | relative_url }}" alt="{{ person.name }}">
      {% else %}
        {{ person.photo_emoji | default: "👤" }}
      {% endif %}
      {% if person.cartoon and person.cartoon != "" %}
        <img class="photo-cartoon" src="{{ person.cartoon | relative_url }}" alt="{{ person.name }} cartoon">
      {% endif %}
    </div>
    <h3>{{ person.name }}</h3>
    <div class="role">{{ person.role }}{% if person.year %} · {{ person.year }}{% endif %}</div>
    {% if person.research %}<div class="research">{{ person.research }}</div>{% endif %}
    <div class="person-links">
      {% if person.links.homepage and person.links.homepage != "" %}
        <a href="{{ person.links.homepage }}" class="icon-link" target="_blank" rel="noopener" title="Homepage"><i class="fas fa-house"></i></a>
      {% endif %}
      {% if person.links.scholar and person.links.scholar != "" %}
        <a href="{{ person.links.scholar }}" class="icon-link" target="_blank" rel="noopener" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>
      {% endif %}
      {% if person.links.github and person.links.github != "" %}
        <a href="{{ person.links.github }}" class="icon-link" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
      {% endif %}
      {% if person.links.email and person.links.email != "" %}
        <a href="mailto:{{ person.links.email }}" class="icon-link" title="Email"><i class="fas fa-envelope"></i></a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}

<!-- Joint Ph.D. -->
{% assign jointphd = site.data.people | where: "role", "Joint Ph.D." %}
{% if jointphd.size > 0 %}
<div class="section-label">Joint Ph.D.</div>
<div class="people-grid">
  {% for person in jointphd %}
  <div class="person-card">
    <div class="avatar{% if person.cartoon and person.cartoon != "" %} has-cartoon{% endif %}">
      {% if person.photo and person.photo != "" %}
        <img class="photo-real" src="{{ person.photo | relative_url }}" alt="{{ person.name }}">
      {% else %}
        {{ person.photo_emoji | default: "👤" }}
      {% endif %}
      {% if person.cartoon and person.cartoon != "" %}
        <img class="photo-cartoon" src="{{ person.cartoon | relative_url }}" alt="{{ person.name }} cartoon">
      {% endif %}
    </div>
    <h3>{{ person.name }}</h3>
    {% if person.research %}<div class="research">{{ person.research }}</div>{% endif %}
    <div class="person-links">
      {% if person.links.homepage and person.links.homepage != "" %}
        <a href="{{ person.links.homepage }}" class="icon-link" target="_blank" rel="noopener" title="Homepage"><i class="fas fa-house"></i></a>
      {% endif %}
      {% if person.links.scholar and person.links.scholar != "" %}
        <a href="{{ person.links.scholar }}" class="icon-link" target="_blank" rel="noopener" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>
      {% endif %}
      {% if person.links.github and person.links.github != "" %}
        <a href="{{ person.links.github }}" class="icon-link" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
      {% endif %}
      {% if person.links.email and person.links.email != "" %}
        <a href="mailto:{{ person.links.email }}" class="icon-link" title="Email"><i class="fas fa-envelope"></i></a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}
