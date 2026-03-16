'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    fullName: formData.get('fullName') as string || '',
  }

  if (data.password !== data.confirmPassword) {
    redirect('/login?error=Passwords do not match')
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // Save user info to users table
  if (signUpData.user) {
    const { error: insertError } = await supabase.from('users').insert({
      id: signUpData.user.id,
      email: data.email,
      full_name: data.fullName,
      created_at: new Date().toISOString(),
    })

    if (insertError) {
      console.error('Error saving user info:', insertError)
    }
  }

  // If email confirmation is disabled in Supabase, session will be returned immediately
  if (signUpData.session) {
    revalidatePath('/', 'layout')
    return redirect('/chatbot')
  }

  // Fallback if session is still missing (likely Supabase settings not updated yet)
  return redirect('/login?message=Account created! Please check your email if confirmation is still enabled in your Supabase dashboard.')
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signInData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // Ensure user exists in users table
  if (signInData.user) {
    // Try to insert first (for new users)
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: signInData.user.id,
        email: signInData.user.email,
        full_name: signInData.user.user_metadata?.full_name || '',
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    // If insert fails (user already exists), update last_login
    if (insertError) {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          last_login: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', signInData.user.id)

      if (updateError) {
        console.error('Error updating user:', updateError)
      }
    }
  }

  revalidatePath('/', 'layout')
  return redirect('/chatbot')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
