# Brand assets

Drop the official files here. Nothing in this folder is redrawn or approximated.

| File | Required | Notes |
| --- | --- | --- |
| `menace-logo.png` | yes | The official Menace mark exactly as supplied. Square, 512×512 or larger, transparent background preferred. Used by the header, footer and the Menace Mode intro. |
| `menace-logo-512.png` | optional | Downscaled copy if the source file is very large. Resize only — never redraw. |
| `app-icon` source | optional | Copy `menace-logo.png` to `app/icon.png` (512×512) for the favicon. |

Until `menace-logo.png` exists, `<BrandLogo />` renders an empty brand-coloured slot
(no fake logo) and the browser logs a single 404 for the missing file.
