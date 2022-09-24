This is a project starter framework build with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [Apollo](https://www.apollographql.com), and [Supabase](https://supabase.com).

Demo: [https://ei8-cms.vercel.app](https://ei8-cms.vercel.app)<br>
Admin Demo: [https://ei8-cms.vercel.app/admin](https://ei8-cms.vercel.app/admin)

## Getting Started

### Setup Local Database
- Create new PostgreSQL database on local machine.

### Setup Supabase Project

Supabase is the default database and storage for Ei8-CMS.

- Login and create new project.
- On project home page, get your **anon key** from **Project API Keys** section and **Supabase URL** from **Project Configuration** section.
- On Settings > Database, get your **Nodejs Postgresl URL** from **Connection string** section.

### Setup Supabase Storage

- On Storage, create a new bucket named **assets** and set it as **Public bucket**.
- Go to **Policies** page.
- On assets, **create new policy** named with “Allow all access for all users”. Check all operations. Review and save.

### Setup Project ENV

- Duplicate `.env.template` to `.env.local`.
- Replace `DATABASE_URL` with your local database URL.
- Duplicate and comment `DATABASE_URL` with value from Supabase. This will be used when deploying the project.
- Fill `NEXT_PUBLIC_SUPABASE_URL` with value from Supabase.
- Fill `NEXT_PUBLIC_SUPABASE_ANON_KEY` with value from Supabase.
- Fill `NEXT_PUBLIC_ACCESS_TOKEN_KEY` with random or generated token.
- Replace `NEXT_PUBLIC_ADMIN_USERNAME` and `NEXT_PUBLIC_ADMIN_PASSWORD` with something more secure.

### Setup NextJS
- Open `next.config.js`
- Replace `images.domains` with Supabase URL

### Install development server:

```bash
npm i
# migrate prisma.schema to database
npm run db:migration
```

### Run the development server:

```bash
npm run dev
# preview database table (optional)
npm run db:studio
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) with your browser to open the CMS.
Login to with username and password from `.env.local`. Fill in title for Home page and hit **Save**.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). This endpoint can be edited in `pages/api/graphql.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn about other dependencies of this framework, visit:
- [Prisma](https://www.prisma.io)
- [Apollo GraphQL](https://www.apollographql.com)
- [Supabase](https://supabase.com)

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- Open `.env.local` file and replace `DATABASE_URL` with PostgreSQL URL from Supabase (or somewhere else).
- Run `npm run db:migrate` on your terminal.
- Create and deploy your project on Vercel.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
