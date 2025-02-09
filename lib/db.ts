import mongoose from "mongoose";

interface connectionObj{
    id?: number
}

const connection:connectionObj = { }

async function dbConnect() : Promise<void> {
    if(connection.id){
        console.log("db already connected")
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URL || "")
        connection.id= db.connections[0].readyState;
        console.log("db Connected sucessfully..")
    }catch(err){
        console.log("dbConnection error ",err);
        process.exit(1);
    }
}

export default dbConnect;