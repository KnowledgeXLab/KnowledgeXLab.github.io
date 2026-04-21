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
    <div class="project-cover{% if project.cover_image and project.cover_image != "" %} has-image{% endif %}">
      {% if project.cover_image and project.cover_image != "" %}
        {% if project.url and project.url != "" %}
          <a href="{{ project.url }}" target="_blank" rel="noopener" class="project-cover-link">
            <img src="{{ project.cover_image | relative_url }}" alt="{{ project.name }}">
          </a>
        {% else %}
          <img src="{{ project.cover_image | relative_url }}" alt="{{ project.name }}">
        {% endif %}
      {% else %}
        <div class="project-cover-emoji">{{ project.cover_emoji | default: "🔬" }}</div>
        <div class="project-cover-title">
          {% if project.url and project.url != "" %}
            <a href="{{ project.url }}" target="_blank" rel="noopener">{{ project.name }}</a>
          {% else %}
            {{ project.name }}
          {% endif %}
        </div>
      {% endif %}
    </div>
    <div class="project-body">
      <p>{{ project.description }}</p>
      <div class="project-footer">
        <div class="project-tags">
          <span class="badge badge-accent">Active</span>
          {% for tag in project.tags %}
            <span class="badge">{{ tag }}</span>
          {% endfor %}
        </div>
        {% if project.url and project.url != "" %}
          <a href="{{ project.url }}" target="_blank" rel="noopener" class="project-repo-link"><i class="fab fa-github"></i> Repository</a>
        {% endif %}
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
    <div class="project-cover" style="background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--border) 100%);">
      <div class="project-cover-emoji">{{ project.cover_emoji | default: "📁" }}</div>
      <div class="project-cover-title">{{ project.name }}</div>
    </div>
    <div class="project-body">
      <p>{{ project.description }}</p>
      <div class="project-footer">
        <div class="project-tags">
          <span class="badge">Completed</span>
          {% for tag in project.tags %}
            <span class="badge">{{ tag }}</span>
          {% endfor %}
        </div>
        {% if project.url and project.url != "" %}
          <a href="{{ project.url }}" target="_blank" rel="noopener" class="project-repo-link"><i class="fab fa-github"></i> Repository</a>
        {% endif %}
      </div>
    </div>
  </div>
  {% endfor %}
</div>
{% endif %}
