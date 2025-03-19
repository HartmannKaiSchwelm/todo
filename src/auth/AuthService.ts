import { supabase } from "../lib/supabase";

import type { User } from "@supabase/auth-js";


//  Registrierung (Sign Up)
export async function signUp(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;
  return data.user ?? null;
}

//  Login (Sign In)
export async function signIn(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
  return data.user ?? null;
}

// Logout (Sign Out)
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

//Aktuellen User abrufen
export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  
  return data.user;
}