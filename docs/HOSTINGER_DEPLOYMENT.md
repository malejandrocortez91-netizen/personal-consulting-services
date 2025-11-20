# Domain & Deployment Guide

This guide provides the recommended strategy for connecting your custom domain (e.g., from Hostinger) to your Firebase-hosted application.

---

## Connecting a Custom Domain to Firebase Hosting (Recommended)

This is the most robust and professional solution. It keeps your application running on Firebase's high-performance, serverless infrastructure while making it accessible via your custom domain. Your users will go to `alexcortezv.com`, and the site will be served securely by Firebase.

### Why This is the Right Approach for This App

This application is a **Next.js app**, not a simple static website. It relies on server-side logic (Node.js runtime) to execute **Server Actions** for form submissions. Deploying it as "static files" to traditional hosting like Hostinger **will break all form functionality.**

By pointing your domain to Firebase, you keep the entire application intact and fully functional.

### Step-by-Step Guide

**Step 1: Add Custom Domain in Firebase Console**

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project.
3.  In the left-hand menu, go to **Build > Hosting**.
4.  Click the **"Add custom domain"** button.
5.  Enter the domain you want to connect (e.g., `alexcortezv.com`).
6.  Firebase will present you with a **TXT record**. This is used to verify that you own the domain. Copy this value.

**Step 2: Update DNS Records in Hostinger (or your Domain Registrar)**

1.  Log in to your Hostinger account (or wherever your domain is managed).
2.  Navigate to the **"DNS / Nameservers"** management area for your domain.
3.  **Add the Verification Record:**
    *   **Type:** `TXT`
    *   **Name/Host:** `@` (or your domain name, depending on the interface)
    *   **Value/Content:** Paste the value provided by Firebase.
    *   **TTL:** Leave as default.

4.  Wait a few minutes for the record to be saved, then return to the Firebase console and click the **"Verify"** button. DNS changes can sometimes take up to an hour to propagate, so be patient.

5.  **Add the Hosting Records:**
    Once verified, Firebase will provide you with one or more **A records**. These are IP addresses that point to Firebase's global hosting servers.
    *   Go back to your Hostinger DNS editor.
    *   **Delete any existing `A` records** for your root domain (`@`) to avoid conflicts.
    *   Add the new **A records** exactly as Firebase specifies. There will usually be two of them for redundancy.
        *   **Type:** `A`
        *   **Name/Host:** `@`
        *   **Points to/Value:** The first IP address from Firebase.
        *   **TTL:** Default.

        *   **Type:** `A`
        *   **Name/Host:** `@`
        *   **Points to/Value:** The second IP address from Firebase.
        *   **TTL:** Default.

**Step 3: Finalization**

*   After adding the A records, it will take some time (from minutes to several hours) for these changes to propagate across the internet.
*   Once complete, Firebase will automatically provision a free SSL certificate for your domain. The status in the Firebase Hosting dashboard will change to "Connected."
*   Your site will now be live and secure at `https://yourdomain.com`.

---

## Option 2: Static Export (Not Recommended for This App)

For simpler websites that do not have server-side logic (like form submissions), you can perform a static export. This command pre-builds every page into plain HTML, CSS, and JS files that can be uploaded to any static web host.

To do this, you would modify `next.config.mjs` to include `output: 'export'` and run `npm run build`. This generates an `out` folder.

**This method will break the contact and newsletter forms for this specific project.** It is only suitable for purely informational sites with no backend functionality.
