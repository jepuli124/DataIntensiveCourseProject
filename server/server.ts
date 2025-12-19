import express, {Express, json, Router} from "express";
import path from "path";
import router from "./src/index";
import mongoose, { Connection } from 'mongoose'
import dotenv from "dotenv"
import cors, {CorsOptions} from 'cors'

// most if not all code in this file is from Advanced webprogramming cource's source code 

dotenv.config() // .env file handling library

const app: Express = express() //express initization
const port = process.env.PORT


export const connections: Record<string, mongoose.Connection> = {
  GameDBRegion1: mongoose.createConnection("mongodb://127.0.0.1:27017/GameDBRegion1"),
  GameDBRegion2: mongoose.createConnection("mongodb://127.0.0.1:27017/GameDBRegion2"),
  GameDBRegion3: mongoose.createConnection("mongodb://127.0.0.1:27017/GameDBRegion3"),
};


for (const [name, conn] of Object.entries(connections)) {
  conn.on("connected", () => console.log(`${name} connected successfully.`));
  conn.on("error", (err) => console.error(`${name} connection error:`, err));
}


app.use(express.json()); //parses the incoming post body
app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)

if(process.env.NODE_ENV === 'development'){ //dev mode
    const corsOptions: CorsOptions = {
        origin: 'http://localhost:1234',
        optionsSuccessStatus: 200
    }
    
    app.use(cors(corsOptions))
} else if (process.env.NODE_ENV === 'production') { // client mode
    app.use(express.static(path.resolve('../..', 'client', 'build')))
    app.get('*', (req: any, res: any) => {
        res.sendFile(path.resolve('../..', 'client', 'build', 'index.html'))
    })
}


app.listen(port, () => {
    console.log(`hello world ${port}`);
})