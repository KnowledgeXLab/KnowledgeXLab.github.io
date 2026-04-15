---
layout: default
title: Home
research_directions:
  - icon: "🔬"
    title: "AGI for Science (AGI4S)"
    description: "Frontier research in AGI for scientific discovery and knowledge synthesis across disciplines."
  - icon: "🤖"
    title: "Continuous & Lifelong Learning"
    description: "Autonomous learning agents that evolve continuously in open and non-stationary environments."
  - icon: "👥"
    title: "Human-AI Co-evolution"
    description: "Next-generation HCI and human-in-the-loop approaches including Generative UI paradigms."
---

<!-- Hero -->
<section class="hero" id="hero-section" style="background-image: url('{{ '/assets/images/hero-lab.png' | relative_url }}')">
  <div class="hero-inner">
    <div class="badge-label">KNOWLEDGE · REASONING · AGI</div>
    <h1>Exploring <em>AGI</em> for<br>Knowledge Science</h1>
    <p>{{ site.description }}</p>
    <div class="hero-ctas">
      <a href="{{ '/publications/' | relative_url }}" class="btn btn-primary">Our Research</a>
      <a href="{{ '/people/' | relative_url }}" class="btn btn-secondary">Meet the Team →</a>
    </div>
  </div>
</section>

<!-- Stats Bar -->
<div class="stats-bar">
  <div class="stat-item">
    <div class="stat-number">{{ site.data.publications | size }}</div>
    <div class="stat-label">Publications</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">{{ site.data.people | size }}</div>
    <div class="stat-label">Members</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">{{ site.data.projects | size }}</div>
    <div class="stat-label">Projects</div>
  </div>
</div>

<!-- Research Directions -->
<div class="section-label">Research Directions</div>
<div class="research-grid">
  {% for dir in page.research_directions %}
  <div class="research-card">
    <div class="icon">{{ dir.icon }}</div>
    <h3>{{ dir.title }}</h3>
    <p>{{ dir.description }}</p>
  </div>
  {% endfor %}
</div>

<hr class="divider">

<!-- Latest News -->
<div class="section-label">Latest News</div>
<div class="news-list">
  {% for item in site.news limit:5 %}
  <div class="news-item">
    <span class="news-date {% unless forloop.first %}old{% endunless %}">{{ item.date }}</span>
    <span class="news-text">{{ item.text }}</span>
  </div>
  {% endfor %}
</div>
