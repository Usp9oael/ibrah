import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { supabase } from '../../supabaseClient';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  constructor() {
    // update auth state on changes
    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      this.authState.next(!!session);
    });

    // initialise current auth state
    (async () => {
      const { data } = await supabase.auth.getSession();
      this.authState.next(!!data.session);
    })();
  }

  /** Register user and create profiles row */
  async registerUserAndProfile(email: string, password: string, profileData: { full_name?: string; phone?: string; role?: string }) {
    // 1) sign up user
    const { data: signData, error: signError } = await supabase.auth.signUp({ email, password });
    if (signError) throw signError;

    // If email confirmation is required, signData.user may be null until confirmed.
    const userId = signData.user?.id;
    // If userId exists (instant sign-up on no-confirmation) create profile. If not, create profile later after verification.
    if (userId) {
      const { error: pErr } = await supabase.from('profiles').insert([{
        user_id: userId,
        full_name: profileData.full_name ?? null,
        phone: profileData.phone ?? null,
        role: profileData.role ?? 'member'
      }]);
      if (pErr) throw pErr;
    } else {
      // signed up but needs email confirmation — still return signData
    }

    return signData;
  }

  /** Classic register without profile */
  async registerUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  /** Login */
  async loginUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  /** Logout */
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    this.authState.next(false);
  }

  /** Get profile for current user (returns Promise) */
  async getProfile(): Promise<any> {
    const { data: sessionData } = await supabase.auth.getUser();
    const user = sessionData?.user;
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 when no rows
    return { user, profile };
  }

  /** Utility: insert/update profile (useful to call after email confirmation if user was missing profile) */
  async upsertProfile(userId: string, payload: Partial<{ full_name: string; phone: string; role: string; avatar_url: string; bio: string }>) {
    const record = { user_id: userId, ...payload, updated_at: new Date().toISOString() };
    const { error } = await supabase.from('profiles').upsert(record, { onConflict: 'user_id' });
    if (error) throw error;
    return true;
  }
 async login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}



  /** token helpers (optional for compatibility; Supabase handles session but some code expects token) */
  public setToken(token: string) { localStorage.setItem('token', token); }
  public getToken(): string | null { return localStorage.getItem('token'); }
  public removeToken(): void { localStorage.removeItem('token'); }
  public isLoggedIn(): boolean { return this.authState.getValue(); }

  // For older components expecting Observables, expose getProfile$ (optional)
  getProfile$() {
    return from(this.getProfile()); // converts Promise to Observable
  }
}
