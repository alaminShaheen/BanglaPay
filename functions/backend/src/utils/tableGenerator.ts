import { getDatabaseInstance } from "../database";
import { DATABASE_CONSTANTS } from "@/constants/databaseConstants";

export async function tableGenerator(tableName: string, tableFields: string[]) {
    const databaseInstance = getDatabaseInstance();
    await databaseInstance.loadInfo();

    const table = databaseInstance.sheetsByTitle[tableName];

    if (!table) {
        const table = await databaseInstance.addSheet({ headerValues: tableFields, title: tableName });
    }

}