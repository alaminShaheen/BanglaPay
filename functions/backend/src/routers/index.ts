import { Router } from "express";
import AuthRouter from "@/routers/AuthRouter";
import CompanyRouter from "@/routers/CompanyRouter";
import CompensationRouter from "@/routers/CompensationRouter";
import { HealthCheckController } from "@/controllers/HealthCheckController";
import HealthCheckRouter from "@/routers/HealthCheckRouter";

const router = Router();

export default () => {
    AuthRouter(router, "/auth");
    CompanyRouter(router, "/company");
    CompensationRouter(router, "/compensation");
    HealthCheckRouter(router, "/healthcheck");
    return router;
};