<div align="center">

<img src="docs/screenshots/banner.jpg" alt="FoodExpress" width="100%">

<br>

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-3-319795?logo=chakraui&logoColor=white&style=for-the-badge)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white&style=for-the-badge)
![PayPal](https://img.shields.io/badge/PayPal-Checkout-00457C?logo=paypal&logoColor=white&style=for-the-badge)
![Laravel](https://img.shields.io/badge/Laravel-API-FF2D20?logo=laravel&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A complete restaurant ordering and delivery platform: one app for customers, restaurant admins and delivery drivers.**

🖥️ **Frontend** (this repo) · ⚙️ [**Backend API**](https://github.com/AbdelmoujibChahil/FoodExpress-Backend)

[Features](#-features) · [Screenshots](#-screenshots) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Authors](#-authors)

</div>

<!-- Add your live demo here once deployed:
**🌐 Live demo:** https://your-demo-link
-->

---

## 📖 About

**FoodExpress** is a React web application that covers the full life of a food order. A customer browses the menu, fills a cart and pays online or in cash. The restaurant team receives the order in real time, updates its status and assigns a driver. The driver then follows the delivery until it is completed.

The project was built to practice a real-world, multi-role application: authentication, protected and admin-only routes, payment integrations, data dashboards and a responsive UI.

> **This repository contains the frontend.** It talks to a Laravel REST API that lives in a separate repository: [FoodExpress-Backend](https://github.com/AbdelmoujibChahil/FoodExpress-Backend). Both were built together by [Essafil Amine](https://github.com/amine-essafil) and [Abdelmoujib Chahil](https://github.com/AbdelmoujibChahil).

<p align="center">
  <img src="docs/screenshots/home-hero.jpg" alt="FoodExpress home page" width="100%">
</p>

## 📑 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Roles and Access](#-roles-and-access)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Authors](#-authors)

## ✨ Features

### 🛒 Customer
- Landing page with hero banner, weekly fan favorites, "Why choose us" and chef presentation
- Menu with **category filters** (Burgers, Pizza, Sandwich, Tacos, Chicken), **search** and **sorting**
- Shopping cart with quantity controls, live subtotal and delivery fee
- Three-step checkout: **Cart → Delivery → Payment**
- Payment by **cash on delivery**, **credit/debit card (Stripe)** or **PayPal**
- Sign up, login (with Google sign-in support) and protected profile area
- Account information, password change and **order history**
- Contact form to reach the restaurant

### 🧑‍🍳 Admin panel
- **Dashboard** with KPIs, revenue trends and order status distribution (Chart.js)
- **Orders**: filter by status, search by ID, customer or phone, and update statuses
- **Menu management**: add, edit, enable/disable and delete items
- **Customers**: statistics, filters, add and edit accounts
- **Drivers**: add drivers and track their status and deliveries
- **Deliveries**: assign an available driver to an order
- **Reports**: inbox for customer messages with priority and status

### 🛵 Driver
- "My Deliveries" view with customer details, address and order content
- Mark a delivery as completed or cancel it, from desktop or mobile

## 🖼️ Screenshots

### Customer experience

<p align="center">
  <img src="docs/screenshots/menu.jpg" alt="Menu" width="100%">
</p>

<p align="center">
  <img src="docs/screenshots/checkout-payment.jpg" alt="Payment method" width="100%">
</p>

<details>
<summary><b>See more customer screens</b></summary>
<br>

<p align="center">
  <img src="docs/screenshots/home-favorites.jpg" alt="Fan favorites" width="49%">
  <img src="docs/screenshots/home-chefs.jpg" alt="Meet the chefs" width="49%">
</p>
<p align="center">
  <img src="docs/screenshots/cart.jpg" alt="Cart" width="49%">
  <img src="docs/screenshots/checkout-delivery.jpg" alt="Delivery details" width="49%">
</p>
<p align="center">
  <img src="docs/screenshots/login.jpg" alt="Login" width="49%">
  <img src="docs/screenshots/signup.jpg" alt="Sign up" width="49%">
</p>
<p align="center">
  <img src="docs/screenshots/profile.jpg" alt="Profile" width="49%">
  <img src="docs/screenshots/order-history.jpg" alt="Order history" width="49%">
</p>
<p align="center">
  <img src="docs/screenshots/contact.jpg" alt="Contact form" width="100%">
</p>

</details>

### Admin panel

<p align="center">
  <img src="docs/screenshots/admin-dashboard.jpg" alt="Admin dashboard" width="100%">
</p>

<p align="center">
  <img src="docs/screenshots/admin-orders.jpg" alt="Orders management" width="100%">
</p>

<details>
<summary><b>See more admin screens</b></summary>
<br>

<p align="center">
  <img src="docs/screenshots/admin-order-status.jpg" alt="Update order status" width="49%">
  <img src="docs/screenshots/admin-menu.jpg" alt="Menu management" width="49%">
</p>
<p align="center">
  <img src="docs/screenshots/admin-menu-edit.jpg" alt="Edit menu item" width="49%">
  <img src="docs/screenshots/admin-customers.jpg" alt="Customers" width="49%">
</p>
<p align="center">
  <img src="docs/screenshots/admin-drivers.jpg" alt="Drivers" width="49%">
  <img src="docs/screenshots/admin-deliveries.jpg" alt="Deliveries" width="49%">
</p>
<p align="center">
  <img src="docs/screenshots/admin-assign-driver.jpg" alt="Assign a driver" width="49%">
  <img src="docs/screenshots/admin-reports.jpg" alt="Reports and messages" width="49%">
</p>

</details>

### Driver

<p align="center">
  <img src="docs/screenshots/driver-deliveries.jpg" alt="Driver deliveries" width="68%">
  <img src="docs/screenshots/driver-mobile.jpg" alt="Driver mobile view" width="25%">
</p>

## 🛠️ Tech Stack

| Area | Tools |
|---|---|
| **Framework** | React 18, Vite |
| **Routing** | React Router 6 (protected and admin-only routes) |
| **UI** | Chakra UI, Emotion, Framer Motion, Font Awesome, React Icons, Lucide |
| **Charts** | Chart.js, react-chartjs-2 |
| **HTTP** | Axios with Bearer-token interceptor |
| **Payments** | Stripe, PayPal |
| **State** | React Context (auth and cart) |
| **Tooling** | ESLint, Docker, Docker Compose |

**Backend** ([separate repo](https://github.com/AbdelmoujibChahil/FoodExpress-Backend)): Laravel 9 (PHP 8), MySQL, JWT authentication, Google sign-in (Socialite), Stripe and PayPal payment services, Swagger API documentation, Laravel Sail (Docker).

## 📁 Project Structure

```
src/
├── admin/        # Dashboard, Orders, Menu, Customers, Drivers, Deliveries, Reports
├── api/          # Axios modules: auth, orders, meals, payments, drivers, reports...
├── components/   # Navbar, Header, Footer, FoodItem, Menu, notifications
├── context/      # AuthContext and CartContext
├── pages/        # Landing, Menu, Cart, Checkout, Payment, Login, Signup, Profile, Contact
├── routes/       # App routes, ProtectedRoute and AdminRoute
└── assets/       # Images, icons, food and chef photos
```

## 🚀 Getting Started

The app needs both parts running: the **backend API** on port `8000` and the **frontend** on port `3000`.

### 1. Start the backend

Requirements: PHP 8+, Composer and MySQL.

```bash
git clone https://github.com/AbdelmoujibChahil/FoodExpress-Backend.git
cd FoodExpress-Backend
composer install
cp .env.example .env        # then set your DB_* values (and Stripe / PayPal / Google keys)
php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan serve           # API on http://localhost:8000
```

Interactive API docs (Swagger) are available at `http://localhost:8000/api/documentation` once the backend is running. See the [backend README](https://github.com/AbdelmoujibChahil/FoodExpress-Backend) for full details.

### 2. Start the frontend

Requirements: **Node.js 20+** and npm.

```bash
git clone https://github.com/amine-essafil/restaurant-app.git
cd restaurant-app
npm install
npm run dev
```

Open **http://localhost:3000**.

### Run with Docker

```bash
docker compose up --build
```

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the code with ESLint |

## ⚙️ Configuration

- **API URL:** set in `src/api/Client.api.js` (default `http://localhost:8000`). Change it if your backend runs elsewhere.
- **Payments:** Stripe and PayPal are configured with **test** credentials. Replace them with your own keys before going to production, and never commit secret keys.

## 🔐 Roles and Access

| Role | Access |
|---|---|
| **Customer** | Menu, cart, checkout, profile and order history |
| **Admin** | Everything above plus all `/admin/*` pages |
| **Driver** | Assigned deliveries |

## 🗺️ Roadmap

- [ ] Live demo deployment
- [ ] Move API URL and payment keys to environment variables
- [ ] Real-time order tracking for customers
- [ ] Multi-language support (French / Arabic / English)
- [ ] Automated tests

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👥 Authors

This project (frontend and backend) was built in collaboration by:

| | Name | GitHub |
|---|---|---|
| 👨‍💻 | **Essafil Amine** | [@amine-essafil](https://github.com/amine-essafil) |
| 👨‍💻 | **Abdelmoujib Chahil** | [@AbdelmoujibChahil](https://github.com/AbdelmoujibChahil) |

---

<div align="center">
⭐ If you like this project, consider giving it a star!
</div>
