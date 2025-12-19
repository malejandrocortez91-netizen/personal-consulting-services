# Personal Consulting Services - Alejandro Cortez Velasquez

This is a Next.js project for the personal consulting portfolio of Alejandro Cortez Velasquez, an Executive Operations & Transformation Leader.

**Live Application URL:** [https://alexcortezv.com/](https://alexcortezv.com/)

## Author

**Manuel Alejandro Cortez Velasquez**
- Email: malejandro.cortez91@gmail.com
- GitHub: [malejandrocortez91-netizen](https://github.com/malejandrocortez91-netizen)
- LinkedIn: [https://www.linkedin.com/in/alecortez91/](https://www.linkedin.com/in/alecortez91/)

## Repository

[https://github.com/malejandrocortez91-netizen/personal-consulting-services](https://github.com/malejandrocortez91-netizen/personal-consulting-services)

---

## Features

*   **Responsive Design:** Fully responsive and mobile-first design.
*   **Services Showcase:** Detailed information about the services offered.
*   **Project Portfolio:** A gallery of past projects and work.
*   **Contact Form:** A contact form with email notifications and Google Sheets integration.
*   **Newsletter Signup:** A newsletter signup form integrated with Google Sheets.
*   **Interactive Timeline:** A resume timeline to showcase experience.

## Tech Stack

*   **[Next.js](https://nextjs.org/):** A React framework for building server-rendered and statically generated web applications.
*   **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
*   **[shadcn/ui](https://ui.shadcn.com/):** A collection of re-usable UI components.
*   **[Firebase](https://firebase.google.com/):** A platform for building web and mobile applications, used here for hosting and security.
*   **[Google Sheets API](https://developers.google.com/sheets/api):** Used as a lightweight database for form submissions.
*   **[Nodemailer](https://nodemailer.com/):** A library for sending emails from Node.js applications.

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
3.  Set up environment variables by creating a `.env.local` file and adding the necessary keys (see `src/lib/firebase.ts`, and `src/services/email.ts` for required variables).
4.  Run the development server
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured for continuous deployment to Google App Hosting for Firebase via GitHub. Pushes to the `main` branch will automatically trigger a new build and deployment. See `apphosting.yaml` for configuration.
