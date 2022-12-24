import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { PrismaClient, Prisma } from "@prisma/client";

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
  };
}

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      log: [{ level: "query", emit: "event" }],
      datasources: {
        db: {
          url: configService.get("DATABASE_URL")
        }
      }
    });
  }

  async onModuleInit() {
    this.$on("query", (e) => {
      console.log(e);
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
  buildSelectQuery(query) {
    if (query && query.fields && typeof query.fields === "string") {
      const fields = query.fields.split(",");
      return {
        select: fields.reduce((a, v) => ({ ...a, [v]: true }), {})
      };
    }
  }

  buildCategoryOrderByQuery(query, sortable_keys: string[]) {
    if (query && query.sort && typeof query.sort === "object") {
      const sortable_value = ["asc", "desc"];
      const queries = [];
      const sort = { ...query.sort };
      for (const key in sort) {
        if (sortable_keys.includes(key) && sortable_value.includes(sort[key])) {
          queries.push({
            [key]: sort[key]
          });
        }
      }
      if (queries.length) {
        return {
          orderBy: queries
        };
      }
    }
  }

  async paginate<T, K>(model: any, args: any = { where: undefined }, query: any): Promise<PaginatedResult<T>> {
    const take = "limit" in query ? +query.limit : 100;
    const page = "page" in query ? +query.page : 0;
    const skip = page > 0 ? take * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take,
        skip
      })
    ]);
    const lastPage = Math.ceil(total / take);
    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage: take,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null
      }
    };
  }
}
