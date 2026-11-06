"use client";

import { CursorTrail } from "./cursor-trail";
import { MenaceModeIntro } from "./menace-mode-intro";

export function ClientChrome() {
  return (
    <>
      <MenaceModeIntro />
      <CursorTrail />
    </>
  );
}
