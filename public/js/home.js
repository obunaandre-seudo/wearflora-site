(async function () {
  const N = window.Newsroom;
  const issueDate = document.getElementById('edition-date');
  if (issueDate) {
    issueDate.textContent = new Intl.DateTimeFormat('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
    }).format(new Date()).toUpperCase();
  }

  const feature = await N.fetch('/api/articles/featured').catch(() => null);
  const all = await N.fetch('/api/articles?limit=40').catch(() => []);
  const stories = Array.isArray(all) ? all : [];

  if (feature) {
    document.getElementById('feature-title').textContent = feature.title;
    document.getElementById('feature-description').textContent = feature.description;
    document.getElementById('feature-category').textContent = 'THE BIG READ / ' + feature.category.toUpperCase();
    document.getElementById('feature-link').href = '/article.html?slug=' + encodeURIComponent(feature.slug);
    if (feature.imagePath) {
      const image = document.getElementById('feature-image');
      image.src = feature.imagePath;
      image.alt = feature.imageAlt || feature.title;
      const credit = document.querySelector('.image-credit');
      if (credit) {
        credit.textContent = feature.slug === 'inheritance-claim-consumer-warning'
          ? 'SUPPLIED IMAGE — INCIDENT NOT VERIFIED'
          : 'IMAGE PROVIDED WITH STORY';
      }
    }
  }

  const picks = document.getElementById('editors-picks');
  const lead = feature || stories[0];
  if (lead) {
    const selected = stories.filter((article) => !feature || article.id !== feature.id).slice(0, 4);
    picks.innerHTML = selected.map((article) =>
      '<article class="rail-item"><div class="story-meta"><span>' + N.escape(article.category) +
      '</span><time>' + N.date(article.publishedAt) + '</time></div><h3><a href="/article.html?slug=' +
      encodeURIComponent(article.slug) + '">' + N.escape(article.title) + '</a></h3><p>' +
      N.escape(article.description) + '</p></article>',
    ).join('') || '<p class="loading">More reporting coming soon.</p>';
  }

  const latest = document.getElementById('latest-grid');
  latest.innerHTML = stories.slice(0, 5).map((article) => N.card(article, false)).join('') ||
    '<p class="loading">No stories have been published yet. Check back for the latest edition.</p>';

  const briefing = document.getElementById('briefing-grid');
  briefing.innerHTML = stories.slice(5, 7).map((article) => N.card(article, true)).join('') ||
    '<p class="loading">New perspectives are on the way.</p>';

  document.querySelectorAll('.category-grid[data-category]').forEach(async (element) => {
    const category = element.dataset.category;
    const list = await N.fetch('/api/articles?category=' + encodeURIComponent(category) + '&limit=3').catch(() => []);
    element.innerHTML = (Array.isArray(list) ? list : []).map((article) => N.card(article, true)).join('') ||
      '<p class="loading">New ' + N.escape(category) + ' reporting coming soon.</p>';
  });

  const form = document.getElementById('newsletter-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('newsletter-message');
    try {
      await N.fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: document.getElementById('newsletter-email').value }),
      });
      message.textContent = 'You are on the list. Look out for the next edition.';
      form.reset();
    } catch (error) {
      message.textContent = error.message;
    }
  });
})();
