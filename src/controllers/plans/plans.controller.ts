import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PlansDto } from '../../entities/plans/plansDto';
import { PlansService } from '../../services/plans/plans.service';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Post()
  async create(@Body() plansDto: PlansDto, @Res() response: Response) {
    try {
      const plan = await this.plansService.create(plansDto);
      return response.status(200).json(plan);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  @Get()
  async findAll() {
    return this.plansService.findAll();
  }
}
