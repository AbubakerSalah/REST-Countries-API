# 🌍 Country Explorer

**Country Explorer** is a React application that allows users to explore countries from around the world. It fetches real-time data from the [REST Countries API](https://restcountries.com/) and displays useful information such as population, region, capital, languages, and more. The app also includes a search feature and a region filter.

---

## 📦 Technologies Used

- ⚡ **React.js** – Frontend library
- 🌐 **Axios** – Fetching API data
- 🎨 **Tailwind CSS** – Styling
- 🗺 **REST Countries API** – Data source
- 🏗 **Vite** – Build tool for a fast development experience

---

##  Features

Here's what you can do with **Country Explorer**:

- 🔎 **Search for a country**: Type in the search bar to find a country quickly.
- 🌍 **Filter by region**: Use the dropdown to show countries from a specific region.
- 📌 **View country details**: Click on a country to see detailed information, including:
  - **Flag**
  - **Native Name**
  - **Population**
  - **Region & Subregion**
  - **Capital City**
  - **Currencies & Languages**
  - **Bordering Countries**
- ⏪ **Go back to the main list**: A back button lets users return to the country list.

---

## 🎯 How It Works

1. **Fetching Data**:
   - When the app loads, it fetches all country data from the **REST Countries API**.
   - The data is stored in the `countries` state.

2. **Searching & Filtering**:
   - The search input filters countries by name.
   - Users can also filter countries by continent using the dropdown.

3. **Selecting a Country**:
   - Clicking on a country shows a detailed view with additional information.
   - Users can navigate back to the main list.

---

## 👩🏽‍🍳 The Process

I started by fetching country data from the **REST Countries API** and displaying it in a simple list format. From there, I added the ability to **filter countries by region** and **search for a country** using a text input.

Next, I focused on the **country details page**, ensuring users could view more information about each country when selected. This included details such as population, languages, and neighboring countries.

Once the core functionalities were in place, I improved the **UI design using Tailwind CSS** and made sure everything looked clean and easy to use.

Throughout the process, I took notes on what I learned, from handling API calls efficiently to implementing filtering and search functionality.

---

## 📚 What I Learned

### 🎛 State Management
- Improved my skills in **React Hooks** (`useState`, `useEffect`, `useMemo`) for managing state.
- Used `useMemo` to **optimize filtering performance**, preventing unnecessary re-renders.

### 🎨 UI Improvements with Tailwind CSS
- Applied **Tailwind CSS** for better UI styling.
- Focused on a **clean and simple user interface**.



### 🚀 **Country Explorer** is a fun and simple way to learn about countries worldwide! 🌎✨
