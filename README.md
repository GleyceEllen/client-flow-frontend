# Client Flow

React application (Vite + Redux Toolkit + Material-UI) for managing clients.

---

## 🚀 Setup

### Requirements
- Node.js >= 16
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/GleyceEllen/client-flow-frontend.git
cd client-flow-frontend

# Install dependencies
npm install

# Run API
npm run start:api
http://localhost:4000/clients

# Run project
npm run dev
open http://localhost:5173

# E-mail and password to login
- admin@user.com
- Pass1234

## 📂 Project Structure
src/
 ├─ pages/
 │   ├─ Login.jsx
 │   ├─ ClientsList.jsx
 │   └─ ClientForm.jsx
 ├─ components/
 │   └─ Header.jsx
 ├─ services/
 │   └─ cepService.js
 ├─ store/
 │   ├─ index.js
 │   ├─ authSlice.js
 │   └─ clientsSlice.js
 ├─ App.jsx
 └─ main.jsx

---

## 🛠️ Architecture

- **React + Vite** → Modern SPA setup.
- **Redux Toolkit** → Global state management (`auth`, `clients`).
- **React Router DOM** → Client-side routing.
- **Material-UI (MUI)** → Responsive UI components.
- **BrasilAPI** → Address lookup by ZIP code.

### Application Flow
1. User interacts with forms or pages.
2. Actions trigger `dispatch` calls to Redux.
3. The global store updates the state (`clients`, `auth`).
4. Components automatically react to state changes.
