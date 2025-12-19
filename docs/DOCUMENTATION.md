# Application Documentation

**Live Application URL:** [https://alexcortezv.com/](https://alexcortezv.com/)

---

## 1. Architecture & Rationale

This project is a modern, performant, and scalable web application built on a carefully selected stack of technologies. The architecture is designed for rapid development, maintainability, and a seamless user experience.

### Core Technologies

*   **Next.js (App Router):** Chosen as the foundational framework for its powerful features.
    *   **Hybrid Rendering:** Provides both Server-Side Rendering (SSR) and Static Site Generation (SSG) for fast initial page loads (great for SEO) and dynamic capabilities.
    *   **File-System Based Routing:** Simplifies navigation. Every `page.tsx` file in the `src/app` directory automatically becomes a route.
    *   **Server Actions:** Used for secure, server-side handling of form submissions without needing to create separate API endpoints.

*   **TypeScript:** Ensures code quality and long-term maintainability.
    *   **Type Safety:** Catches bugs during development rather than at runtime.
    *   **Improved Developer Experience:** Provides excellent autocompletion, code navigation, and refactoring capabilities.

*   **Tailwind CSS & shadcn/ui:** This combination enables rapid UI development and a consistent, professional design system.
    *   **Customization:** Allows for building completely custom designs directly in the markup.
    *   **Component-Based:** `shadcn/ui` provides a set of accessible, reusable, and beautifully designed components.

*   **Firebase (Backend-as-a-Service):** Provides the backend infrastructure.
    *   **Serverless Architecture:** Using services like App Hosting eliminates the need to manage servers or scaling infrastructure.
    *   **Security:** Firebase App Check is integrated to ensure that requests to the backend are coming from the legitimate app, protecting against abuse.

*   **Google Sheets API & Nodemailer:** These are used for backend processing of form submissions.
    *   **Google Sheets:** Acts as a simple, no-code database for storing contact and newsletter submissions.
    *   **Nodemailer:** Handles sending transactional emails (notifications to the owner, confirmations to the user) through a designated Gmail account.

---

## 2. Project Structure

```
/src
|-- app
|   |-- actions           # Next.js Server Actions for form handling
|   |-- (main)
|   |   |-- page.tsx        # Main landing page
|   |   `-- layout.tsx      # Root layout
|   `-- portfolio
|       `-- page.tsx        # Portfolio page
|-- components
|   |-- landing           # Components specific to the landing page
|   |-- ui                # Reusable UI components (from shadcn/ui)
|   `-- AppCheckProvider.tsx # Firebase App Check provider
|-- hooks                 # Custom React hooks
|-- lib                   # Core library files (Firebase, utils, etc.)
`-- services              # Services for interacting with external APIs (Google Sheets, Email)
```

---

## 3. API Integration: Forms to Google Sheets & Email

The application provides a robust and user-friendly way to manage contact form submissions and newsletter sign-ups by integrating directly with Google Sheets and an email service.

### Final Data Workflow

1.  **User Interaction:** A user fills out the Contact or Newsletter form.
2.  **Server Action Trigger:** Submitting the form calls a specific Next.js Server Action (`contact.ts` or `newsletter.ts`). This code executes securely on the server.
3.  **Data Validation:** The Server Action validates the incoming data.
4.  **Service Layer (`google-sheets.ts`, `email.ts`):** The Server Action invokes dedicated services responsible for handling communication with external APIs.
5.  **Concurrent Processing:** The service uses `Promise.all` to perform two tasks simultaneously for maximum efficiency:
    *   **Google Sheets Write:** It authenticates with the Google Sheets API using a Service Account and appends the form data as a new row.
    *   **Email Notification:** It sends an email notification to the site owner with the new lead's details and a confirmation email to the user.
6.  **Client Feedback:** The Server Action returns a success or error message to the front-end, which then displays a toast notification to the user.

### Step-by-Step Integration Setup

1.  **Google Cloud Project:**
    *   Create a Google Cloud project.
    *   Enable the **Google Sheets API** in the API Library.

2.  **Service Account Creation:**
    *   In IAM & Admin, create a **Service Account**.
    *   Generate and download a JSON key file. The `client_email` and `private_key` from this file are required.

3.  **Google Sheet Configuration:**
    *   Create a new Google Sheet to store submissions.
    *   **Share** the sheet with the service account's `client_email`, giving it **"Editor"** permissions. This is critical.

4.  **Email Service Setup (Gmail):**
    *   Use a Gmail account for sending emails.
    *   Generate an **App Password** for this account (required if 2-Factor Authentication is enabled). Standard passwords will not work.

5.  **Secure Credential Storage:**
    *   Create a `.env.local` file in the project root.
    *   Add the following environment variables:
        ```env
        # Google Sheets API
        GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email@...
        GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
        SHEET_ID=your_google_sheet_id

        # Nodemailer (Gmail)
        EMAIL_USER=your-gmail-address@gmail.com
        EMAIL_PASS=your_16_character_app_password
        EMAIL_SENDER_NAME="Your Name"

        # Firebase (Client-side)
        NEXT_PUBLIC_FIREBASE_API_KEY=...
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
        NEXT_PUBLIC_FIREBASE_APP_ID=...

        # Recaptcha for App Check
        NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY=...
        ```

### Common Mistakes & Fallback Strategy

*   **Common Mistakes:**
    *   Forgetting to share the Google Sheet with the service account's email.
    *   Incorrectly formatting the multi-line `PRIVATE_KEY` in the `.env` file (it must be enclosed in quotes).
    *   Using a regular Gmail password instead of an App Password.
    *   Not enabling the Google Sheets API in the GCP project.
*   **Fallback Strategy:** The current implementation uses `Promise.all`, which is inherently resilient. If an email fails to send, the Google Sheet entry is still recorded. For even greater resilience, a `try...catch` block could be added to write to a **Firestore** collection if the Google Sheets API call fails, ensuring no data is ever lost.

---

## 4. Deployment

This project is configured for continuous deployment to **Firebase App Hosting**.

*   **Trigger:** A push to the `main` branch on GitHub automatically triggers a new deployment.
*   **Configuration:** The `apphosting.yaml` file defines the build and run steps for the deployment.
*   **Live URL:** The application is available at the Firebase-provided URL, which can be connected to a custom domain like `alexcortezv.com`.
