# Dashboard Project

This project is a high-performance dashboard built with **React** and **Next.js**. The primary focus of this application is speed, efficient data fetching, and a seamless user interface.

---

## 🚀 Setup Instructions

Follow these steps to get the project running locally:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <project-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open the app:**
    Navigate to `http://localhost:3000` in your browser.

---
## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

`NEXT_PUBLIC_API_URL` = https://dashboard-ui-two-omega.vercel.app/  


## 🛠 Tech Stack

* **Framework:** Next.js / React
* **Styling & UI:** Tailwind CSS & Shadcn UI
* **Data Fetching:** TanStack Query (React Query) & Axios
* **State Management:** Zustand
* **Charts:** Recharts (integrated with Shadcn)
* **Deployment:** Vercel
* **Backend:** API routes (built without a traditional database)

---

## 🏗 Architecture Decisions

The core philosophy of this project is **performance optimization** by minimizing unnecessary server overhead.

### 1. Efficient Data Fetching & Caching
To prevent redundant API calls, I implemented **TanStack Query**. 
* **Caching Strategy:** I configured a 5-minute cache duration. When a user requests data, the app first checks the cache. If the data is available and fresh, it serves it immediately rather than hitting the API/database.
* **Race Conditions:** TanStack Query natively handles race conditions, ensuring that only the most recent request's data is reflected in the UI.
* **Simplicity:** Using TanStack Query allows for cleaner code by providing built-in states like `isLoading`, `error`, and `data`, reducing the need for manual `useEffect` hooks. It also works seamlessly with **Axios**.

### 2. UI & Component Design
* **Shadcn UI & Tailwind:** I chose Shadcn for its high-quality, accessible components. This allowed for a rapid build of the dashboard while maintaining a professional look.
* **Recharts:** For data visualization, I used Recharts due to its seamless integration with the Shadcn design system.

### 3. State Management
* **Zustand:** For global client-side state management, I used Zustand. It is lightweight, has a small footprint, and avoids the boilerplate complexity of Redux, keeping the codebase readable and maintainable.

---

## 📋 Assumptions Made

* **Data Persistence:** It is assumed that data does not need to be stored in a permanent database for this version, as the API operates independently of one.
* **Cache Freshness:** A 5-minute stale time is considered optimal for this dashboard’s use case to balance data accuracy with performance.
* **API Reliability:** The architecture assumes the provided API endpoints follow RESTful conventions and are compatible with Axios.
* **User Environment:** The application is assumed to be viewed on modern web browsers that support CSS Grid and Flexbox (supported by Tailwind).
