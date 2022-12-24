import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { CatsModule } from "./cats/cats.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CatsModule,
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    CategoryModule
  ],
  providers: [AppService]
})
export class AppModule {
}
