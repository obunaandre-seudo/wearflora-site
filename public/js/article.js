(async function () {
  const N = window.Newsroom;
  const slug = new URLSearchParams(location.search).get('slug');
  const root = document.getElementById('article-content');

  if (!slug) {
    root.innerHTML = '<p class="empty-state">No story was selected.</p>';
    return;
  }

  try {
    const article = await N.fetch('/api/articles/' + encodeURIComponent(slug));
    document.title = article.title + ' — The Daily Brief';
    const linkify = (text) => N.escape(text).replace(
      /https:\/\/[^\s<>]+/g,
      (url) => '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>',
    );
    const body = article.content
      .split(/\n\s*\n/)
      .filter(Boolean)
      .map((paragraph) => '<p>' + linkify(paragraph).replace(/\n/g, '<br>') + '</p>')
      .join('');

    root.innerHTML = '<div class="article-back"><a href="/news.html">&larr; BACK TO LATEST</a></div>' +
      '<article><div class="article-heading"><p class="section-kicker">' + N.escape(article.category) +
      ' / ' + N.date(article.publishedAt) + '</p><h1>' + N.escape(article.title) +
      '</h1><p class="article-deck">' + N.escape(article.description) +
      '</p><p class="byline">BY ' + N.escape(article.author || 'Editorial Desk') +
      '</p></div>' + (article.imagePath
        ? '<figure><img src="' + N.escape(article.imagePath) + '" alt="' +
          N.escape(article.imageAlt || article.title) + '">' +
          (article.slug === 'inheritance-claim-consumer-warning'
            ? '<figcaption>Publisher-supplied image; not independently verified as the incident described.</figcaption>'
            : '') + '</figure>'
        : '') + '<div class="article-body">' + body + '</div></article></main>';
  } catch (error) {
    root.innerHTML = '<div class="article-back"><a href="/news.html">&larr; BACK TO LATEST</a></div>' +
      '<p class="empty-state">' + N.escape(error.message) + '</p>';
  }
})();
