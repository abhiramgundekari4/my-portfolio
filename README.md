# Next-Gen Learning Dashboard

A high-fidelity, futuristic "Student Dashboard" built using **Next.js 15 (App Router)**, **Supabase PostgreSQL**, **Tailwind CSS**, and **Framer Motion**. Designed with a premium dark-themed Bento Grid layout, hardware-accelerated animations, zero layout shifts, and full responsiveness.

---

## 🛠️ Tech Stack & Constraints

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (Strict spring-physics & hardware-accelerated transforms only)
- **Icons**: Lucide React

---

## 📐 Architecture & Component Split

This application implements a clean boundary between Server-Rendered Components (RSC) and Client-Interactive Components to optimize page load speeds, maintain secure database queries, and deliver fluid animations.

### 1. React Server Components (RSC)
- **`src/app/page.tsx`**: Functions as the primary entry point. It fetches live enrollment data from Supabase directly on the server. This keeps API keys secure and renders content instantly without client-side network roundtrips.
- **`src/app/loading.tsx`**: Renders a dedicated server-side skeleton UI matching the Bento Grid structure. The skeleton pulses gently using CSS transitions during database resolution.

### 2. Client Components (`'use client'`)
- **`src/components/dashboard/bento-grid.tsx`**: Manages the staggered entrance animations for all cards.
- **`src/components/dashboard/sidebar.tsx`**: Manages collapse/expand layout states and utilizes Framer Motion's `layoutId` to animate active indicators across navigation options.
- **`src/components/dashboard/course-card.tsx`**: Animates course progress bars from `0%` to their fetched value on mount, and handles spring-based 3D hover actions (`stiffness: 300`, `damping: 20`).
- **`src/components/dashboard/hero-tile.tsx`**: Provides an interactive weekly learning streak tracker that allows users to toggle completed days.
- **`src/components/dashboard/activity-tile.tsx`**: Renders an interactive github-style activity frequency matrix featuring hover states and tooltips.

---

## 💾 Database Schema Setup

To create the required PostgreSQL table in your Supabase dashboard, navigate to the **SQL Editor** and run the following script:

```sql
-- Create courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table courses enable row level security;

-- Allow anonymous read-only access
create policy "Allow read access to anyone" on courses
  for select using (true);

-- Seed Initial Mock Rows
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns & Concepts', 78, 'Atom'),
  ('Distributed Systems & Architecture', 42, 'Cpu'),
  ('Next.js Production Performance', 92, 'Zap'),
  ('Dynamic Framer Motion Layouts', 30, 'Sparkles');
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and copy the contents from `.env.example`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Graceful Mock Mode (Zero-Config Test)
If the `.env` variables are left blank or omitted, the application will **automatically and gracefully fall back to Sandbox Mode**. It displays a clear indicator badge and populates the dashboard with local seed data, allowing reviewers to test all layouts, animations, and micro-interactions immediately without database overhead.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
