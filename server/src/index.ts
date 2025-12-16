import {Request, Response, Router} from "express"
import path from "path";

const router: Router = Router()

function createDatabases(){
    
}

function setup(){
    createDatabases()
    console.log("router is up and running")
    };

// router.get('/api/RouteName', functionName);




setup()

export default router