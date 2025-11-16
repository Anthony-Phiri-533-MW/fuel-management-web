'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export type AuthActionResult = {
  error?: string
  success?: boolean
  message?: string
}

export async function login(
  prevState: AuthActionResult | undefined,
  formData: FormData
): Promise<AuthActionResult> {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')
  
  // Validate that email and password are strings
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Invalid form data' }
  }

  // Validate inputs
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  if (!email.includes('@')) {
    return { error: 'Please enter a valid email address' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message || 'Failed to sign in. Please check your credentials.' }
    }

    if (!data.user) {
      return { error: 'Failed to sign in. Please try again.' }
    }

    revalidatePath('/', 'layout')
    revalidatePath('/dashboard', 'layout')
    // Use server-side redirect - redirect() throws internally which Next.js handles
    // Don't catch redirect errors - let them propagate
    redirect('/dashboard')
  } catch (error: unknown) {
    // Only catch non-redirect errors
    // Redirect errors have a specific digest we can check
    if ((error as { digest?: string })?.digest?.startsWith('NEXT_REDIRECT')) {
      // Re-throw redirect errors so Next.js can handle them
      throw error
    }
    console.error('Login error:', error)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}

export async function signup(
  prevState: AuthActionResult | undefined,
  formData: FormData
): Promise<AuthActionResult> {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')
  
  // Validate that email and password are strings
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Invalid form data' }
  }

  // Validate inputs
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  if (!email.includes('@')) {
    return { error: 'Please enter a valid email address' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message || 'Failed to create account. Please try again.' }
  }

  revalidatePath('/', 'layout')
  return { success: true, message: 'Account created! Please check your email to confirm your account.' }
}