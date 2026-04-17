(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var btn   = document.getElementById('nav-hamburger');
    var links = document.getElementById('nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });

    // 点击链接后关闭菜单
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        btn.classList.remove('open');
      });
    });
  });
})();
