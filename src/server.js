const express = require("express");
const app = express();

const PORT = 100;
const HOST = "localhost";


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/posts", require("../routers/post"));


app.get("/", (req, res)=>{
    res.send("local")
})




app.listen(PORT, HOST, ()=>{
    console.log(`Server ishga tushdi: http://${HOST}:${PORT}/`)
})