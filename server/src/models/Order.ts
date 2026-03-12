import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: {
    menuItem: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    notes?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  serviceCharge: number;
  discount: number;
  total: number;
  cuisine: 'nigerian' | 'continental' | 'fastfood';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentMethod: 'card' | 'bank_transfer' | 'ussd' | 'qr' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentReference?: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    instructions?: string;
  };
  deliveryTime: 'now' | 'scheduled';
  scheduledTime?: Date;
  estimatedDelivery?: Date;
  rider?: {
    name: string;
    phone: string;
    vehicle?: string;
    location?: {
      lat: number;
      lng: number;
    };
  };
  location?: {
    lat: number;
    lng: number;
  };
  customerNote?: string;
  promoCode?: string;
  loyaltyPointsEarned: number;
  loyaltyPointsRedeemed: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String },
        notes: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    serviceCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    cuisine: {
      type: String,
      enum: ['nigerian', 'continental', 'fastfood'],
      required: true,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'out_for_delivery',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'bank_transfer', 'ussd', 'qr', 'cash_on_delivery'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentReference: { type: String },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String },
      instructions: { type: String },
    },
    deliveryTime: {
      type: String,
      enum: ['now', 'scheduled'],
      default: 'now',
    },
    scheduledTime: { type: Date },
    estimatedDelivery: { type: Date },
    rider: {
      name: { type: String },
      phone: { type: String },
      vehicle: { type: String },
      location: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    customerNote: { type: String },
    promoCode: { type: String },
    loyaltyPointsEarned: { type: Number, default: 0 },
    loyaltyPointsRedeemed: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Generate order number
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD${Date.now().toString().slice(-6)}${(count + 1)
      .toString()
      .padStart(4, '0')}`;
  }
  next();
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
