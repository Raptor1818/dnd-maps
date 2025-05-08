/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [new URL(process.env.NEXT_PUBLIC_SUPABASE_NEXT_CONFIG_URL || "")],
  }
};

export default config;
