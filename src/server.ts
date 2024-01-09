require('dotenv').config();
import express from 'express';
import userRoutes from './routes/user';
import cors from 'cors'; // Import the cors middleware
import sequelize from './config/database';
const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
