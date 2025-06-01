/**
 * Helper function: Normalize a date string to remove time component.
 * Converts to a Date object set to 00:00:00 local time.
 * @param {string} isoDate - ISO-formatted date string.
 * @returns {Date} Normalized Date object.
 */
const normalizeToDateOnly = (isoDate) => {
  const date = new Date(isoDate);
  date.setHours(0, 0, 0, 0);
  return date;
};

module.exports = {
  normalizeToDateOnly
};