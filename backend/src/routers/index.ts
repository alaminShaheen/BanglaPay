import { Router } from "express";
import AuthRouter from "@/routers/AuthRouter";
import CompanyRouter from "@/routers/CompanyRouter";
import CompensationRouter from "@/routers/CompensationRouter";

const router = Router();

export default () => {
    AuthRouter(router, "/auth");
    CompanyRouter(router, "/company");
    CompensationRouter(router, "/compensation");
    return router;
};