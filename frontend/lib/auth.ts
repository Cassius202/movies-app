"use server"

import { User } from "@/constants/types";
import { isValidEmail, isValidPassword, sanitize, serverDataStructure } from "./helpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const API_URL = 'http://localhost:3001/auth';

export async function SignUpWithPassword(data: User) : Promise<serverDataStructure<User>> {

  if (!data.username || !data.email || !data.password) {
    return {
      error: "Username, email, and password are required",
      success: false,
      data: null
    }
  }

  if (isValidEmail(data.email) === false) {
    return {
      error: "Invalid email address",
      success: false,
      data: null
    }
  }

  if (isValidPassword(data.password) === false) {
    return {
      error: "Password must contain at least one letter and one number",
      success: false,
      data: null
    }
  }
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error(res);
    return {
      error: `Error registering user - response: ${res.status} ${res.statusText}`,
      success: false,
      data: null
    }
  }

  const user = await res.json();
  
  return {
    error: null,
    success: true,
    data: user as User
  }
}

export const getCurrentUser = async () => {
  const cookieStore = await cookies(); //get cookies from the request
  const token = cookieStore.get('jwt')?.value;

  if (!token) return null;

  const res = await fetch(`${API_URL}/me`, {
    headers: {
      'Cookie': `jwt=${token}` //forward the cookie to express
    }
  });

  if (!res.ok) return null; //this calls the get user function from "/auth/me"
  const user = await res.json();
  return sanitize(user) as User;
}

export const logout = async () => {
  const cookieStore = await cookies(); //get cookies from the request
  const token = cookieStore.get('jwt')?.value;

   if (!token) {
    redirect('/auth/login');
  }

  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Cookie': `jwt=${token}` //forward the cookie to express
    }
  });

  if (!res.ok) {
    console.error(res);
    if (res.status === 403) {
      return; // Keep the user logged in
    }
  }

  // manually delete the cookie from the browser
  cookieStore.delete('jwt');

  revalidatePath("/", "layout");
  redirect('/auth/login');
}

export const loginWithPassword = async (data: Omit<User, 'username'>): Promise<serverDataStructure<User>> => {
  if (!data.email || !data.password) {
    return { error: "Username and password are required", success: false, data: null }
  }

  if (!isValidEmail(data.email)) {
    return { error: "Invalid email address", success: false, data: null }
  }

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const json = await res.json()

  if (!res.ok) {
    return { error: json.error || 'Login failed', success: false, data: null }
  }

  // manually save the cookie from Express response
  const cookieStore = await cookies()
  const setCookie = res.headers.get('set-cookie')
  if (setCookie) {
    const token = setCookie.split(';')[0].split('=')[1]
    cookieStore.set('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    })
  }

  const cleanedUser = sanitize(json) as User;

  return {
    error: null,
    success: true,
    data: cleanedUser,
  }
}