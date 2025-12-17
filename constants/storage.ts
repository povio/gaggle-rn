/**
 * Storage keys used across the application
 * Centralized constants for maintainability and consistency
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  EMAIL_VERIFIED: "email_verified",
  WAITLIST_EMAIL: "waitlist_email",
  USER_CREATED: "user_created",
  PROFILE_SETUP: "profile_setup",
  LAST_SIGNED_IN_EMAIL: "last_signed_in_email",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
