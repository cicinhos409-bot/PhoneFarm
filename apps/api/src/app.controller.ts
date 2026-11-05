import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'phonefarm',
    password: 'secret',
    database: 'phonefarm',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [HealthController],
})
export class AppModule {}