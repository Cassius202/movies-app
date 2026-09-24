import { IUser } from '../models/User'

export interface User {
  username: string
  email: string
  password: string
}

export interface Movie {
  title: string
  genre: string
  watched: boolean
}

export interface MovieResponse {
  title: string
  genre: string
  watched: boolean
  id: string
}

export interface UserResponse {
  username: string
  email: string
  id: string
  password: string
}

export interface changePasswordInput {
  currentPassword: string
  newPassword: string
}