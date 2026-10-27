import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';
import Portfolio from '../models/Portfolio.js';
import Holding from '../models/Holding.js';
import PredictionRecord from '../models/PredictionRecord.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bullsight_db';

export async function seedDatabase() {
  try {
    console.log(`[Seed Script] Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri);

    // 1. Seed Demo User
    let demoUser = await User.findOne({ email: 'trader@bullsight.ai' });
    if (!demoUser) {
      demoUser = await User.create({
        email: 'trader@bullsight.ai',
        passwordHash: 'bullsight123',
        fullName: 'Institutional Quant Trader',
        role: 'user',
      });
      console.log(`[Seed Script] Created demo user: ${demoUser.email} (Password: bullsight123)`);
    }

    // 2. Seed Watchlist
    const defaultSymbols = ['AAPL', 'RELIANCE.NS', 'NVDA', 'TCS.NS', 'MSFT', 'BTC-USD'];
    for (const sym of defaultSymbols) {
      const exists = await Watchlist.findOne({ symbol: sym });
      if (!exists) {
        await Watchlist.create({
          userId: demoUser._id,
          symbol: sym,
          notes: 'High-conviction quantitative tracking list',
        });
      }
    }
    console.log(`[Seed Script] Watchlist initialized with ${defaultSymbols.length} equities.`);

    // 3. Seed Portfolio & Holdings
    let portfolio = await Portfolio.findOne({ userId: demoUser._id });
    if (!portfolio) {
      portfolio = await Portfolio.create({
        userId: demoUser._id,
        name: 'Alpha Quant Portfolio',
        description: 'Multi-asset quantitative equity & ETF portfolio',
      });
    }

    const defaultHoldings = [
      { symbol: 'AAPL', name: 'Apple Inc.', quantity: 15.0, buyPrice: 180.0 },
      { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', quantity: 50.0, buyPrice: 2850.0 },
      { symbol: 'NVDA', name: 'NVIDIA Corp', quantity: 10.0, buyPrice: 110.0 },
      { symbol: 'TCS.NS', name: 'Tata Consultancy Services', quantity: 20.0, buyPrice: 3820.0 },
    ];

    for (const h of defaultHoldings) {
      const exists = await Holding.findOne({ portfolioId: portfolio._id, symbol: h.symbol });
      if (!exists) {
        await Holding.create({
          portfolioId: portfolio._id,
          symbol: h.symbol,
          name: h.name,
          quantity: h.quantity,
          buyPrice: h.buyPrice,
        });
      }
    }
    console.log(`[Seed Script] Portfolio holdings initialized.`);

    // 4. Seed sample historical PredictionRecord
    const predExists = await PredictionRecord.findOne({ symbol: 'AAPL' });
    if (!predExists) {
      await PredictionRecord.create({
        symbol: 'AAPL',
        currentPrice: 245.8,
        predictedPrice: 258.4,
        changePercent: 5.12,
        trend: 'BULLISH',
        signal: 'BUY',
        confidence: 0.88,
        modelName: 'Sequential LSTM (2 Layers, 64 Units)',
        horizonDays: 7,
        mae: 2.14,
        r2Score: 0.88,
        mape: 1.25,
      });
      console.log(`[Seed Script] Initialized benchmark prediction record.`);
    }

    console.log(`[Seed Script] All MongoDB collections successfully seeded!`);
  } catch (err) {
    console.error(`[Seed Script Error] ${err.message}`);
  } finally {
    await mongoose.connection.close();
  }
}

if (process.argv[1].endsWith('seedDatabase.js')) {
  seedDatabase().then(() => process.exit(0));
}
