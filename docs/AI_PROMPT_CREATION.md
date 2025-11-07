# AI Prompt for Replicating a Full-Stack Application

## Purpose of This Document

This document contains a single, comprehensive prompt designed to be used with a powerful Large Language Model (e.g., Gemini, GPT-4). The goal is to instruct the AI to generate the complete source code and architectural plans for a web application based on a detailed description of an existing project.

The prompt requires the AI to replicate the application in three different technology stacks, analyze the limitations of each, and suggest better alternatives.

---

## The Master Replication Prompt

**Instructions for Use:** Copy the entire text within the code block below and paste it into your chosen Large Language Model.

```
You are an expert full-stack software architect and senior developer AI. Your mission is to generate the complete, production-ready source code and a detailed architectural blueprint to replicate an existing web application. You must follow all instructions precisely, providing not just code, but also deep analysis of the trade-offs involved.

### **Part 1: The Source Application - A Modern Landing Page**

First, understand the application you are replicating.

**1.1. Project Goal & Visuals:**
The application is a visually appealing, modern, single-page landing site for a creative studio. The design is clean, minimalist, and fully responsive. It features a dark and light mode theme toggle. The layout is composed of several distinct sections arranged vertically:
- **Hero Section:** A large, impactful title, a brief subtitle, and two call-to-action buttons ("View Work" and "Contact Us").
- **Features Section:** A grid (e.g., 3x2) of cards, where each card has an icon, a title, and a short description of a service.
- **Testimonials Section:** A horizontally scrolling or stacked section displaying quotes from clients, including their name and company.
- **Pricing Section:** A display of three pricing tiers (e.g., "Basic," "Pro," "Enterprise") in card format. Each card details the features of the plan and has a "Sign Up" button.
- **Contact Form Section:** A form with fields for "Name," "Email," and "Message." It has a single "Send Message" button.
- **Newsletter Section:** A simple form with an "Email" input and a "Subscribe" button.
- **Footer:** Contains social media links and copyright information.

**1.2. Core Functionality:**
- **Theme Toggling:** Users can switch between a light and dark theme. The choice should be saved in the browser's local storage.
- **Form Submissions:** This is the application's most critical dynamic feature.
    - Both the **Contact Form** and the **Newsletter Form** must capture user input.
    - Upon submission, the data is sent to a **secure backend process**.
    - This backend process validates the data and then appends it as a new row to a specific **Google Sheet**.
    - **Crucially**, if the Google Sheets API call fails for any reason, the backend must have a **fallback mechanism** to save the submission data into a **Firestore** database collection to prevent data loss.
    - After the form is submitted, the user interface must display a **toast notification** indicating success ("Message sent successfully!") or failure.

**1.3. The Original Technology Stack:**
- **Frontend Framework:** Next.js 14+ (using the App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with `shadcn/ui` for pre-built components like Buttons, Cards, Inputs, and Toasts.
- **Backend Logic:** Next.js Server Actions for handling form submissions securely on the server.
- **Database / Data Storage:** Google Sheets as the primary destination, with Google Cloud Platform Service Account for authentication. Firestore is used as a backup.
- **Hosting:** Deployed on a serverless platform like Firebase App Hosting.

---

### **Part 2: Your Task - Replicate the Application in Three Stacks**

Your primary task is to generate the complete source code for this application in three different technology stacks as detailed below. For **EACH** stack, you **MUST** provide the following:

1.  A complete file and folder structure.
2.  The full, production-ready source code for every single file.
3.  A `README.md` file with clear, step-by-step instructions for setting up the project, installing dependencies, and running it.
4.  A detailed **Limitations Analysis** section discussing the specific drawbacks and trade-offs of using this stack for this project.
5.  A thoughtful **Alternatives Discussion** section suggesting better or different technologies that could address the limitations.

#### **Replication Target 1: Classic React + Node.js (Express)**

Recreate the application with a distinct separation between frontend and backend.

-   **Frontend (React):**
    -   Use `create-react-app` with the TypeScript template.
    -   Use `axios` for making API calls to your Node.js backend.
    -   Recreate all UI components using React functional components and Tailwind CSS.
    -   Implement theme switching using React Context API and `localStorage`.
-   **Backend (Node.js/Express):**
    -   Set up an Express.js server using TypeScript (with `ts-node` and `nodemon`).
    -   Create two POST API endpoints: `/api/contact` and `/api/newsletter`.
    -   These endpoints must validate the incoming data.
    -   Implement the logic to connect to the Google Sheets API using a library like `google-spreadsheet`. Explain how to securely manage environment variables (`.env`) for the Google Service Account credentials and Sheet ID.
    -   Implement the Firestore fallback logic within a `try...catch` block in your API handlers.
-   **Analysis:** Provide the Limitations and Alternatives analysis as specified above. Consider CORS, deployment complexity, and the lack of out-of-the-box SSR.

#### **Replication Target 2: Replicate the Current Architecture (Next.js)**

Recreate the application using its original, modern, full-stack framework.

-   **Instructions:**
    -   Provide the code for a brand new Next.js 14+ project (App Router).
    -   Use TypeScript and set up Tailwind CSS.
    -   Explain how to initialize `shadcn/ui` and add the necessary components (`button`, `card`, `input`, `textarea`, `toast`).
    -   Generate the full code for all the visual landing page components (`Hero`, `Features`, etc.) as React Server Components where appropriate.
    -   Generate the code for the **Next.js Server Actions** (`actions/contact.ts`, `actions/newsletter.ts`) to handle form logic.
    -   Generate the code for a service layer (`services/sheets-service.ts`) that contains the Google Sheets and Firestore logic, and is called by the Server Actions.
    -   Provide a detailed guide on setting up the necessary environment variables.
-   **Analysis:** Provide the Limitations and Alternatives analysis. Consider vendor lock-in (Firebase), the learning curve, and compare the hosting experience to alternatives like Vercel or Supabase.

#### **Replication Target 3: Pure HTML5, CSS3, and Vanilla JavaScript**

Recreate the application with no frameworks or libraries.

-   **Instructions:**
    -   Create a single `index.html` file containing the complete semantic structure of the page.
    -   Create a `style.css` file. Write the necessary CSS to replicate the visual appearance, including the responsive design and the light/dark themes.
    -   Create a `script.js` file using Vanilla JavaScript to handle all interactivity, including the theme toggling logic and the form submissions.
    -   **CRITICAL:** For the form submissions, you cannot have a secure backend. You must, therefore, demonstrate how this would be handled via a client-side `fetch` call.
        -   First, explain in detail **why it is a massive security vulnerability** to expose API keys or service account credentials on the client-side.
        -   Then, as a "correct" solution for this stack, you must design and explain a **proxy serverless function**. Provide the code for a simple Google Cloud Function (or an equivalent from another provider) that can receive the client-side request and securely forward it to the Google Sheets API. This is the only acceptable way to handle the form logic in this stack.
-   **Analysis:** Provide the Limitations and Alternatives analysis. Focus on the extreme limitations regarding maintainability, code reuse, and the inherent security challenges of not having a managed backend. Discuss alternatives like static site generators (Hugo, Jekyll) or lightweight libraries (Alpine.js) that are better suited for this approach.
```
