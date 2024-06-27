import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import doorRoutes from './routes/doorRoutes';
import secondGateRoutes from './routes/secondGateRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

app.use('/users', userRoutes);
app.use('/doors', doorRoutes);
app.use(secondGateRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
