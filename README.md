# 🚀 Postinger - Modern Social Media Platform

Postinger is a sleek, feature-rich social media application built with a modern tech stack. It provides a seamless user experience for sharing posts, following users, and engaging with content.

![Postinger Preview](https://github.com/mohammed-abdelhafiz/Postinger-Social-media-app/raw/main/preview.png) *(Replace with actual screenshot if available)*

## ✨ Key Features

- **🔐 Robust Authentication**: Secure login, registration, and password recovery (forgot/reset) flows.
- **📱 Dynamic Feed**: Real-time post updates with optimistic UI for a lag-free experience.
- **✍️ Content Creation**: Full-featured post creation with support for text and media.
- **❤️ Social Engagement**: Like posts, comment on discussions, and follow your favorite creators.
- **🔍 Discover Hub**: Easily find new users and trending content through global search.
- **👤 Profile Management**: Personalized profiles showing user activity, followers, and bio.
- **🌗 Theme Support**: Fully responsive design with native Dark and Light mode support.
- **⚡ Performance-First**: Built with Next.js 16 and React 19 for optimal speed and SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Core**: [React 19](https://react.dev/) with [React Compiler](https://react.dev/learn/react-compiler)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) & [TanStack Query v5](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [Sonner](https://sonner.stevenly.me/)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mohammed-abdelhafiz/Postinger-Social-media-app.git
   cd postinger-social-media-app/frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:

   Create a `.env` file in the root of the frontend directory and add your configuration:

   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/features`: Component logic grouped by feature (auth, posts, users, comments).
- `src/shared`: Global components, hooks, and utility functions used across the app.
- `src/proxy.ts`: API proxy configuration for seamless backend communication.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ by [Mohammed Abdelhafiz](https://github.com/mohammed-abdelhafiz)
