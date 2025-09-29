# Atmosly SpaceX Mission Explorer

A React-based web application to explore SpaceX launches. Fetch real-time data from the SpaceX public API, filter launches, and view detailed information about each mission.

---

## Live URL
- https://react-assignment-psi-gold.vercel.app/

---

##  Features

- View a list of SpaceX launches with key details.
- Filter launches by year or mission name.
- View mission details in a modal with rocket information.
- External links to Wikipedia and webcast .
- Responsive UI built with Tailwind CSS.
- Favorite launches stored in localStorage.

---

##  Tech Stack

- **Frontend Framework:** React + TypeScript  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS , Shadcn-UI
- **State Management:** Context API  
- **Testing:** Vitest + React Testing Library  
- **API:** SpaceX Public API, Axios  
- **Containerize:** Docker

---

##  Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

### 2. Running with Docker 
```bash
docker build -t atmosly-spacex .
docker run -p 8080:80 atmosly-spacex
```

##  Running Tests
```bash
npm run test
```

##  Developer

Developed by Yash Gupta with ☕ and ❤️.