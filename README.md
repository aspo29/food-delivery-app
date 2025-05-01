# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
=======
# 🍔 Food Delivery App

This is a **Food Ordering Web App** built using **React**, **TypeScript**, and **Firebase**. It allows users to browse food items, add them to cart, and place orders — all within a modern and responsive UI.

---

## 🚀 Features

- Browse food items  
- Add to cart and checkout  
- User authentication (Firebase Auth)  
- Realtime database integration (Firebase)  
- Type-safe codebase with TypeScript  
- Clean React component structure  

---

## 🛠 Tech Stack

- React  
- TypeScript  
- Firebase (Auth, Firestore, Hosting)  
- Tailwind CSS or Styled Components (based on setup)  

---

## 📦 Getting Started

If you want to run this project locally, follow these steps:

### 1. Clone the repo

```bash
git clone https://github.com/aspo29/food-delivery-app.git
cd food-delivery-app
```

### 2. Install dependencies

Make sure you have Node.js and npm (or yarn) installed.

```bash
npm install
# or
yarn install
```

### 3. Set up Firebase environment variables

Create a `.env` file in the root folder and add your Firebase project config:

```
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

⚠️ Do NOT commit your `.env` file. It is listed in `.gitignore` for security.
You can provide a `.env.example` for others to follow.

### 4. Run the app locally

```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:5173/ in your browser.

## 📁 Folder Structure

```
/src
  /components
  /pages
  /services
  /utils
.env.example
```

## ✅ To Do

- Admin panel for managing items
- Stripe integration for payments
- Order history page

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

MIT

## 🧑‍💻 Author

Made with ❤️ by Aashutosh (@aspo29)
