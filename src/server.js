import express from "express";

const app = express()

const PORT = 4000



app.listen(4000, () => {
    console.log(`server is runnig on port ${PORT}`);
})