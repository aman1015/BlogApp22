import express from 'express'
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes.js/route.js';
import cors from'cors'
import bodyParser from 'body-parser';

import path from 'path'

dotenv.config();
const app=express();
const _dirname=path.resolve();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/' , Router);

const PORT= process.env.PORT || 8000;

app.listen(PORT,()=>console.log("the server is running")
);
const USERNAME=process.env.DB_username;
const PASSWORD=process.env.DB_password;
Connection(USERNAME,PASSWORD);