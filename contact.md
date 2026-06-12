---
layout: default
title: Contact
description: Get in touch with KnowledgeXLab — collaborations, student applications, and general inquiries.
---

<h1 class="page-title">Get in Touch</h1>
<p class="page-subtitle">Interested in collaborating or joining the lab?<br>We'd love to hear from you.</p>

<div class="contact-grid">
  <div class="contact-card">
    <div class="icon">📧</div>
    <div>
      <div class="label">Email</div>
      <div class="value"><a href="mailto:{{ site.lab_email }}">{{ site.lab_email }}</a></div>
    </div>
  </div>

  <div class="contact-card">
    <div class="icon">📍</div>
    <div>
      <div class="label">Location</div>
      <div class="value">{{ site.lab_location }}</div>
    </div>
  </div>

  <div class="contact-card">
    <div class="icon">💻</div>
    <div>
      <div class="label">GitHub Organization</div>
      <div class="value"><a href="{{ site.lab_github }}" target="_blank" rel="noopener">{{ site.lab_github }}</a></div>
    </div>
  </div>

  <div class="contact-card">
    <div class="icon">📕</div>
    <div>
      <div class="label">Xiaohongshu</div>
      <div class="value"><a href="https://www.xiaohongshu.com/user/profile/67867a40000000000801c751" target="_blank" rel="noopener">KnowledgeXLab</a></div>
    </div>
  </div>
</div>

<div class="positions-box">
  <h3>🎓 Open Positions</h3>
  <p>
    We are looking for self-motivated PhD students and research interns with interests in
    continuous learning, knowledge reasoning, or foundation models for vertical domains.
    Send your CV and a brief research statement to our email.
  </p>
  <a href="mailto:{{ site.lab_email }}" class="btn btn-primary">Send Application →</a>
</div>
