import { hashPassword } from '@/util/auth';
import { connectToDatabase } from '@/util/connectToDb'
import { sendEmail } from '@/util/sendEmail'
import randomstring from 'randomstring'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password } = data;
  const verificationCode = randomstring.generate(15)

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      success: false,
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
  }

  const { db } = await connectToDatabase();

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    return res.status(422).json({ success: false, message: 'User exists already!' });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
      verified: false,
      verificationCode: verificationCode
    });  
    await sendEmail(process.env.EMAIL, process.env.PASS, email, verificationCode)
  } catch (e) {
    return res.status(422).json({ success: false, message: 'Something Went Wrong! Try Again' });
  }

  return res.status(201).json({ success: true, message: 'User Created Successfully' });
}

export default handler;