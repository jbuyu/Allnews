import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

import { z } from "zod"

const EnvSchema = z.object({
    DATABASE_URL: z.string().url(),
});

const processEnv = EnvSchema.parse(process.env);

console.log('process.env', process.env.DATABASE_URL)


const queryClient = postgres(processEnv.DATABASE_URL);

// console.log('queryClient', queryClient)

const db = drizzle(queryClient);
// console.log('db', db)
const result = await db.execute("select");

console.log('result', result)

