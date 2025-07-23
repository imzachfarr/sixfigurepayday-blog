import { format, isValid, parseISO } from 'date-fns'

export function safeFormatDate(dateString: string | null | undefined, formatString: string = 'MMMM dd, yyyy'): string {
  if (!dateString) {
    return 'Date not available'
  }

  try {
    // Try to parse the date string
    const date = parseISO(dateString)
    
    // Check if the date is valid
    if (!isValid(date)) {
      return 'Invalid date'
    }

    // Format the date
    return format(date, formatString)
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Date not available'
  }
}

export function safeFormatDateShort(dateString: string | null | undefined): string {
  return safeFormatDate(dateString, 'MMM dd, yyyy')
} 