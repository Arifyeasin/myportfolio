import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  technologies: string[];
  featured: boolean;
  sort_order: number;
  created_at: string;
};

export type Skill = {
  id: string;
  category: string;
  name: string;
  icon: string | null;
  proficiency: number;
  sort_order: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
};
