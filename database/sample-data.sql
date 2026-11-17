-- Optional PostgreSQL seed for a manual preview. The app also creates these
-- same three stories automatically on first API access.
INSERT INTO articles(category_id,title,slug,description,content,image_path,image_alt,author,status,is_featured,published_at)
SELECT c.id, s.title, s.slug, s.description, s.content, s.image_path, s.image_alt,
       'The Daily Brief Demonstration Desk', 'published', FALSE, NOW() - s.age
FROM (VALUES
  ('politics', 'Policy choices put long-term investment in focus', 'demo-policy-investment-outlook',
   'A fictional briefing on the questions public leaders weigh when building durable investment plans.',
   'This demonstration story is fictional and previews the Politics section. Replace it with sourced reporting before publication.',
   'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=80',
   'Government buildings in a capital city', INTERVAL '0 minutes'),
  ('companies', 'Boards revisit priorities as companies plan for steady growth', 'demo-boardroom-growth-plans',
   'A sample companies story considers how leadership teams set priorities through an uncertain planning cycle.',
   'This fictional demonstration story makes no claims about real businesses. Replace it with sourced reporting before publication.',
   'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
   'Modern office meeting room', INTERVAL '15 minutes'),
  ('markets', 'Investors weigh liquidity as market conditions shift', 'demo-market-liquidity-outlook',
   'A fictional markets note on liquidity, risk appetite, and the signals investors may follow.',
   'This sample is fictional, is not investment advice, and does not describe actual market conditions.',
   'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
   'Abstract market chart display', INTERVAL '30 minutes')
) AS s(category, title, slug, description, content, image_path, image_alt, age)
JOIN categories c ON c.slug = s.category
ON CONFLICT (slug) DO NOTHING;
