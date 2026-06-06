import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Current selling price
  originalPrice: { type: Number }, // For showing discounts
  image: { type: String, required: true }, // Cloudinary URL
  category: { type: String, default: 'General' },
  productType: { type: String, enum: ['Physical Book', 'Digital PDF', 'Study Kit', 'Merchandise', 'Other'], default: 'Physical Book' },
  features: [{ type: String }], // e.g. ["Includes 3 books", "With previous year papers"]
  isDigital: { type: Boolean, default: false }, // If true, skip shipping address on checkout
  stock: { type: Number, default: 100 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
