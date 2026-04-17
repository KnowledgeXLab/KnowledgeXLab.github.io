---
layout: default
title: Projects
description: Ongoing and completed research projects at KnowledgeXLab.
---

<h1 class="page-title">Projects</h1>
<p class="page-subtitle">Our active and completed research initiatives.</p>

{% assign active_projects = site.data.projects | where: "status", "active" %}
{% assign completed_projects = site.data.projects | where: "status", "completed" %}

{% if active_projects.size > 0 %}
<div class="section-label">Active Projects</div>
<div class="projects-grid" style="margin-bottom: 48px;">
  {% for project in active_projects %}
  <div class="project-card">
    <div class="project-cover">
      {% if project.cover_image and project.cover_image != "" %}
        <img src="{{ project.cover_image | relative_url }}" alt="{{ project.name }}" style="width:100%;height:100%;object-fit:cover;">
      {% else %}
        {{ project.cover_emoji | default: "🔬" }}
      {% endif %}
    </div>
    <div class="project-body">
      <h3>
        {% if project.url and project.url != "" %}
          <a href="{{ project.url }}" target="_blank" rel="noopener" style="color:var(--text-primary);text-decoration:none;">{{ project.name }}</a>
        {% else %}
          {{ project.name }}
        {% endif %}
      </h3>
      <p>{{ project.description }}</p>
      <div class="project-tags">
        <span class="badge badge-accent">Active</span>
        {% for tag in project.tags %}
          <span class="badge">{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}

{% if completed_projects.size > 0 %}
<div class="section-label">Completed Projects</div>
<div class="projects-grid">
  {% for project in completed_projects %}
  <div class="project-card completed">
    <div class="project-cover" style="background: var(--bg-secondary);">
      {{ project.cover_emoji | default: "📁" }}
    </div>
    <div class="project-body">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <div class="project-tags">
        <span class="badge">Completed</span>
        {% for tag in project.tags %}
          <span class="badge">{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}
