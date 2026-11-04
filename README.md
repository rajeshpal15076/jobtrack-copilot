# JobTrack Copilot

**A privacy-focused browser extension that helps job seekers organize, track, and manage their job applications.**

JobTrack Copilot provides a simple way to manage your job search from your browser. Save job opportunities, track application progress, manage follow-ups, and keep your job search organized — without creating an account.

<p align="center">
  <strong>Version 1.0.0</strong> · <strong>Manifest V3</strong> · <strong>TypeScript</strong>
</p>

---

## Overview

Managing multiple job applications can become difficult. JobTrack Copilot makes the process easier by providing a centralized, browser-based application tracker.

It is designed with privacy in mind. Application information is stored locally in your browser rather than being sent to a remote application server.

## Features

- **Job Application Tracking:** Add and manage job opportunities in one place.
- **Application Status Management:** Track the progress of your applications.
- **Follow-up Management:** Record follow-up dates to stay organized.
- **Notes:** Maintain useful information about each application.
- **Search and Filtering:** Find and organize saved applications.
- **CSV Export:** Export application records for reporting and analysis.
- **JSON Backup and Restore:** Create backups and restore your saved application data.
- **Local Data Storage:** Keep your application information in your browser.
- **No Account Required:** Start using the extension without registration.

## Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Application logic and type safety |
| Vite | Build tooling and development |
| HTML5 | Extension interface |
| CSS3 | Styling and responsive layouts |
| Manifest V3 | Browser extension architecture |
| Browser Storage API | Local application data |
| Vitest | Automated testing |

## Installation

### Option 1: Install from Microsoft Edge Add-ons

JobTrack Copilot is officially published on the Microsoft Edge Add-ons Store.

1. Open Microsoft Edge Add-ons.
2. Search for **JobTrack Copilot**.
3. Find the extension and select Get.

**Microsoft Edge Add-ons:** https://microsoftedge.microsoft.com/addons/

**Store ID:** `0RDCKBRJP7L6`

### Option 2: Run from source code

You can also build and test the extension locally.

**Prerequisites**

- Node.js 20.19+ or 22.12+
- npm
- Microsoft Edge

**1. Clone the repository**

```bash
git clone https://github.com/rajeshpal15076/jobtrack-copilot.git
```

**2. Navigate to the project directory**

```bash
cd jobtrack-copilot
```

**3. Install dependencies**

```bash
npm install
```

**4. Build the extension**

```bash
npm run build
```

The production extension files will be generated in the `dist/` directory.

**5. Load the extension into Microsoft Edge**

1. Open `edge://extensions/`.
2. Enable Developer mode.
3. Select Load unpacked.
4. Choose the generated `dist/` directory.
5. Pin JobTrack Copilot to your browser toolbar.

The extension is now ready for local testing.

## Development Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the extension |
| `npm run preview` | Preview the production build |
| `npm test` | Run automated tests |

For testing browser extension functionality, build the project and load the generated `dist/` folder into Microsoft Edge.

## Project Structure

```text
jobtrack-copilot/
│
├── public/
│   ├── icons/
│   └── manifest.json
│
├── src/
│   ├── dashboard/
│   ├── popup/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── utils/
│
├── tests/
│
├── docs/
│   ├── index.html
│   └── privacy-policy.md
│
├── dashboard.html
├── popup.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Privacy and Security

Privacy is an important part of JobTrack Copilot.

The version 1.0.0 implementation:

- Stores job application data locally using browser storage.
- Does not require user registration or account creation.
- Does not use a backend server, analytics service, or external API.
- Does not transmit job application data to a remote server.
- Does not scrape LinkedIn pages or automate job applications.
- Requests only the browser storage permission.

Users can export their data as CSV or create JSON backups.

**Important:** Clearing browser extension data or uninstalling the extension may remove locally stored records. Users should maintain backups of important application data.

### Privacy Policy

Read the complete privacy policy:

https://rajeshpal15076.github.io/jobtrack-copilot/

## Publication

**Product:** JobTrack Copilot  
**Version:** 1.0.0  
**Platform:** Microsoft Edge Add-ons  
**Publication status:** Publicly published  
**Store ID:** `0RDCKBRJP7L6`

## Future Improvements

Potential areas for future development include:

- Improved application analytics and reporting.
- Additional productivity features.
- Enhanced user experience and accessibility.
- More flexible application organization.

Any future feature involving new data collection or external services will require an appropriate privacy and security review.

## Author

**Rajesh Pal**

Web Developer | TypeScript | JavaScript | React

GitHub: https://github.com/rajeshpal15076

Email: rajeshpal123.in@gmail.com

---

**Thank you for using JobTrack Copilot!**

If you encounter an issue or have a feature suggestion, please open an issue in this GitHub repository.
