# EduNexus

EduNexus is a comprehensive, full-stack educational web platform designed to provide structured learning paths, gamified skill assessments, job tracking, and community engagement for developers and tech enthusiasts.

---

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router) with React
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Database:** Supabase
* **ORM:** Prisma
* **Authentication:** NextAuth.js
* **Content Management:** Markdown-based content rendering

---

## ✨ Key Features

### 🗺️ Interactive Roadmaps (`/roadmaps`)

Extensive, Markdown-backed learning paths covering various domains, including:

* Frontend Development
* Backend Development
* DevOps
* Data Science
* Cyber Security
* Game Development
* And more

### 🎮 The Arena (`/arena`)

Gamified technical challenges designed to test and sharpen technical skills.

Modules include:

* **Big O Blitz** — Algorithm efficiency
* **Regex Rush** — Regular expressions
* **SQL Sniper** — Database queries
* **PR Ranger** — Code review and Git
* **Port Panic** — Networking
* **STAR Maestro** — Interview preparation

### 🤖 AI Tutor (`/ai-tutor`)

Integrated AI assistance for:

* Personalized learning
* Code explanations
* Technical questions
* Dynamic study support

### 📊 Application Tracker (`/tracker`)

A dedicated dashboard for tracking job and internship applications.

Features include:

* Application timelines
* Status tracking
* Status pie charts
* Recent application logs
* Application management dashboard

### 👥 Community Hub (`/community`)

A social space where users can:

* Create posts
* Share media
* Interact with other learners
* Participate in the developer community

---

## 📁 Project Structure

```text
EduNexus/
├── prisma/                # Prisma schema and database configuration
├── public/                # Static assets (SVGs, icons)
├── src/
│   ├── app/               # Next.js App Router (Pages, API routes, Layouts)
│   │   ├── api/           # Backend endpoints
│   │   │   ├── auth/
│   │   │   ├── ai-tutor/
│   │   │   ├── generate/
│   │   │   └── signup/
│   │   ├── arena/         # Gamified assessment pages
│   │   ├── roadmaps/      # Roadmap viewer and dynamic routing
│   │   └── tracker/       # Job application tracking dashboard
│   ├── components/        # Reusable React components
│   │   ├── UI/
│   │   ├── Arena/
│   │   ├── Tracker/
│   │   └── Community/
│   ├── content/           # Markdown files for official roadmaps
│   └── lib/               # Utility functions and database client setup
├── .env                   # Environment variables
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Project dependencies and scripts
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/YOUR_USERNAME/EduNexus.git
cd EduNexus
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_url

# AI API
AI_API_KEY=your_ai_api_key
```

> **Note:** Replace the example values with your actual configuration. Do not commit `.env` to Git.

### 4. Initialize the Database

Generate the Prisma client:

```bash
npx prisma generate
```

Push the Prisma schema to your Supabase database:

```bash
npx prisma db push
```

### 5. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

Open the URL in your browser to start using EduNexus.

---

## 🔐 Environment Variables

EduNexus requires environment variables for authentication, database connectivity, and AI functionality.

Typical configuration includes:

| Variable          | Purpose                                 |
| ----------------- | --------------------------------------- |
| `NEXTAUTH_SECRET` | Secret used by NextAuth.js              |
| `NEXTAUTH_URL`    | Application URL                         |
| `DATABASE_URL`    | Supabase/PostgreSQL database connection |
| `AI_API_KEY`      | API key for AI functionality            |

> **Security:** Never expose API keys, database credentials, or authentication secrets in your source code or public repository.

---

## 📌 Available Routes

| Route        | Description                           |
| ------------ | ------------------------------------- |
| `/roadmaps`  | Browse structured learning roadmaps   |
| `/arena`     | Practice technical challenges         |
| `/ai-tutor`  | Interact with the AI Tutor            |
| `/tracker`   | Track job and internship applications |
| `/community` | Connect with other learners           |

---

## 🚀 Future Improvements

Potential future enhancements include:

* AI-powered personalized roadmaps
* Advanced progress tracking
* More technical challenge modules
* Enhanced community features
* Internship and job recommendations
* AI-powered interview preparation
* Real-time notifications
* More learning resources and domains

---

## 📄 License

This project is intended for educational and portfolio purposes.
