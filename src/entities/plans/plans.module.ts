import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansController } from 'src/controllers/plans/plans.controller';
import { PlansService } from 'src/services/plans/plans.service';
import { Plans } from './plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plans])],
  providers: [PlansService],
  controllers: [PlansController],
})
export class PlansModule {}
