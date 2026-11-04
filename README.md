# JobTrack Copilot

A local-first Chrome extension for saving and organizing job applications. Version 1.0 uses TypeScript, Vite, Chrome Manifest V3, and `chrome.storage.local`. It does not scrape LinkedIn, inject scripts into LinkedIn, use a backend, or transmit application data.

## Requirements

- Node.js 20.19+ or 22.12+ recommended for current Vite releases
- npm
- Google Chrome

## Install dependencies

```bash
npm install
```

## Build the extension

```bash
npm run build
```

The extension package is generated in `dist/`.

## Load in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this project's `dist` directory.
5. Pin JobTrack Copilot from the Extensions menu.
6. Click its icon to add a job.
7. Click **Open dashboard** to manage applications.

After changing code, run `npm run build`, then click the reload icon on the extension card in `chrome://extensions`. Refresh the dashboard tab too.

## Development

```bash
npm run dev
```

The Vite development server is useful for front-end iteration, but the Chrome extension APIs only work when pages are loaded as part of the installed extension. Build and load `dist` to test storage and extension behavior.

## Tests

```bash
npm test
```

## Privacy and data

- Job data is stored in the user's Chrome profile through `chrome.storage.local`.
- There is no account, server, analytics, or external API in this version.
- Export CSV or download a JSON backup regularly.
- Removing the extension or clearing its data may delete locally stored records.
- The extension asks only for the `storage` permission.

## Icons

The starter package includes simple placeholder PNG icons. Replace them with original branded icons before public release. Keep 16x16, 48x48, and 128x128 PNG versions.

## Important LinkedIn limitation

This version intentionally uses manual entry. It does not scrape LinkedIn pages, inject controls into LinkedIn, or automate LinkedIn actions. Users may paste a job listing URL into the form. Review the current LinkedIn terms and Chrome Web Store policies before adding any future integration.

## Before publishing

- Replace placeholder icons with original artwork.
- Host and link a privacy policy that accurately describes local storage and data handling.
- Test backup/restore and CSV exports.
- Review Chrome Web Store developer and user-data policies.
- Do not claim that the extension is affiliated with LinkedIn.
