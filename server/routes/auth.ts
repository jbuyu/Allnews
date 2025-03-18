import { db } from "@/adapter";
import type { Context } from "@/context";
import { userTable } from "@/db/schemas/auth";
import { lucia } from "@/lucia";
import { loginSchema, type SuccessResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { generateId } from "lucia";
import postgres from "postgres";


export const authRouter = new Hono<Context>().post("/signup", zValidator("form", loginSchema), async (c) => {

    const { username, password } = c.req.valid("form")
    const passwordHash = await Bun.password.hash(password)
    const userId = generateId(15)
    console.log('userId', userId)
    console.log('userId', typeof userId)
    try {
        await db.insert(userTable).values({
            id: userId,
            username,
            password_hash: passwordHash
        })
        const session = await lucia.createSession(userId, { username })
        const sessionCookie = lucia.createSessionCookie(session.id).serialize();
        c.header("Set-Cookie", sessionCookie, { append: true });
        return c.json<SuccessResponse>({ success: true, message: "Account created" }, 201)
    } catch (error) {
        console.log('first', error)
        if (error instanceof postgres.PostgresError && error.code === "23505") {
            throw new HTTPException(409, {
                message: "Username already used",
                cause: { form: true },
            });
        }
        console.log('error', error)
        throw new HTTPException(500, { message: "Failed to create user" });
    }

})