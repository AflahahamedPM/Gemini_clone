🚀 Gemini Clone
Live Demo 👉 [View Live App](http://gemini-clone-six-zeta.vercel.app)

📖 Overview
Gemini Machine Task is a fully functional chat interface built with Next.js, Tailwind CSS, and ShadCN UI. It supports:

🧠 Dynamic Chat Rendering

📜 Infinite Scroll Pagination

📦 Redux Integration

🌗 Light/Dark Mode

✅ Form Validation with Zod

📋 Copy-to-Clipboard Chat Items

🧱 Tech Stack
Next.js (App Router)

Tailwind CSS (Utility-first CSS)

Shadcn UI (for UI components)

Redux Toolkit (state management)

Redux Persistor (To persist the state)

Zod (form validation)

Ant Design Icons

🗂️ Folder Structure
```
📁 GEMINI_MACHINE_TASK/
├── app/                  → Next.js app routing
├── components/           → Reusable components (Chat UI, Buttons, etc.)
├── hooks/                → Custom hooks (e.g., useAlert)
├── lib/                  → Utility functions (e.g., chat operations)
├── node_modules/
├── public/               → Static assets
├── Redux/                → Redux slices & store config
├── themes/               → Theme config (light/dark)
├── utils/                → Helpers like formatters
├── .gitignore
├── components.json
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
```

🧪 Validation with Zod
Used Zod to validate user input and prevent empty messages.

Example:

const schema = z.object({
  message: z.string().min(1, "Message is required"),
});


💡 Features

✅ Chat message auto-scroll to bottom on new messages

✅ Auto-pagination

✅ Light/Dark theme toggle

✅ Copy message to clipboard

✅ Mobile responsive layout

⚙️ Setup & Run Locally
1. Clone the Repository

git clone https://github.com/AflahahamedPM/Gemini_clone

cd gemini-machine-task

2. Install Dependencies

npm install

3. Run the Development Server

npm run dev

Visit http://localhost:3000 to view it in your browser.


📌 TODO
 
Skeleton