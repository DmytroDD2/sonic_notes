# Next.js Voice-to-Text SaaS Application

This is a [Next.js](https://nextjs.org) application with **TypeScript** support, providing Voice-to-Text functionality as a SaaS (Software as a Service). It allows users to create accounts, upload audio files for transcription, track their transcription history, and manage payments via Stripe.

**View Demo:** [https://sonic-notes.vercel.app](https://sonic-notes.vercel.app)


---

## Technologies Used

* **Framework**: [Next.js](https://nextjs.org)
* **Language**: TypeScript
* **UI/UX**: [Tailwind CSS](https://tailwindcss.com/) or [shadcn/ui](https://ui.shadcn.com/) for styling and components.
* **Authentication**: [Clerk](https://clerk.com/) for user management and middleware (or decorators).
* **Database**: [PostgreSQL](https://www.postgresql.org/)
* **ORM**: [Prisma](https://www.prisma.io/) for database interaction.
* **Voice-to-Text API**: OpenAI API, Llama, or another chosen service for speech-to-text conversion.
* **Payments**: [Stripe](https://stripe.com/) for handling one-time payments.
* **Deployment**: [Vercel](https://vercel.com/) or [AWS](https://aws.amazon.com/)

---

## Environment Variables (`.env` file)

This project uses environment variables to manage sensitive information and configuration settings. These variables are stored in a `.env` file at the root of your project.

**Important:** You **must** create and configure your `.env` file **before** running the project. If the file is missing or variables aren't set, the application won't function correctly. **Never commit your `.env` file directly to a public repository!** Instead, use a `.env.example` file (without sensitive values) for version control and provide instructions for setting up the actual `.env` file.

Here's an example `.env` file with all the necessary variables:

    ```ini
        # Clerk Authentication
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
        CLERK_SECRET_KEY=sk_test_YOUR_CLERK_SECRET_KEY
        SIGNING_SECRET=whsec_YOUR_CLERK_WEBHOOK_SECRET
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

        # Voice-to-Text API 

        # Hugging Face:
        # HF_TOKEN=hf_YOUR_HUGGINGFACE_TOKEN

        # Stripe Payments
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
        STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
        NEXT_PUBLIC_APP_URL=http://localhost:3000 # Or your deployed site's URL, e.g., [https://your-app.vercel.app](https://your-app.vercel.app)
        STRIPE_WEBHOOK_SECRET=whsec_YOUR_STRIPE_WEBHOOK_SECRET
        STRIPE_PRICE_ID=price_YOUR_STRIPE_PRICE_ID

        # Database (Prisma/PostgreSQL)
        DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
    ```
### Where to Get Your Variable Values:

* **Clerk**: Obtain your keys (`PUBLISHABLE_KEY`, `SECRET_KEY`, `SIGNING_SECRET`) from your [Clerk Dashboard](https://dashboard.clerk.com/).
* **OpenAI API**: Get your API key (`OPENAI_API_KEY`) from the [OpenAI API dashboard](https://platform.openai.com/account/api-keys).
* **Hugging Face**: Get your authentication token (`HF_TOKEN`) from your [Hugging Face profile settings](https://huggingface.co/settings/tokens).
* **Stripe**: Obtain your keys (`PUBLIC_KEY`, `SECRET_KEY`), set up webhooks (`WEBHOOK_SECRET`), and create a product price (`PRICE_ID`) in your [Stripe Dashboard](https://dashboard.stripe.com/).
* **Database**: Generate or obtain your PostgreSQL database URL. This depends on your database hosting provider (e.g., Neon, Supabase, ElephantSQL, or local setup).

---


## Getting Started


1. **Clone the repository:**
   ```bash
   git clone https://github.com/DmytroDD2/sonic_notes.git
   ```
2. Configure Environment Variables
   Create a .env file in the root of the project as described in the Environment Variables section above.

   Populate it with your respective API keys and database credentials.

3. Run the Development Server
   Next, install the project dependencies and run the development server:
    ```bash
     yarn install
     yarn dev
    ```
---

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Account Creation**: Users can sign up and create their accounts.
- **Free Transcriptions**: Upon registration, users receive 2 free Voice-to-Text transcriptions.
- **Transcription History**: The user dashboard displays a list of all past transcriptions.
- **Clerk & Prisma Integration**: Each Clerk user is associated with a user in your database (Prisma).
- **Action Logging**: Every user action (e.g., creating a Voice-to-Text transcription) is logged in the database.
- **Paywall**: Creating the 3rd and subsequent Voice-to-Text transcriptions requires payment via Stripe.
- **Stripe One-Time Payment**: Implemented one-time payment functionality via Stripe (in test mode).
- **Stripe Webhook Handling**: The application handles Webhook events from Stripe to confirm successful payments.
- **Post-Payment Access**: After a successful Stripe payment, the user gains unlimited access to the Voice-to-Text functionality.