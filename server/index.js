import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './src/routes/auth.js';
import usersRouter from './src/routes/users.js';
import messagesRouter from './src/routes/messages.js';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});