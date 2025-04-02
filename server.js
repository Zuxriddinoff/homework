import express from 'express';
import usersRoutes from './Routes/user.routes.js';
import router from './Routes/comment.routes.js';


const app = express();
const PORT = 3000;


app.use(express.json());
app.use("/users", usersRoutes);
app.use("/comment", router)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
