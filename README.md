# 🎧 AudioVerse - Cross-Platform Audio & Book App

**AudioVerse** is a mobile app built using **Expo + React Native**, providing a seamless experience for audio streaming, podcasts, and curated book listings. It features modern styling with **NativeWind** and secure, passwordless authentication using **Clerk**.

---

## 📱 App Screenshots

### 📚 Library Screen
![Library](./Screenshot%202025-07-11%20at%207.20.49%20PM.png)

### 🔍 Discover Screen
![Discover](./Screenshot%202025-07-11%20at%207.21.12%20PM.png)

### 👤 Profile Screen
![Profile](./Screenshot%202025-07-11%20at%207.21.32%20PM.png)

### 📝 Edit Profile Screen
![Edit Profile](./Screenshot%202025-07-11%20at%207.22.39%20PM.png)

---

## 🚀 Features

- 🎙️ Stream podcasts and audio content  
- 📚 Explore and list book-related audio resources  
- 🔐 Email-based OTP login with Clerk  
- 💅 Tailwind-style utility classes via NativeWind  
- 📱 Runs on both iOS and Android  
- 🧭 Navigation using React Navigation  
- 🎨 Gradient UI with Linear Gradient  
- ✅ Easy to scale, customize, and extend  

---

## 🧰 Tech Stack

| Technology           | Purpose                             |
|----------------------|-------------------------------------|
| Expo (React Native)  | Core cross-platform framework       |
| NativeWind           | Tailwind-style utility-first UI     |
| Clerk                | Auth with email OTP (magic links)   |
| Expo AV              | Audio playback support              |
| Expo Linear Gradient | Gradient backgrounds                |
| React Navigation     | Navigation stack/tabs               |
| TypeScript           | Strongly-typed codebase             |

---

## 🔐 Authentication with Clerk

Clerk provides:
- OTP-based email verification  
- Session management  
- Pre-built or customizable auth UIs  

### 🔧 Setup Steps

1. Create a [Clerk](https://clerk.dev) account  
2. Add your frontend API key to `.env`:

   ```env
   CLERK_PUBLISHABLE_KEY=your_clerk_key_here
