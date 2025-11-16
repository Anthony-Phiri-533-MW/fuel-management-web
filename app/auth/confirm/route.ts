import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')

  // If there's an error parameter, redirect to error page
  if (error) {
    redirect(`/error?error=${encodeURIComponent(error)}`)
  }

  if (token_hash && type) {
    const supabase = await createClient()

    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    
    if (!verifyError) {
      // Email confirmed successfully, redirect to dashboard
      redirect('/dashboard')
    } else {
      // Verification failed, redirect to error page with message
      redirect(`/error?error=${encodeURIComponent(verifyError.message || 'Email verification failed')}`)
    }
  }

  // Missing required parameters, redirect to error page
  redirect('/error?error=' + encodeURIComponent('Invalid verification link. Please check your email and try again.'))
}