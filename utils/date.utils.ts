import { DateTime } from "luxon";

export namespace DateUtils {
  const DATE_FORMAT = "MM/dd/yyyy";

  export function formatDate(date: Date, format = DATE_FORMAT): string {
    return DateTime.fromJSDate(date).toFormat(format);
  }

  export function formatIsoDate(date: string, format = DATE_FORMAT): string {
    return DateTime.fromISO(date).toFormat(format);
  }

  /**
   * Formats an ISO date string to a readable format with time
   * @param dateInput - ISO date string (e.g., "2025-10-30T17:37:37.370Z")
   * @returns Formatted string: "Dec 15, 2:00 PM" (same year) or "Dec 15, 2000, 2:00 PM" (different year)
   */
  export const formatDateWithTime = (dateInput: string | undefined | null, showYear?: boolean): string => {
    if (!dateInput) {
      return "-";
    }

    try {
      const dateTime = DateTime.fromISO(dateInput);

      // Check if the date is valid
      if (!dateTime.isValid) {
        return "Invalid Date";
      }

      const currentYear = DateTime.now().year;
      const dateYear = dateTime.year;

      if (showYear) {
        // Same year: "Dec 15, 2025"
        return dateTime.toFormat("MMM d, yyyy");
      }

      // Format with or without year based on whether it matches current year
      if (dateYear === currentYear) {
        // Same year: "Dec 15, 2:00 PM"
        return dateTime.toFormat("MMM d, h:mm a");
      }

      // Different year: "Dec 15, 2000, 2:00 PM"
      return dateTime.toFormat("MMM d, yyyy, h:mm a");
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      return "Error";
    }
  };

  /**
   * Formats a Unix timestamp (in seconds) to time format HH:MM
   * @param timestamp - Unix timestamp in seconds (e.g., 1762190000.48 or "1762190000.48")
   * @returns Formatted time string: "00:04" (hours:minutes in 24-hour format)
   */
  export const formatTimeFromTimestamp = (timestamp: number | string | undefined | null): string => {
    if (!timestamp) {
      return "-";
    }

    try {
      // Convert string to number if needed
      const timestampNumber = typeof timestamp === "string" ? parseFloat(timestamp) : timestamp;

      // Check if conversion resulted in valid number
      if (Number.isNaN(timestampNumber)) {
        return "Invalid Time";
      }

      const dateTime = DateTime.fromSeconds(timestampNumber);

      // Check if the date is valid
      if (!dateTime.isValid) {
        return "Invalid Time";
      }

      // Format as HH:MM (24-hour format with zero padding)
      return dateTime.toFormat("HH:mm");
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      return "Error";
    }
  };

  /**
   * Returns an array of abbreviated weekday names starting with Monday
   * @returns Array of day strings: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
   */
  export const getDaysOfWeek = (): string[] => {
    return ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  };
}
