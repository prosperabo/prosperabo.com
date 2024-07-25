// lib/otp.util.ts
import crypto from "crypto";

export function generateOTP(length: number = 6): string {
  // if run on server
  if (typeof window === "undefined") {
    return crypto
      .randomInt(Math.pow(10, length), Math.pow(10, length + 1) - 1)
      .toString()
      .padStart(length, "0");
  } else {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    )
      .toString()
      .slice(0, length);
  }
}
