import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { AccessTokenGuard } from "../auth/guard";
import { User } from "../user/user.decorator";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CategoryApiQuery } from "./category.decorator";

@ApiBearerAuth()
@ApiTags("categories")
@UseGuards(AccessTokenGuard)
@Controller({
  path: "categories",
  version: "1"
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @Post()
  create(@User("id") userId: number, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(userId, createCategoryDto);
  }

  @CategoryApiQuery()
  @Get()
  findAll(@Query() query: any) {
    return this.categoryService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(":id")
  update(@User("id") userId: number, @Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(userId, +id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
