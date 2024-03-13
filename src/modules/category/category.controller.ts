import { Controller, Get, Res } from "@nestjs/common";
import { CategoryService } from './category.service';
import { Response } from "express";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }
    @Get('/')
    async findCategory(@Res() res: Response) {
        try {
            let { data, err } = await this.categoryService.findCategory()
            if (err) {
                throw {
                    message: "Error"
                }
            }
            return res.status(200).json({
                data
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message ? [err.message] : ["Server error"]
            })
        }
    }
}