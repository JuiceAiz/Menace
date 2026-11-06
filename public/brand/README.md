# Brand assets

Official files only. Nothing in this folder is redrawn or approximated — every
size is derived by resizing the supplied artwork.

| File | Required | Notes |
| --- | --- | --- |
| `menace-logo.png` | yes | The official Menace mark (currently 320×320, square). The mark itself is untouched; its opaque purple backdrop was keyed out to transparent so it sits on any surface. Used by the header, footer and the Menace Mode intro. |
| `menace-logo-512.png` | optional | Downscaled copy if the source file is very large. Resize only — never redraw. |
| `app-icon` source | optional | Copy `menace-logo.png` to `app/icon.png` for the favicon. |

`hasLogoAsset` in `lib/brand.ts` checks for `menace-logo.png` at build time. When
the file is present, `<BrandLogo />` renders it. When it is missing, the
component renders the MENACE wordmark (or nothing, for the mark-only variant) and
never requests the missing file, so no 404 appears in the console.

Replacing the artwork: drop in a new `menace-logo.png`, then rebuild (or restart
`npm run dev`). If the new file is not square, update the `width`/`height` props in
`components/brand/logo.tsx` to match its real dimensions.
