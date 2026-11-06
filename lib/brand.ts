import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Server-only. Resolved once at build/start time and passed to client components
 * as a prop, so a missing logo never triggers a broken image request.
 *
 * Add the official file at `public/brand/menace-logo.png`, then restart the dev
 * server (or rebuild) for it to appear everywhere.
 */
export const hasLogoAsset = existsSync(
  path.join(process.cwd(), "public", "brand", "menace-logo.png"),
);
