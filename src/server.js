import { ServerApp } from "./app.js";
import { mongoConnection } from "./config/index.js";

const PORT = process.env.PORT

function startFunc(){
    ServerApp.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
}
startFunc()
mongoConnection()







