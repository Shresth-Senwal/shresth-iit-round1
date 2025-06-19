/**
 * Utility functions for consistent formatting across server and client
 */

/**
 * Format numbers with comma separators consistently across server and client
 * This prevents hydration mismatches that can occur with toLocaleString()
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Format currency with consistent formatting
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  const formatted = formatNumber(Math.abs(amount))
  const sign = amount < 0 ? '-' : ''
  
  switch (currency) {
    case 'USD':
      return `${sign}$${formatted}`
    case 'EUR':
      return `${sign}€${formatted}`
    case 'GBP':
      return `${sign}£${formatted}`
    default:
      return `${sign}${formatted} ${currency}`
  }
}

/**
 * Format percentages consistently
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format large numbers with appropriate suffixes (K, M, B)
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`
  }
  return formatNumber(num)
} 