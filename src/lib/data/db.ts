import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { getConfig } from "../config/server.config";
import type { Database } from "./db.type";
const dbUrl = getConfig("database.url");

const pool = new pg.Pool({
  connectionString: dbUrl,
  connectionTimeoutMillis: 100000,
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});
