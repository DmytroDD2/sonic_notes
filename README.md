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