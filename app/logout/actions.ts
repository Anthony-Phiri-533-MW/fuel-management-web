'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function logout() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Logout error:', error)
    // Even if there's an error, we should still redirect
    // The session might already be cleared
  }
  
  revalidatePath('/', 'layout')
  redirect('/login')
}

