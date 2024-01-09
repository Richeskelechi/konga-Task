import jwt from 'jsonwebtoken';

const generateToken = (user: any): string => {
  const { id, email, firstName } = user;
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id, email, firstName }, secret, { expiresIn: '1h' });
  return token;
};

export default generateToken;
