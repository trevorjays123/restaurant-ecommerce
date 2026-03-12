# Restaurant E-Commerce Website Specification

## Project Overview

**Project Name:** NaijaKitchen - Multi-Cuisine Restaurant E-Commerce Platform  
**Project Type:** Full-stack React Web Application  
**Core Functionality:** Online food ordering platform serving three distinct cuisine types (Nigerian, Continental, Fast Food) with premium animations, real-time order tracking, and Nigerian payment integrations.  
**Target Users:** Nigerian consumers ordering food for delivery/takeout in Lagos and surrounding areas.

---

## Technology Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite 5+
- **Styling:** Tailwind CSS 3+ with custom configuration
- **Animations:** Framer Motion 11+
- **State Management:** Zustand 4+
- **Routing:** React Router v6
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios + React Query

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Real-time:** Socket.io
- **File Storage:** Local/Cloudinary

### Payments
- Paystack (Primary)
- Flutterwave (Secondary)

---

## UI/UX Specification

### Layout Structure

#### Global Navigation
- **Desktop:** Fixed top navbar with logo, cuisine dropdowns, rewards link, contact, and cart icon
- **Mobile:** Bottom navigation bar with floating action button for cart
- **Responsive Breakpoints:**
  - Mobile: 0-639px
  - Tablet: 640-1023px
  - Desktop: 1024px+

#### Page Sections
1. **Header/Navbar** - Sticky, 64px height
2. **Hero Section** - Full viewport height on homepage
3. **Content Sections** - Max-width 1440px, centered
4. **Footer** - Multi-column with links, social media, contact info

### Visual Design

#### Color Palette

**Nigerian Cuisine Theme:**
- Primary Orange: `#E64A19`
- Earthy Brown: `#8B4513`
- Cream: `#FFF8E7`
- Vibrant Green: `#2E7D32`
- Suya Red: `#C0392B`
- Jollof Orange: `#E67E22`

**Continental Theme:**
- Navy: `#0B1E33`
- Gold: `#BF9E7B`
- Burgundy: `#722F37`
- Cream: `#F5F0E6`
- White: `#FFFFFF`

**Fast Food Theme:**
- Red: `#D32F2F`
- Yellow: `#FBC02D`
- Charcoal: `#212121`
- Orange: `#F57C00`
- White: `#FFFFFF`

**Global/UI Colors:**
- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Text Primary: `#1A1A1A`
- Text Secondary: `#666666`
- Text Muted: `#999999`
- Border: `#E5E5E5`
- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`

#### Typography

**Font Families:**
- **Display/Headings:** "TASA Orbiter", "Poppins", sans-serif
- **Body:** "Inter", "Open Sans", sans-serif
- **Nigerian Accent:** "Abril Fatface", serif
- **Continental Accent:** "Cormorant Garamond", "Playfair Display", serif
- **Fast Food Accent:** "Bebas Neue", "Montserrat Black", sans-serif

**Font Sizes:**
- Display: 72px / 4.5rem
- H1: 48px / 3rem
- H2: 36px / 2.25rem
- H3: 24px / 1.5rem
- H4: 20px / 1.25rem
- Body Large: 18px / 1.125rem
- Body: 16px / 1rem
- Small: 14px / 0.875rem
- XSmall: 12px / 0.75rem

#### Spacing System
- Base unit: 4px
- Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

#### Visual Effects
- **Shadows:**
  - sm: `0 1px 2px rgba(0,0,0,0.05)`
  - md: `0 4px 6px -1px rgba(0,0,0,0.1)`
  - lg: `0 10px 15px -3px rgba(0,0,0,0.1)`
  - xl: `0 20px 25px -5px rgba(0,0,0,0.1)`
- **Border Radius:** 4px, 8px, 12px, 16px, 24px, 9999px (full)
- **Transitions:** 150ms, 200ms, 300ms, 500ms ease-in-out

### Components

#### Navigation
- Logo with cuisine-specific styling
- Dropdown menus with smooth reveal animation
- Cart icon with item count badge (animated)
- Mobile hamburger menu with slide-in drawer

#### Hero Sections
- **Nigerian:** Video background with steam overlay, warm color grading
- **Continental:** Elegant image with parallax, gold accent elements
- **Fast Food:** Dynamic carousel with bold typography

#### Menu Cards
- Image with hover zoom effect
- Title, description, price
- Dietary icons (spice level, vegetarian, vegan, gluten-free)
- Add to cart button with micro-interaction
- Availability badge (sold out state)

#### Cart Components
- Slide-in drawer from right
- Item list with quantity controls
- Subtotal, delivery fee, total
- Promo code input
- Checkout CTA button

#### Order Tracking
- Progress stepper (Received → Preparing → On the way → Delivered)
- Real-time map with rider location
- ETA countdown
- SMS/WhatsApp notification toggles

---

## Functionality Specification

### Core Features

#### 1. Menu System
- Browse menu by cuisine type
- Filter by category (Starters, Mains, Desserts, Drinks)
- Search with autocomplete
- Filter by dietary preferences
- Sort by price, popularity, rating
- View item details with gallery

#### 2. Shopping Cart
- Add/remove items
- Update quantities
- Apply promo codes
- Calculate delivery fee
- Persist cart in localStorage
- Guest cart support

#### 3. Checkout Process
- One-page checkout
- Delivery address selection/map
- Delivery time slot selection
- Payment method selection
- Order notes
- Order confirmation

#### 4. Payment Integration
- Paystack card payments
- Flutterwave card payments
- Bank transfer display
- USSD payment display
- Payment verification

#### 5. User Accounts
- Registration/Login
- Order history
- Saved addresses
- Loyalty points display
- Favorite items

#### 6. Loyalty Program
- Points earning (1 point per ₦100)
- Points redemption
- Tier system (Bronze, Silver, Gold, Platinum)
- Birthday rewards
- Referral program

#### 7. Order Tracking
- Real-time status updates
- Push notifications
- SMS updates
- WhatsApp updates
- Live map tracking

### User Interactions

#### Animations (Framer Motion)
- **Page Load:** Staggered fade-in from bottom
- **Scroll:** Elements fade in as they enter viewport
- **Hover:** Scale transform, shadow elevation
- **Click:** Ripple effect, button press feedback
- **Cart:** Item flies to cart icon, badge bounce
- **Page Transitions:** Fade with slight slide

#### Cuisine-Specific Animations
- **Nigerian:** Steam rising, pepper floating, warm pulse effects
- **Continental:** Wine shimmer, elegant fade, spotlight reveals
- **Fast Food:** Bounce effects, flame flicker, energetic transitions

### Data Handling

#### Menu Data Structure
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  cuisine: 'nigerian' | 'continental' | 'fastfood';
  images: string[];
  spiceLevel?: 1 | 2 | 3;
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'nut-free')[];
  available: boolean;
  preparationTime: number;
  calories?: number;
  popular?: boolean;
}
```

#### Order Data Structure
```typescript
interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered';
  deliveryAddress: Address;
  paymentMethod: 'card' | 'bank_transfer' | 'ussd';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  estimatedDelivery: Date;
}
```

### Edge Cases
- Out of stock items
- Payment failures
- Network disconnection
- Cart item price changes
- Delivery address outside service area
- Promo code expiration/invalid
- Multiple restaurant ordering

---

## Page Structure

### 1. Homepage (`/`)
- Hero section with cuisine selector
- Featured dishes from each cuisine
- How it works (4 steps)
- Live order counter
- Today's specials carousel
- Reviews carousel
- Rewards signup banner
- Location map snippet
- Footer

### 2. Menu Pages (`/menu/[cuisine]`)
- Sticky category filter
- Search bar with autocomplete
- Filter sidebar (dietary, price, spice)
- Grid of menu items
- Quick view modal

### 3. Item Detail (`/menu/[cuisine]/[id]`)
- Image gallery with zoom
- Full description
- Customization options
- Quantity selector
- Related items
- Reviews

### 4. Cart (`/cart`)
- Full cart view
- Apply promo code
- Delivery fee calculator
- Proceed to checkout CTA

### 5. Checkout (`/checkout`)
- Delivery address form/map
- Delivery time selection
- Payment method selection
- Order summary
- Place order button

### 6. Order Confirmation (`/order/[id]`)
- Order details
- Payment status
- Tracking link
- WhatsApp support link

### 7. Track Order (`/track/[id]`)
- Status progress
- Live map
- ETA
- Contact options

### 8. About (`/about`)
- Restaurant story
- Chef profiles
- Kitchen gallery
- Awards

### 9. Contact (`/contact`)
- Contact form
- Location map
- Phone, WhatsApp, email
- Business hours

### 10. Account (`/account`)
- Profile management
- Order history
- Saved addresses
- Payment methods
- Loyalty dashboard
- Favorites

---

## Performance Requirements

### Targets
- First Contentful Paint: < 1.2s
- Time to Interactive: < 2.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total page size: < 2MB initial

### Optimizations
- Code splitting per route
- Image optimization (WebP, srcset)
- Lazy loading below fold
- Caching with Service Worker
- Bundle minification
- Tree shaking

---

## Nigerian Market Considerations

### Payment Methods
- Paystack (Primary) - Cards, Bank Transfer, USSD
- Flutterwave (Secondary) - Cards, Bank Transfer, QR

### Local Features
- Naira (₦) currency formatting
- Nigerian phone number validation
- Lagos-centric delivery zones
- Local delivery partners integration

### Performance
- Optimize for 3G/4G networks
- Data saver mode support
- Offline menu browsing
- Minimal initial bundle size

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Three distinct visual identities for each cuisine
- [ ] Smooth 60fps animations throughout
- [ ] Responsive design works on all breakpoints
- [ ] All images lazy load with blur-up placeholders
- [ ] Dark mode toggle (optional future)

### Functional Checkpoints
- [ ] Complete menu browsing and filtering
- [ ] Add to cart with quantity updates
- [ ] Checkout flow completes successfully
- [ ] Payment integration works (test mode)
- [ ] Order tracking shows real-time updates
- [ ] User accounts allow login/registration

### Performance Checkpoints
- [ ] Lighthouse score > 90 on mobile
- [ ] Core Web Vitals pass
- [ ] First paint < 1.5s on 4G
- [ ] Bundle size < 200KB initial JS

---

## Project Structure

```
restaurant-app/
├── client/                    # React frontend
│   ├── public/
│   │   ├── images/
│   │   ├── icons/
│   │   └── locales/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── cuisine/
│   │   │   ├── menu/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── tracking/
│   │   │   └── layout/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── styles/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   ├── server.ts
│   └── package.json
├── .env.example
├── docker-compose.yml
└── README.md
```
