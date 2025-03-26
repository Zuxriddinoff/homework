import express from "express";
import { v4 } from "uuid";
import path from "node:path"


const app = express()

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userList = [];

//custom middleware
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
});

app.get("/", (req, res) => {
    const homePageFilePath = path.join(
        import.meta.dirname,
        "public",
        "index.html",
    );
    res.sendFile(homePageFilePath);
});

app.get("/register", (req, res) => {
    const homePageFilePath = path.join(
        import.meta.dirname,
        "public",
        "register.html",
    );
    res.sendFile(homePageFilePath);
});

app.post("/register", async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.name || !body.email || !body.password) {
            throw new Error("Please provide all required fields");
        }

        const user = userList.find((user)=> user.email === body.email);

        if(user){
            throw new Error("user alaredy exists");
        }
        body.id = v4();
        userList.push(body);

        res.send(`
            <h1>Registration Successful</h1>
            <p>Thank you for registering whith us , ${body.name}</p>
            <a href="/login">LOgin</a>
            `);
    } catch (error) {
        next(error);
    }
});

app.get("/login", (req, res) => {
    const homePageFilePath = path.join(
        import.meta.dirname,
        "public",
        "login.html",
    );
    res.sendFile(homePageFilePath);
});

app.post("/login",(req,res,next)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            throw new Error("plase povide all required fileds");

        }
        const user = userList.find((user)=>user.email === email);

        res.cookie("user", user.id);
        res.send(`
            <h1>Login Successfull</h1>
            <p>welcome back, ${user.name}</p>`)
    }catch(error){
        next(error)
    }
});

app.get("/users", (req, res, next) => {
    try {
        res.json(userList);
    } catch (error) {
        next(error);
    }
});

// error handling middleware
app.use((error, req, res, next) => {
    res.status(500).send(error.message);



});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});