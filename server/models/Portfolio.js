import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Portfolio name is required'],
      trim: true,
      default: 'Main Trading Portfolio',
    },
    description: {
      type: String,
      trim: true,
      default: 'Primary quantitative equity portfolio',
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Virtual field to populate related Holdings
portfolioSchema.virtual('holdings', {
  ref: 'Holding',
  localField: '_id',
  foreignField: 'portfolioId',
});

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
