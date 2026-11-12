# 🎂 Sweet Crumbs Patisserie | Bakery Ordering & Kitchen Management System

A full-stack, production-ready web application built for artisanal bakeries and cake shops. It solves the two most critical problems of running a bakery:
1. **Customer Front Store:** Lets customers customize cake sizes, flavors, and piped inscriptions, schedule pickup/delivery times, and track their cake live as it bakes.
2. **Bakery Owner & Kitchen Operations Portal:** Real-time tracking of **cakes to prepare** in the oven, today's and all-time revenue, estimated net profit, 1-click status progression, and instant inventory stock toggling.

---

## 🌟 Key Features

### 🛒 1. Customer Storefront & Ordering
* **Custom Cake Builder:** Choose size (0.5 kg, 1.0 kg, 2.0 kg), flavor profile, and enter custom message piping (e.g. *"Happy 25th Birthday Sarah! 🎂"*).
* **Smart Prep Scheduling:** Pick pickup date and time slots so the kitchen knows when to start baking.
* **Store Pickup & Delivery Options:** Automatic calculation of delivery fees and 8% state sales tax.
* **Delightful Checkout Experience:** Seamless flow with celebratory confetti and immediate order ID generation (`#ORD-XXXX`).
* **Live Order Tracking (`/track`):** Interactive visual stepper tracking every stage:
  1. `Order Confirmed` 📝
  2. `Baking in Oven` 🧑‍🍳🔥
  3. `Decorating & Piping` 🎂✨
  4. `Ready for Pickup` 🎁📦
  5. `Completed & Handed Over` 🎉

---

### 🧑‍🍳 2. Bakery Owner & Operations Portal (`/admin`)
* **Kitchen Prep Queue ("Cakes to Prepare"):** Real-time count and card stack of cakes needing baking and decoration, ordered by scheduled customer pickup time.
* **1-Click Kitchen Status Advance:** Bakers can advance tickets with a single click:
  `[Start Baking 🧑‍🍳]` ➔ `[Decorating 🎂]` ➔ `[Mark Ready 🎁]` ➔ `[Hand Over to Customer ✅]`.
* **Printable Kitchen Slips:** 1-click printable thermal prep tickets displaying exact customer inscription text and allergen notes.
* **Financial Analytics & Revenue:**
  * Today's gross revenue & units sold.
  * Total all-time revenue & Average Order Value (AOV).
  * Estimated Net Profit projection (standard 65% bakery gross margin).
  * Top revenue-generating cakes breakdown.
* **Menu Stock & Availability Control:** Toggle any item to *"Sold Out for Today"* in 1 click when ingredients (e.g. fresh strawberries) run out.
* **Demo Data Reset:** Easily reset sample orders and revenue figures at any time to demonstrate the app to new clients.

---

## 🛠️ Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (warm bakery color palette)
* **Icons:** Lucide React
* **Effects:** Canvas Confetti
* **State Management:** React Context with LocalStorage persistence

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel (1-Click Deployment)

This application is ready to deploy directly to Vercel with zero server configuration:
1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **"Deploy"**.
4. Your live bakery website and admin portal will be live in under 60 seconds with a free `.vercel.app` URL!
