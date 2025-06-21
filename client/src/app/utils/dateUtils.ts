/**
 * @file dateUtils.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains utility functions for date formatting.
 */

/**
 * Formats a Date object to a string in the format YYYY-MM-DD.
 * @param {Date} value - The Date object to format.
 * @returns {string} The formatted date string in YYYY-MM-DD format.
 */
function formatDateToYyyyMmDd(value: Date): string {
  const year = value.getFullYear(); // Get full year (4 digits)
  const month = String(value.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(value.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
  return `${year}-${month}-${day}`; // Returns a string in YYYY-MM-DD format
}

export { formatDateToYyyyMmDd };