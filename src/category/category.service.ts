import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Category } from "@prisma/client";

@Injectable()
export class CategoryService {

  constructor(private prisma: PrismaService) {
  }

  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        createdUser: {
          connect: { id: userId }
        }
      }
    });
  }

  async findAll(query: any) {
    try {
      return this.prisma.paginate<Category, Prisma.CategoryFindManyArgs>(
        this.prisma.category,
        {
          ...this.buildFilterQuery(query),
          ...this.prisma.buildSelectQuery(query),
          ...this.prisma.buildCategoryOrderByQuery(query, ["id", "name", "createdAt", "updatedAt"])
        },
        query
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          error.meta.cause
        );
      }
      throw error;
    }
  }

  buildFilterQuery(query) {
    if (query && query.filter && typeof query.filter === "object") {
      const filter_able_columns = ["name", "description"];
      const filter_able_values = ["equals", "in", "notIn", "contains", "startsWith", "endsWith"];
      const queries = {};
      const filter = { ...query.filter };
      for (const key in filter) {
        if (filter_able_columns.includes(key)) {
          if (typeof filter[key] == "object") {
            for (const filterKey in filter[key]) {
              if (filter_able_values.includes(filterKey)) {
                queries[key] = {
                  [filterKey]: filter[key][filterKey]
                };
              }
            }
          } else if (typeof filter[key] == "string") {
            queries[key] = filter[key];
          }

        }
      }
      if (Object.keys(queries).length) {
        return {
          where: {
            AND: queries
          }
        };
      }

    }
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id
      }
    });
  }

  update(userId: number, id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        id
      },
      data: {
        ...updateCategoryDto,
        updatedUser: {
          connect: { id: userId }
        }
      }
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          error.meta.cause
        );
      }
      throw error;
    }
  }
}
