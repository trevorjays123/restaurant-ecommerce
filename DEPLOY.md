# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (free tier)

---

## Step 1: Prepare Your Code

1. **Push to GitHub**
```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub and push
git remote add origin https://github.com/yourusername/restaurant-ecommerce.git
git push -u origin main
```

---

## Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user (username/password)
5. Add IP address: `0.0.0.0/0` (allows all IPs)
6. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xyz123.mongodb.net/restaurant?retryWrites=true&w=majority
   ```

---

## Step 3: Deploy Backend to Render

1. Go to [Render](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: restaurant-api
   - **Region**: Frankfurt (or closest to Nigeria)
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   - `NODE_ENV`: production
   - `PORT`: 5000
   - `MONGODB_URI`: your_mongodb_connection_string
   - `JWT_SECRET`: generate_a_secure_random_string
   - `PAYSTACK_SECRET_KEY`: (get from Paystack dashboard)
   - `FLUTTERWAVE_SECRET_KEY`: (get from Flutterwave dashboard)
   - `FRONTEND_URL`: https://your-vercel-url.vercel.app

6. Click "Create Web Service"

7. Wait for deployment to complete, then copy your backend URL:
   ```
   https://restaurant-api.onrender.com
   ```

---

## Step 4: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: https://restaurant-api.onrender.com
   - `VITE_SOCKET_URL`: https://restaurant-api.onrender.com
   - `VITE_PAYSTACK_PUBLIC_KEY`: your_paystack_public_key
   - `VITE_FLUTTERWAVE_PUBLIC_KEY`: your_flutterwave_public_key

6. Click "Deploy"

7. Wait for deployment to complete, copy your frontend URL:
   ```
   https://your-project.vercel.app
   ```

---

## Step 5: Update Configuration

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Go to Vercel dashboard
4. Update `vercel.json` with your actual backend URL:
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://restaurant-api.onrender.com/api/:path*" },
    { "source": "/socket.io/:path*", "destination": "https://restaurant-api.onrender.com/socket.io/:path*" }
  ]
}
```

---

## Step 6: Seed the Database

1. Open your backend URL in browser:
   ```
   https://restaurant-api.onrender.com/api/menu
   ```
   
2. Or use a tool like Postman to manually trigger seeding by calling any menu endpoint

---

## Your Live URLs

- **Frontend**: https://your-project.vercel.app
- **Backend API**: https://restaurant-api.onrender.com

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in Render
- Check that backend allows requests from your Vercel domain

### Database Connection Failed
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check that connection string is correct (no special chars in password - encode them)

### Build Failed
- Check that all dependencies are in package.json
- Ensure Node.js version is 18+ in both client and server

### Socket.io Not Working
- Ensure WebSocket is enabled in Vercel configuration
- Use external Socket.io server (Render) instead of serverless
