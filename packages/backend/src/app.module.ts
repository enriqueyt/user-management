import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { DataSourceModule } from './data-source/data-source.module';

@Module({
  imports: [DataSourceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
