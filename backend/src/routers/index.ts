import { Router } from "express";
import AuthRouter from "@/routers/AuthRouter";
import CompanyRouter from "@/routers/CompanyRouter";

const router = Router();

export default () => {
    AuthRouter(router);
    CompanyRouter(router);
    return router;
};