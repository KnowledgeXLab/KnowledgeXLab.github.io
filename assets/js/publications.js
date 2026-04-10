// assets/js/publications.js
document.addEventListener('DOMContentLoaded', function () {
  var activeYear = 'all';
  var activeTag = 'all';

  function updateVisibility() {
    document.querySelectorAll('.pub-paper').forEach(function (paper) {
      var year = paper.dataset.year;
      var tags = (paper.dataset.tags || '').split(',').map(function (t) { return t.trim(); });
      var yearMatch = activeYear === 'all' || year === activeYear;
      var tagMatch = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
      paper.classList.toggle('hidden', !(yearMatch && tagMatch));
    });

    document.querySelectorAll('.pub-year-group').forEach(function (group) {
      var visible = group.querySelectorAll('.pub-paper:not(.hidden)').length > 0;
      group.style.display = visible ? '' : 'none';
    });
  }

  document.querySelectorAll('[data-filter-year]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeYear = this.dataset.filterYear;
      document.querySelectorAll('[data-filter-year]').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      updateVisibility();
    });
  });

  document.querySelectorAll('[data-filter-tag]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeTag = this.dataset.filterTag;
      document.querySelectorAll('[data-filter-tag]').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      updateVisibility();
    });
  });
});
