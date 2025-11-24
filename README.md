# 🐾 Cat Memory Games  
A small React project with two memory-game modes

<h2 align="center">🎮 Live Demo </h2>
<p align="center"><a href="https://cards-nu-three-13.vercel.app"> Link </a></p>

<p align="center">
  <a href="https://cards-nu-three-13.vercel.app">
    <img src="src/assets/preview.webp" width="650" alt="Demo Preview"/>
  </a>
</p>

A cat-themed memory game built with **React**, **Context API**, smooth animations, dynamic backgrounds, and a local high-score system.

## 🎮 Game Modes

### **1. Match the Cats (Pairs)**
- All cards start face-down  
- You flip two cards each turn  
- Matching pairs stay revealed  
- Goal: finish the game in as few turns as possible  

### **2. Pick Every Cat (Unique Click)**
- Each card can be clicked **only once**  
- Clicking the same card twice = game over  
- Cards reshuffle after every click  
- Goal: click all unique cards without repeating  

---

## ⭐ Features
- Two gameplay modes  
- Four difficulty levels (4 / 6 / 9 / 12 cards)  
- Best scores saved via `localStorage`  
- Fade-in, flip and hover animations  
- Dynamic backgrounds using CSS variables  
- Centralized state management via **AppContext**  
- Cat images loaded from external API  
- Responsive grid layout  

---

## 🛠 Tech Stack
- **React 18**  
- **Context API**  
- **TailwindCSS**  
- CSS animations  
- `fetch` for data loading  
- `localStorage` for saving records  

---

## 📂 Main Components
- **Menu.jsx** — mode & difficulty selector  
- **Pair.jsx** — pair-matching gameplay  
- **UnPair.jsx** — unique-click gameplay  
- **Result.jsx** — end-screen & high-score logic  
- **App.jsx** — main logic, context, themes, data loading  

---

## 🚀 Run Locally

```bash
npm install
npm run dev
