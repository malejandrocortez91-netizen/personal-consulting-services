# Project Documentation

This document provides a comprehensive overview of the Personal Consulting Services project, including its architecture, features, and deployment process.

## Table of Contents

*   [Project Overview](#project-overview)
*   [Tech Stack](#tech-stack)
*   [Getting Started](#getting-started)
*   [Features](#features)
    *   [Contact Form](#contact-form)
    *   [Email Notifications](#email-notifications)
    *   [Google Sheets Integration](#google-sheets-integration)
*   [Deployment](#deployment)

## Project Overview

This project is a modern, responsive, and performant personal website designed to showcase consulting services. It's built with Next.js and Tailwind CSS, and it's deployed using Google App Hosting for Firebase. The site features a contact form that integrates with Google Sheets and sends email notifications upon submission.

## Tech Stack

*   **[Next.js](https://nextjs.org/):** React Framework for production.
*   **[TypeScript](https://www.typescriptlang.org/):** Typed JavaScript for robust applications.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
*   **[shadcn/ui](https://ui.shadcn.com/):** Re-usable components built using Radix UI and Tailwind CSS.
*   **[Google App Hosting for Firebase](https://firebase.google.com/docs/hosting/app-hosting):** Fully-managed, serverless hosting.
*   **[Nodemailer](https://nodemailer.com/):** A module for Node.js applications to allow easy as cake email sending.
*   **[Google APIs](https://developers.google.com/discovery/libraries):** For programmatic access to Google services like Google Sheets.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/malejandrocortez91-netizen/personal-consulting-services.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Contact Form

The contact form allows potential clients to get in touch. It captures the user's name, email, phone number (optional), and a message.

*   **Validation:** The form uses Zod for schema validation to ensure that the submitted data is in the correct format.
*   **Server Action:** The form submission is handled by a Next.js Server Action (`handleContactSubmission` in `src/app/contact-action.ts`).

### Email Notifications

Upon successful form submission, two emails are sent:

1.  **Lead Confirmation:** An email is sent to the user to confirm that their message has been received.
2.  **Owner Notification:** An email is sent to the site owner (`malejandro.cortez91@gmail.com`) to notify them of the new lead.

*   **Service:** The emails are sent using the `sendEmail` function in `src/services/email-service.ts`, which uses Nodemailer to send emails via a configured SMTP server.

### Google Sheets Integration

All contact form submissions are logged in a Google Sheet for easy tracking and management.

*   **API:** The application uses the Google Sheets API to append new rows to the sheet.
*   **Functions:** The `appendToSheet` and `updateSheetCell` functions in `src/app/actions.ts` handle the communication with the Google Sheets API.

## Deployment

This project is configured for continuous deployment to Google App Hosting for Firebase via GitHub. Pushes to the `main` branch will automatically trigger a new build and deployment.
