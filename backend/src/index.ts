import "module-alias/register";
import cors from "cors";
import express from "express";
import { initDatabase } from "./database";

import router from "@/routers/index";
import logging from "@/utils/logging";
import { initFirebase } from "@/configs/firebaseConfig";
import { errorHandler } from "@/middlewares/errorHandler";
import { loggingHandler } from "@/middlewares/loggingHandler";
import { CLIENT_ORIGIN, SERVER_PORT } from "@/configs/config";

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

const appRouter = router();

initDatabase();
initFirebase();


app.use(loggingHandler);
app.use("/api", appRouter)

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
    logging.log(`Server running on port ${SERVER_PORT}`);
});