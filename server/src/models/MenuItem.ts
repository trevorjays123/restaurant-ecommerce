import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  cuisine: 'nigerian' | 'continental' | 'fastfood';
  category: string;
  image: string;
  images: string[];
  dietary: ('vegan' | 'vegetarian' | 'gluten_free' | 'spicy' | 'nut_free' | 'halal')[];
  ingredients: {
    name: string;
    quantity: string;
    allergens: boolean;
  }[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isAvailable: boolean;
  isPopular: boolean;
  isSignature: boolean;
  preparationTime: number;
  spicyLevel: 0 | 1 | 2 | 3;
  calories: number;
  featured: boolean;
  discount?: {
    percentage: number;
    validUntil?: Date;
  };
  orderCount: number;
  rating: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    cuisine: {
      type: String,
      enum: ['nigerian', 'continental', 'fastfood'],
      required: true,
      index: true,
    },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    dietary: [
      {
        type: String,
        enum: ['vegan', 'vegetarian', 'gluten_free', 'spicy', 'nut_free', 'halal'],
      },
    ],
    ingredients: [
      {
        name: { type: String },
        quantity: { type: String },
        allergens: { type: Boolean, default: false },
      },
    ],
    nutrition: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
    },
    isAvailable: { type: Boolean, default: true, index: true },
    isPopular: { type: Boolean, default: false, index: true },
    isSignature: { type: Boolean, default: false },
    preparationTime: { type: Number, default: 15 },
    spicyLevel: { type: Number, enum: [0, 1, 2, 3], default: 0 },
    calories: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    discount: {
      percentage: { type: Number },
      validUntil: { type: Date },
    },
    orderCount: { type: Number, default: 0 },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
menuItemSchema.index(
  { name: 'text', description: 'text' },
  { weights: { name: 10, description: 1 } }
);

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
