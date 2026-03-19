import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoModule } from './s/co/co.module';
import { PaqueteModule } from './modules/paquete/paquete.module';

@Module({
  imports: [CoModule, PaqueteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
