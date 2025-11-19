require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const postRoutes = require("./router/post-router");
const skillRoutes = require("./router/skills-router");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// let's tackle cors
const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOption));

app.use(express.json());

// Mount the Router: To use the router in main express app,
// you can "mount" it at a specific URL prefix.

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoutes);
app.use("/api/skills", skillRoutes);
// app.use("/api/form", contactRoute);
// app.use("/api/data", serviceRoute);

//Let's define Admin route
// app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

// app.get("/",(rea,res)=>{
//     res.status(200).send("welcome home")
// });

const PORT = 8000;

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at ports: ${PORT}`); 
    });
})

