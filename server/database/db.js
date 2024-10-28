import mongoose from "mongoose";

const Connection=async(USERNAME,PASSWORD)=>{
const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qjzcyiy.mongodb.net/`
try{
   await mongoose.connect(URL);
      console.log("database is connected");
    
}catch(error){
    console.log("not able to connect database",error);
    
}
}
export default Connection;
