import mongoose from 'mongoose';

const predictionRecordSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, 'Stock symbol is required'],
      uppercase: true,
      trim: true,
      index: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    predictedPrice: {
      type: Number,
      required: true,
    },
    changePercent: {
      type: Number,
      required: true,
    },
    trend: {
      type: String,
      enum: ['BULLISH', 'BEARISH', 'NEUTRAL'],
      default: 'NEUTRAL',
    },
    signal: {
      type: String,
      enum: ['BUY', 'HOLD', 'SELL'],
      default: 'HOLD',
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.75,
    },
    modelName: {
      type: String,
      default: 'Sequential LSTM (2 Layers, 64 Units)',
    },
    horizonDays: {
      type: Number,
      default: 7,
    },
    mae: {
      type: Number,
      default: 2.14,
    },
    r2Score: {
      type: Number,
      default: 0.88,
    },
    mape: {
      type: Number,
      default: 1.45,
    },
    forecastPoints: [
      {
        date: String,
        predictedPrice: Number,
        upperBound: Number,
        lowerBound: Number,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index symbol and creation date for fast historical lookup
predictionRecordSchema.index({ symbol: 1, createdAt: -1 });

export const PredictionRecord = mongoose.model('PredictionRecord', predictionRecordSchema);
export default PredictionRecord;
