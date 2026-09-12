# A1 Properties - Agra Real Estate Platform

A modern real estate portal for **A1 Properties**, Agra's premier property consultancy led by **Mr. Vishal Verma**.

## 🌟 Key Features
- **Bilingual Experience**: Instant 1-click toggle between **English** and **Hindi (हिंदी)** across the entire website.
- **Verified Property Listings**:
  - Independent Houses & Luxury Duplex Villas (Avas Vikas Colony, Shastripuram)
  - Industrial Warehouses & Commercial Sheds (Kanpur-Agra Highway, Kuberpur)
  - Educational Institutions & College Campuses (Fatehabad Road, Bamrauli Katara)
- **High-Performance Tech Stack**:
  - **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
  - **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), Cloudinary (for image uploads), JWT authentication.

---

## 🌐 Quick Deployment Guide

### Option A: Frontend on Vercel (Recommended - Fastest & Free)
1. Go to [Vercel.com](https://vercel.com) and log in with GitHub.
2. Click **"Add New..."** ➔ **"Project"** ➔ Import `priyaverma0604/A1Properties`.
3. Set the following Project Settings:
   - **Root Directory**: `frontend` (Click *Edit* and select the `frontend` folder).
   - **Framework Preset**: `Next.js`
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-app.onrender.com/api` (or keep default for static/mock mode)
5. Click **"Deploy"**.

---

### Option B: Backend on Render (Free Web Service)
1. Go to [Render.com](https://render.com) and log in with GitHub.
2. Click **"New +"** ➔ **"Web Service"** ➔ Connect `priyaverma0604/A1Properties`.
3. Configure:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. In **Environment Variables**, add:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: *(your secret key)*
   - `MONGODB_URI`: *(your MongoDB Atlas URI)*
   - `FRONTEND_URL`: *(your deployed Vercel URL)*
5. Click **"Create Web Service"**.

---

## 💻 Local Development

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 2. Backend
```bash
cd backend
npm install
npm run dev
```
API runs at [http://localhost:5000](http://localhost:5000)
