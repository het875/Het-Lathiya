import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation utilities
export const getReducedMotionPreference = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const getResponsiveAnimationDuration = (baseDuration: number): number => {
  if (typeof window === 'undefined') return baseDuration
  
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth < 1024
  const prefersReducedMotion = getReducedMotionPreference()
  
  if (prefersReducedMotion) return 0.1
  if (isMobile) return baseDuration * 0.7
  if (isTablet) return baseDuration * 0.85
  
  return baseDuration
}

// Performance utilities
export const optimizeAnimation = (element: HTMLElement, willChange: string[] = ['transform', 'opacity']) => {
  element.style.willChange = willChange.join(', ')
  
  return () => {
    element.style.willChange = 'auto'
  }
}

// Theme utilities
export const getTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark'
  
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const setTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}
