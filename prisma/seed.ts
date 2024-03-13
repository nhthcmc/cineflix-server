import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
const prisma = new PrismaClient();

(async () => {
    try {
        await prisma.user.createMany({
            data: [
                {
                    userName: "user1",
                    password: hashSync("123", 10),
                    email: null,
                    avatar: null,
                    wallet: null
                },
                {
                    userName: "user2",
                    password: hashSync("123", 10),
                    email: null,
                    avatar: null,
                    wallet: null
                }
            ]
        })
        await prisma.admin.createMany({
            data: [
                {
                    username: "admin1",
                    password: hashSync("123", 10),
                    email: null
                },
                {
                    username: "admin2",
                    password: hashSync("123", 10),
                    email: null
                }
            ]
        })
    } catch (err) {
        console.log("error", err)
    }
})