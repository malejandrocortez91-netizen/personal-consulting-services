# Personal Consulting Services - Alejandro Cortez Velasquez

This is a Next.js project for the personal consulting portfolio of Alejandro Cortez Velasquez, an Executive Operations & Transformation Leader.

**Live Application URL:** [https://alexcortezv.com/](https://alexcortezv.com/) (Assumed, pending domain connection)

## Author

**Manuel Alejandro Cortez Velasquez**
- Email: malejandro.cortez91@gmail.com
- GitHub: [malejandrocortez91-netizen](https://github.com/malejandrocortez91-netizen)
- LinkedIn: [https://www.linkedin.com/in/alecortez91/](https://www.linkedin.com/in/alecortez91/)

## Repository

[https://github.com/malejandrocortez91-netizen/personal-consulting-services](https://github.com/malejandrocortez91-netizen/personal-consulting-services)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/malejandrocortez91-netizen/personal-consulting-services.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up environment variables by creating a `.env.local` file and adding the necessary keys (see `src/lib/firebase.ts`, `src/lib/firebase-admin.ts`, and `src/services/contact-service.ts` for required variables).
4.  Run the development server
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

*   **[Next.js](https://nextjs.org/):** React Framework for modern, performant web applications.
*   **[TypeScript](https://www.typescriptlang.org/):** Typed JavaScript for robust, scalable, and maintainable code.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid and custom UI development.
*   **[shadcn/ui](https://ui.shadcn.com/):** Re-usable and accessible components built using Radix UI and Tailwind CSS.
*   **[Firebase](https://firebase.google.com/):** Used for backend services including App Hosting for serverless deployment, App Check for security, and potentially Firestore as a database fallback.
*   **[Google Sheets API](https://developers.google.com/sheets/api):** Used as the primary backend for contact and newsletter form submissions, providing a simple data management interface.
*   **[Nodemailer](https://nodemailer.com/):** For sending transactional emails (lead notifications and confirmations) via a Gmail account.

## Deployment

This project is configured for continuous deployment to Google App Hosting for Firebase via GitHub. Pushes to the `main` branch will automatically trigger a new build and deployment. See `apphosting.yaml` for configuration.
