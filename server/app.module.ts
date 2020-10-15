import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { MessagesGateway } from './messages/messages.gateway';
import { AccountsService, UtilsService } from './providers/index';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/nest-technest/browser')
    })
  ],
  controllers: [],
  providers: [
    MessagesGateway,
    AccountsService,
    UtilsService
  ],
})
export class AppModule {}
