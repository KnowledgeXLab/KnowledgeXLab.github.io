---
layout: default
title: Home
research_directions:
  - icon: "🤖"
    title: Continuous Learning & Autonomous Agent Evolution
    description: "Designing agents that accumulate knowledge over time, adapt to non-stationary environments, and self-improve across tasks — without catastrophic forgetting or human intervention."
  - icon: "🧠"
    title: "Knowledge Reasoning, Representation & Utilization"
    description: "Building expressive knowledge representations and robust multi-step reasoning capabilities that connect structured knowledge graphs with unstructured information for real-world inference and decision-making."
  - icon: "🔬"
    title: "Foundation Models for Vertical Domains"
    description: "Adapting large foundation models to specialized fields — driving breakthroughs in industrial manufacturing, materials science, and beyond through AI-powered knowledge synthesis and discovery."
---

<!-- Hero -->
<section class="hero" id="hero-section">
  <div class="hero-img-wrap" aria-hidden="true">
    <img src="{{ '/assets/images/hero-lab.jpg' | relative_url }}" alt="" class="hero-bg-img" onerror="this.style.opacity='0'">
  </div>
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

<!-- Research Directions -->
<div class="section-label" style="margin-top: 48px;">Research Directions</div>
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
    <span class="news-text">
      {% if item.links %}
        {% assign remaining_text = item.text %}
        {% for news_link in item.links %}
          {% assign news_parts = remaining_text | split: news_link.text %}
          {{ news_parts[0] }}<a href="{{ news_link.url }}" target="_blank" rel="noopener">{{ news_link.text }}</a>
          {% assign remaining_text = news_parts[1] %}
        {% endfor %}
        {{ remaining_text }}
      {% elsif item.link and item.link_text %}
        {% assign news_parts = item.text | split: item.link_text %}
        {{ news_parts[0] }}<a href="{{ item.link }}" target="_blank" rel="noopener">{{ item.link_text }}</a>{{ news_parts[1] }}
      {% elsif item.link %}
        <a href="{{ item.link }}" target="_blank" rel="noopener">{{ item.text }}</a>
      {% else %}
        {{ item.text }}
      {% endif %}
    </span>
  </div>
  {% endfor %}
</div>

<hr class="divider">

<!-- Featured Papers -->
<div class="section-label">Featured Papers</div>
<div id="featured-papers-list"><p style="color:var(--text-muted);font-size:0.875rem;">Loading…</p></div>
<script>
window.FEATURED_IDS = [{% for id in site.data.featured_papers %}"{{ id }}"{% unless forloop.last %},{% endunless %}{% endfor %}];
</script>
<script src="{{ '/assets/js/featured-papers.js' | relative_url }}"></script>
