// Title: HumanLiker v0.3 Backend (Express)
// Description: Auth (JWT), Stripe subscription stubs, SQLite via better-sqlite3, Cookie policy routes

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

const dbPath = process.env.DATABASE_PATH || './data/humanliker.db';
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new Database(dbPath);

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

// DB init
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'inactive',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_end INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

function setAuthCookie(res, token) {
  res.cookie('hl_jwt', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // set true behind HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

function authRequired(req, res, next) {
  const token = req.cookies['hl_jwt'];
  if (!token) return res.status(401).json({error: 'Unauthorized'});
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({error: 'Invalid token'});
  }
}

// Auth routes
app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({error: 'Email and password required.'});
  const hash = bcrypt.hashSync(password, 10);
  try {
    const stmt = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
    const info = stmt.run(email.toLowerCase(), hash);
    const user = { id: info.lastInsertRowid, email: email.toLowerCase() };
    db.prepare('INSERT INTO subscriptions (user_id, status) VALUES (?, ?)').run(user.id, 'inactive');
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    setAuthCookie(res, token);
    return res.json({ user });
  } catch (e) {
    if (e.message && e.message.includes('UNIQUE')) {
      return res.status(409).json({error: 'Email already exists.'});
    }
    return res.status(500).json({error: 'Server error.'});
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({error: 'Email and password required.'});
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
  if (!row) return res.status(401).json({error: 'Invalid credentials.'});
  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return res.status(401).json({error: 'Invalid credentials.'});
  const token = jwt.sign({ id: row.id, email: row.email }, JWT_SECRET, { expiresIn: '7d' });
  setAuthCookie(res, token);
  return res.json({ user: { id: row.id, email: row.email } });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('hl_jwt');
  res.json({ ok: true });
});

app.get('/api/auth/me', authRequired, (req, res) => {
  const sub = db.prepare('SELECT status FROM subscriptions WHERE user_id = ?').get(req.user.id);
  res.json({ user: { id: req.user.id, email: req.user.email, subscriptionStatus: sub?.status || 'inactive' } });
});

// Subscription (Stripe)
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;
const PRICE_ID = process.env.STRIPE_PRICE_MONTHLY_5USD || '';

app.post('/api/subscribe/create-checkout-session', authRequired, async (req, res) => {
  if (!stripe || !PRICE_ID) {
    return res.status(200).json({ mode: 'mock', url: '/subscribe/success' });
  }
  try {
    const userId = req.user.id;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      customer_email: user.email,
      success_url: `${CORS_ORIGIN}/subscribe/success`,
      cancel_url: `${CORS_ORIGIN}/subscribe/cancel`
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: 'Stripe error' });
  }
});

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !whsec) return res.status(200).send();
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, whsec);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email?.toLowerCase();
    if (email) {
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (user) {
        db.prepare('UPDATE subscriptions SET status = ? WHERE user_id = ?').run('active', user.id);
      }
    }
  }
  res.json({ received: true });
});

app.get('/api/ping', (_req, res) => res.json({ pong: true }));

// Legal docs (static JSON for convenience)
app.get('/api/legal/privacy', (_req, res) => res.json({version: 'v0.3', updated: '2025-10-29'}));
app.get('/api/legal/terms', (_req, res) => res.json({version: 'v0.3', updated: '2025-10-29'}));
app.get('/api/legal/cookies', (_req, res) => res.json({version: 'v0.3', updated: '2025-10-29'}));

app.listen(PORT, () => {
  console.log(`HumanLiker backend running on http://localhost:${PORT}`);
});
