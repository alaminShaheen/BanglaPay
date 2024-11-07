import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { getDatabaseInstance } from "../database";

import { User } from "@/models/User";
import { DATABASE_CONSTANTS } from "@/constants/databaseConstants";


async function createUser(userInfo: User) {
    try {
        const usersTable = await getUserTable();

        const userRecord: GoogleSpreadsheetRow<User> = await usersTable.addRow(userInfo);
        return serializeUserToJson(userRecord);
    } catch (error: any) {
        throw error;
    }
}

async function getUserTable() {
    try {
        const databaseInstance = getDatabaseInstance();
        await databaseInstance.loadInfo();
        return databaseInstance.sheetsByTitle[DATABASE_CONSTANTS.USERS_TABLE];
    } catch (error) {
        throw error;
    }
}

async function findUserRecord(userId: string) {
    const usersTable = await getUserTable();

    const userRows = await usersTable.getRows<User>();

    return userRows.find(userRow => userRow.get("id") === userId) ?? null;
}

async function getUser(userId: string) {
    try {
        const user = await findUserRecord(userId);

        if (!user) {
            return null;
        }
        return serializeUserToJson(user);
    } catch (error: any) {
        throw error;
    }
}

function serializeUserToJson(user: GoogleSpreadsheetRow<User>): User {
    return {
        email: user.get("email"),
        firstname: user.get("firstname"),
        lastname: user.get("lastname"),
        id: user.get("id")
    };
}

async function updateUser(updatedUserInfo: User) {
    try {
        const user = await findUserRecord(updatedUserInfo.id);

        if (!user) {
            return null;
        }

        user.assign(updatedUserInfo);

        await user.save();

        return serializeUserToJson(user);
    } catch (error: any) {
        throw error;
    }
}

export const AuthRepository = {
    createUser,
    getUser,
    updateUser
};