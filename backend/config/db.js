import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://sparsh19:golu%401910@cluster0.emnmebi.mongodb.net/food-del').then(()=> console.log("DB Connected"));
}