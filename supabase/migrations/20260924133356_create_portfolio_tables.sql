/*
# Portfolio Database Schema

Creates three tables for a developer portfolio:
- projects: Featured projects with title, description, tags, links, image
- skills: Categorized tech skills (Frontend, Backend, Tools)
- contact_messages: Messages submitted via the contact form

1. New Tables
- `projects`: id, title, description, tags (text[]), github_url, live_url, image_url, technologies (text[]), featured (bool), created_at, sort_order
- `skills`: id, category, name, icon, proficiency (int), sort_order, created_at
- `contact_messages`: id, name, email, message, created_at, is_read (bool)

2. Security
- RLS enabled on all tables
- projects & skills: public read (anon + authenticated), no public write (admin only via service role)
- contact_messages: public insert (anyone can submit), no public read (admin only)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  github_url text,
  live_url text,
  image_url text,
  technologies text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  icon text,
  proficiency integer NOT NULL DEFAULT 80,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_read boolean NOT NULL DEFAULT false
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Projects: public read, admin-only writes
DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

-- Skills: public read, admin-only writes
DROP POLICY IF EXISTS "public_read_skills" ON skills;
CREATE POLICY "public_read_skills" ON skills FOR SELECT
  TO anon, authenticated USING (true);

-- Contact messages: anyone can insert, admin-only read
DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Seed sample projects
INSERT INTO projects (title, description, tags, github_url, live_url, image_url, technologies, featured, sort_order)
VALUES
  ('E-Commerce Platform', 'Full-featured online store with cart, checkout, and admin dashboard. Handles 10k+ products with real-time inventory.', ARRAY['React', 'Fullstack'], 'https://github.com/dev/ecommerce', 'https://ecommerce-demo.vercel.app', 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg', ARRAY['Next.js','TypeScript','Stripe','Supabase','Tailwind'], true, 1),
  ('Task Management App', 'Collaborative kanban board with drag-and-drop, real-time updates, and team workspaces.', ARRAY['React', 'Fullstack'], 'https://github.com/dev/taskflow', 'https://taskflow-demo.vercel.app', 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg', ARRAY['React','Node.js','Socket.io','PostgreSQL'], true, 2),
  ('AI Chat Assistant', 'GPT-powered chatbot with streaming responses, conversation history, and custom prompt templates.', ARRAY['React', 'Fullstack'], 'https://github.com/dev/ai-chat', 'https://ai-chat-demo.vercel.app', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg', ARRAY['Next.js','OpenAI','Vercel AI SDK','TypeScript'], true, 3),
  ('Weather Dashboard', 'Real-time weather app with 7-day forecast, interactive maps, and location-based alerts.', ARRAY['React'], 'https://github.com/dev/weather', 'https://weather-demo.vercel.app', 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg', ARRAY['React','OpenWeather API','Chart.js','CSS'], false, 4),
  ('Portfolio Website', 'Modern developer portfolio with animations, dark mode, and responsive design.', ARRAY['React'], 'https://github.com/dev/portfolio', 'https://portfolio-demo.vercel.app', 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg', ARRAY['Next.js','Framer Motion','Tailwind','TypeScript'], false, 5),
  ('Crypto Tracker', 'Live cryptocurrency price tracker with portfolio management and price alerts.', ARRAY['React', 'Fullstack'], 'https://github.com/dev/crypto-tracker', 'https://crypto-demo.vercel.app', 'https://images.pexels.com/photos/7806145/pexels-photo-7806145.jpeg', ARRAY['React','Node.js','CoinGecko API','MongoDB'], false, 6)
ON CONFLICT DO NOTHING;

-- Seed skills
INSERT INTO skills (category, name, icon, proficiency, sort_order)
VALUES
  ('Frontend', 'React', 'SiReact', 95, 1),
  ('Frontend', 'Next.js', 'SiNextdotjs', 90, 2),
  ('Frontend', 'TypeScript', 'SiTypescript', 88, 3),
  ('Frontend', 'Tailwind CSS', 'SiTailwindcss', 92, 4),
  ('Frontend', 'HTML/CSS', 'SiHtml5', 95, 5),
  ('Frontend', 'Framer Motion', 'SiFramer', 82, 6),
  ('Backend', 'Node.js', 'SiNodedotjs', 88, 1),
  ('Backend', 'Express', 'SiExpress', 85, 2),
  ('Backend', 'PostgreSQL', 'SiPostgresql', 82, 3),
  ('Backend', 'Supabase', 'SiSupabase', 85, 4),
  ('Backend', 'Prisma', 'SiPrisma', 78, 5),
  ('Backend', 'REST APIs', 'BiServer', 90, 6),
  ('Tools', 'Git & GitHub', 'SiGithub', 92, 1),
  ('Tools', 'Docker', 'SiDocker', 75, 2),
  ('Tools', 'VS Code', 'VscVscode', 95, 3),
  ('Tools', 'Figma', 'SiFigma', 80, 4),
  ('Tools', 'Vercel', 'SiVercel', 88, 5),
  ('Tools', 'Jest', 'SiJest', 78, 6)
ON CONFLICT DO NOTHING;
