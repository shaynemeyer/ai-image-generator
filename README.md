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
## Outstanding Issues

- <strike>Fix theme toggle icon sizing.</strike>
- <strike>Fix credits bubble being cutoff.</strike>
- <strike>Add remove image support</strike>.
- Fix Refresh after updating not working properly when deleting images.
- <strike>Fix chat ui render issues.</strike> 
- Fix scroll to chat issues.
- Add gallery of customer images, need to create the action to fetch the images.
- Add ability to save chat conversations.
- 

--- 
## Attributions

- This project is based on work from the excellent NextJS course by Ryan Dhungel on [Udemy](https://www.udemy.com/course/ai-saas-image-generator-chatbot-react-nextjs-typescript/)
  
---
## What we use

- [NextJS 14](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/) - for authentication.
- [PostgreSQL](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [File Saver](https://www.npmjs.com/package/file-saver) - For downloading images
- [React Paypal JS](https://www.npmjs.com/package/@paypal/react-paypal-js) - Paypal transactions.
- [OpenAI Image Generation](https://platform.openai.com/docs/overview) - For generating images.
- [`@google/generative-ai`](https://www.npmjs.com/package/@google/generative-ai) - Gemini Chat
- [Chat UI based on `shadcn-chat`](https://docs-shadcn-chat.vercel.app/)
