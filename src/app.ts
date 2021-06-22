import express from 'express';
import baseRouter from './routes/member.router';

const app = express();
app.use(express.json());
app.use('/', baseRouter);

const PORT = 3250;
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}!!`)
}); 