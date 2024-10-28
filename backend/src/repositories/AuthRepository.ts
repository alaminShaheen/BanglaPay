import { getDatabaseInstance } from "../database";
import { DATABASE_CONSTANTS } from "@/constants/databaseConstants";
import { User } from "@/models/User";
import { AppError } from "@/errors/AppError";


async function createUser(userInfo: User) {
    try {
        const databaseInstance = getDatabaseInstance();
        await databaseInstance.loadInfo();
        const usersTable = databaseInstance.sheetsByTitle[DATABASE_CONSTANTS.USERS_TABLE];

        await usersTable.addRow(userInfo);
        return;
    } catch (error: any) {
        throw error;
    }
}

async function getUser(userId: string): Promise<User | null> {
    try {
        const databaseInstance = getDatabaseInstance();
        await databaseInstance.loadInfo();
        const usersTable = databaseInstance.sheetsByTitle[DATABASE_CONSTANTS.USERS_TABLE];

        const userRows = await usersTable.getRows();

        const user = userRows.find(userRow => userRow.get("id") === userId);

        if (!user) {
            return null;
        }
        return {
            email: user.get("email"),
            firstname: user.get("firstname"),
            lastname: user.get("lastname"),
            id: user.get("id")
        };
    } catch (error: any) {
        throw error;
    }
}

export const AuthRepository = {
    createUser,
    getUser
};