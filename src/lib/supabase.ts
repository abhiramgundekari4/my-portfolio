import { createClient } from '@supabase/supabase-js';

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const defaultCourses: Course[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    progress: 75,
    icon_name: 'Code2',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Database Management Systems',
    progress: 40,
    icon_name: 'Database',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Web Development Basics',
    progress: 90,
    icon_name: 'Globe',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Object Oriented Programming',
    progress: 25,
    icon_name: 'Layers',
    created_at: new Date().toISOString(),
  },
];

export async function getCourses() {
  if (!supabase) {
    return { data: defaultCourses, isFallback: true };
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return { data: defaultCourses, isFallback: true };
    }

    return { data: data as Course[], isFallback: false };
  } catch (err) {
    console.error('Database connection failed, using defaults');
    return { data: defaultCourses, isFallback: true };
  }
}
