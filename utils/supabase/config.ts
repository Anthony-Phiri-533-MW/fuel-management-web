/**
 * Centralized Supabase configuration
 * Validates environment variables and provides consistent configuration
 */

function getEnvVar(name: string): string {
  const value = process.env[name]
  
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}\n\n` +
      `Please add it to your .env file:\n` +
      `${name}=your_value_here\n\n` +
      `Get your Supabase credentials from:\n` +
      `https://supabase.com/dashboard/project/_/settings/api\n\n` +
      `Make sure to restart your development server after adding environment variables.`
    )
  }
  
  return value
}

// Lazy getters to validate only when accessed
function getUrl(): string {
  return getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
}

function getAnonKey(): string {
  return getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabaseConfig = {
  get url() {
    return getUrl()
  },
  get anonKey() {
    return getAnonKey()
  },
}

