import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import filmList from "./film"
import genreList from "./genre";

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
