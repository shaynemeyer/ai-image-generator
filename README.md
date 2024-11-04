# AI Image Generator
NextJS application for generating images using AI.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![](docs/localhost_3000_.png)

---
## Todos

- fix theme toggle icon sizing.
- Add gallery of customer images, need to create the action to fetch the images.
- Fix chat ui issues.
- fix credits bubble being cutoff.
- add remove image support.
- add ability to save chat conversations.

---
## What we use

- [NextJS 15](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/) - for authentication.
- [PostgreSQL](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [File Saver](https://www.npmjs.com/package/file-saver) - For downloading images
- [React Paypal JS](https://www.npmjs.com/package/@paypal/react-paypal-js) - Paypal transactions.
- [OpenAI Image Generation](https://platform.openai.com/docs/overview) - For generating images.
- [`@google/generative-ai`](https://www.npmjs.com/package/@google/generative-ai) - Gemini Chat
- [`react-chat-ui`](https://www.npmjs.com/package/react-chat-ui) - ChatBot UI
