This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production configuration

Copy `.env.example` to `.env.local` and replace every example value with the
real studio data. The contact section only renders phone, WhatsApp, e-mail and
address entries that are configured, so placeholder business information is
never published accidentally.

Lead submissions are sent server-side to `LEAD_WEBHOOK_URL`. A successful
webhook response must use a `2xx` status; otherwise the visitor sees an honest
error and the form remains filled in. The webhook receives JSON in this shape:

```json
{
  "event": "lead.created",
  "lead": {
    "name": "Jan",
    "phone": "+48 500 000 000",
    "service": "ceramika",
    "details": "Typ auta: SUV / Crossover"
  },
  "source": "primero.studio",
  "createdAt": "2026-07-10T10:00:00.000Z"
}
```

If `LEAD_WEBHOOK_TOKEN` is set, it is sent as a Bearer token in the
`Authorization` header. Without `LEAD_WEBHOOK_URL`, the API returns `503` and
the UI does not claim that a request was delivered.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
