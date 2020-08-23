import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    inCart: {
      type: Boolean,
      required: false,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)

export const Product = mongoose.model('product', productSchema)
