"use client";

import { MenaceModeIntro } from "./menace-mode-intro";

export function ClientChrome({ hasLogo }: { hasLogo: boolean }) {
  return <MenaceModeIntro hasLogo={hasLogo} />;
}
