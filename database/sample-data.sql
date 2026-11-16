USE jpmorgan_news;
-- Optional editorial demonstration copy. Replace or remove these stories before a live launch.
INSERT INTO articles(category_id,title,slug,description,content,image_path,image_alt,author,status,is_featured,published_at)
SELECT c.id,'How a changing trade map is reshaping global capital','demo-global-capital','An illustrative briefing on how shifting supply chains can alter the geography of investment.','This demonstration story explores a broad editorial theme: the way trade routes and investment priorities evolve together. The reporting and figures in this sample are fictional and are included only to preview the publishing experience.\n\nA live newsroom would replace this copy with sourced reporting, expert interviews and clearly attributed data. Readers should treat this sample as a design demonstration, not financial guidance.','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85','Glass towers in a city financial district','JPMorgan Demonstration Desk','published',TRUE,NOW()
FROM categories c WHERE c.slug='economy'
ON DUPLICATE KEY UPDATE title=VALUES(title);
INSERT INTO articles(category_id,title,slug,description,content,image_path,image_alt,author,status,is_featured,published_at)
SELECT c.id,'Policy makers weigh the next chapter of growth','demo-policy-growth','A sample politics briefing examines the choices facing public institutions in a changing economy.','This demonstration article is fictional. It shows how policy coverage and economic context appear in the newsroom.\n\nReplace this sample with verified reporting before public use.','https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=80','Government buildings in a capital city','JPMorgan Demonstration Desk','published',FALSE,NOW()-INTERVAL 1 HOUR
FROM categories c WHERE c.slug='politics'
ON DUPLICATE KEY UPDATE title=VALUES(title);
INSERT INTO articles(category_id,title,slug,description,content,image_path,image_alt,author,status,is_featured,published_at)
SELECT c.id,'Leadership teams adapt to a more deliberate deal cycle','demo-company-outlook','A fictional companies report on strategy, investment and the decisions shaping corporate outlooks.','This sample provides demonstration copy for the companies section. It contains no real company claims or market-moving information.\n\nA published newsroom article should include its sources and reporting methodology.','https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80','Modern office meeting room','JPMorgan Demonstration Desk','published',FALSE,NOW()-INTERVAL 2 HOUR
FROM categories c WHERE c.slug='companies'
ON DUPLICATE KEY UPDATE title=VALUES(title);
INSERT INTO articles(category_id,title,slug,description,content,image_path,image_alt,author,status,is_featured,published_at)
SELECT c.id,'Investors look for resilience across a shifting market cycle','demo-market-cycle','An illustrative markets note on risk, resilience and the questions investors are asking.','This fictional sample demonstrates the markets article layout. It is not investment advice and makes no claim about actual market conditions.','https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80','Abstract market chart display','JPMorgan Demonstration Desk','published',FALSE,NOW()-INTERVAL 3 HOUR
FROM categories c WHERE c.slug='markets'
ON DUPLICATE KEY UPDATE title=VALUES(title);
INSERT INTO articles(category_id,title,slug,description,content,image_path,image_alt,author,status,is_featured,published_at)
SELECT c.id,'The infrastructure questions behind the AI investment boom','demo-ai-infrastructure','A demonstration technology feature considers power, compute and the next phase of AI investment.','This sample technology feature is fictional and is supplied for preview only. Replace it with independently reported and fact-checked content before launch.','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80','Electronic circuit board detail','JPMorgan Demonstration Desk','published',FALSE,NOW()-INTERVAL 4 HOUR
FROM categories c WHERE c.slug='technology'
ON DUPLICATE KEY UPDATE title=VALUES(title);
