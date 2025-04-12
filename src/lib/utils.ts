import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import config from './config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get a configuration value using dot notation
 * @example getConfig('site.title')
 */
export function getConfig<T = any>(path: string, defaultValue?: T): T {
  const keys = path.split('.')
  let result: any = config
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      return defaultValue as T
    }
  }
  
  return result as T
}
