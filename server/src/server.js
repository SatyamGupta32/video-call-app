import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { connectDB } from './lib/db.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.set('trust proxy', true);
// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL?.replace(/\/$/, ''),
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['content-type', 'authorization'],
        credentials: true
    })
);

app.use(express.json()); 
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))
}

app.get('/', (req, res) => {
    res.send('welcome to streamify app')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client','dist','index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
    connectDB();
});