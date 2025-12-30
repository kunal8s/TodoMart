import mongoose from "mongoose";

const connectMongooseDB = async ()=>{
    try{
    const conn = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("MongoDB Database connected sucessfully...✅✈️")
    } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectMongooseDB;