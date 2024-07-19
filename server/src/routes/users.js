import express from 'express';
const router = express.Router();
import db from '../db/connection.js';
import bcrypt from 'bcrypt';

router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, username, password, user_role } = req.body;
  
  if (!first_name || !last_name || !email || !username || !password || !user_role) {
    return res.status(400).send('Please make sure to provide all required fields.');
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.query(`
      INSERT INTO users (first_name, last_name, email, username, password, user_role)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      first_name, last_name, email, username, hashedPassword, user_role
    ]);
    return res.status(201).send('User created successfully.');
  } catch(err) {
    console.log(err);
    return res.status(400).send(err.sqlMessage);
  }
});

export default router;