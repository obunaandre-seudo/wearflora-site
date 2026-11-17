const demoArticles = [
  {
    category: 'politics',
    title: 'Policy choices put long-term investment in focus',
    slug: 'demo-policy-investment-outlook',
    description: 'A fictional briefing on the questions public leaders weigh when building durable investment plans.',
    content: 'This demonstration story uses a fictional policy discussion to preview the Politics section. Its events and claims are not real reporting. Replace it with verified coverage, clear sourcing, and editorial review before publication.',
    imagePath: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Government buildings in a capital city',
    minutesAgo: 0,
  },
  {
    category: 'companies',
    title: 'Boards revisit priorities as companies plan for steady growth',
    slug: 'demo-boardroom-growth-plans',
    description: 'A sample companies story considers how leadership teams set priorities through an uncertain planning cycle.',
    content: 'This fictional demonstration story previews company coverage and makes no claims about real businesses. Replace it with sourced reporting, named companies, and verified details before publication.',
    imagePath: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Modern office meeting room',
    minutesAgo: 15,
  },
  {
    category: 'markets',
    title: 'Investors weigh liquidity as market conditions shift',
    slug: 'demo-market-liquidity-outlook',
    description: 'A fictional markets note on liquidity, risk appetite, and the signals investors may follow.',
    content: 'This sample markets article is fictional and is included only to preview the site layout. It is not investment advice and does not describe actual market conditions.',
    imagePath: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Abstract market chart display',
    minutesAgo: 30,
  },
];

async function seedDemoContent(pool) {
  for (const article of demoArticles) {
    const [categories] = await pool.query('SELECT id FROM categories WHERE slug=? LIMIT 1', [article.category]);
    if (!categories.length) continue;

    const minutes = Math.max(0, Math.trunc(article.minutesAgo));
    const [result] = await pool.query(
      "INSERT INTO articles(category_id,title,slug,description,content,image_path,image_alt,author,status,is_featured,published_at) VALUES(?,?,?,?,?,?,?,?,?,FALSE,NOW() - INTERVAL '" + minutes + " minutes') ON CONFLICT(slug) DO NOTHING",
      [categories[0].id, article.title, article.slug, article.description, article.content, article.imagePath, article.imageAlt, 'JPMorgan Demonstration Desk', 'published'],
    );
    if (result.affectedRows) console.log('Added a clearly labeled demonstration story for ' + article.category + '.');
  }
}

module.exports = seedDemoContent;
