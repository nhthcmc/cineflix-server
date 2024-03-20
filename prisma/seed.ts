import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import filmList from "./film"

(async () => {
    try {
        await prisma.film.createMany({
            data: [
                ...filmList
            ]
        })
    } catch (err) {
        console.log(err)
    }
})
