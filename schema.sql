-- Create the courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row level security (RLS) setup (optional, but standard for human-made projects)
alter table courses enable row level security;

-- Enable select policy for anonymous/authenticated read-only access
create policy "Allow read access to anyone" on courses
  for select using (true);

-- Seed mock data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns & Concepts', 78, 'Atom'),
  ('Distributed Systems & Architecture', 42, 'Cpu'),
  ('Next.js Production Performance', 92, 'Zap'),
  ('Dynamic Framer Motion Layouts', 30, 'Sparkles');
