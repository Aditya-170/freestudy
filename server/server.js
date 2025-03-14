import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhook.js';


//Insilize Express
const app=express();

//database connection
await connectDB();

//Middlewares
app.use(cors());

//Route
app.get('/',(req,res)=>{res.send('API working')});
app.post('/clerk',express.json(),clerkWebhooks);

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });