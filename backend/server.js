import express from "express";
import dotenv from "dotenv";


const app  = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

app.get('/',(req,resp)=>{
    resp.json({a: "Hello Disha"});
})

app.use("/api/auth",authRoutes);

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));


