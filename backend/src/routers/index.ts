import {Router} from "express";
import AuthRouter from "@/routers/AuthRouter";

const router = Router();

export default () => {
    AuthRouter(router);
    return router;
};