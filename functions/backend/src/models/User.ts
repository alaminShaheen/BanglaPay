import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";

export type User = Pick<RegisterUserDto, "lastname" | "email" | "firstname"> & { id: string }