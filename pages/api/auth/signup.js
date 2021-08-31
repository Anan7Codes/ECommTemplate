import { hashPassword } from '@/util/auth';
import { connectToDatabase } from '@/util/connectToDb'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      success: false,
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const { db } = await connectToDatabase();

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ success: false, message: 'User exists already!' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ success: true, message: 'User Created Successfully' });
}

export default handler;