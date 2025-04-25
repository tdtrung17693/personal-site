import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { getConfig } from "../utils";
import type { Database } from "./db.type";
const dbUrl = getConfig("database.url");
console.log(dbUrl);
const pool = new pg.Pool({
  connectionString: dbUrl,
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});
