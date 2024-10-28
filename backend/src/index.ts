import "module-alias/register";
import express, { Router, Request, Response } from "express";
import router from "@/routers/index";
import logging from "@/utils/logging";
import { initDatabase } from "./database";
import { initFirebase } from "@/configs/firebaseConfig";
import { CLIENT_ORIGIN, SERVER_PORT } from "@/configs/config";
import { errorHandler } from "@/middlewares/errorHandler";
import cors from "cors";

const app = express();
app.use(cors({origin: CLIENT_ORIGIN}))
app.use(express.json());


// rt.get("/hello", (req: Request, res: Response) => {
//     logging.log("/hello")
//     res.send("Hello World");
// })

const appRouter = router();

app.use("/api", appRouter);

initDatabase();
initFirebase();
// databaseInstance.loadInfo().then(async () => {
//     const usersTable = databaseInstance.sheetsByTitle["users"];
//     const rows = await usersTable.getRows();
//     logging.info(rows);
// });

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
    logging.log(`Server running on port ${SERVER_PORT}`);
});