import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plans } from '../../entities/plans/plans.entity';
import { PlansDto } from '../../entities/plans/plansDto';
import { Repository } from 'typeorm';
import { MESSAGE_ERROR_ALREADY_EXISTS_PLAN } from '../../constants';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plans)
    private plansRepository: Repository<Plans>,
  ) {}

  // Function should saved a new plan (can return success or error)
  async create(plansDto: PlansDto): Promise<PlansDto | Error> {
    const alreadyExistsPlan = await this.plansRepository.findOneBy({
      instance: plansDto.instance,
      id: plansDto.id,
    });

    if (alreadyExistsPlan) {
      throw new Error(MESSAGE_ERROR_ALREADY_EXISTS_PLAN);
    }

    const savedPlan = await this.plansRepository.save(plansDto);

    const plan = new PlansDto();
    plan.id = savedPlan.id;
    plan.description = savedPlan.description;
    plan.minutes = savedPlan.minutes;
    plan.instance = savedPlan.instance;

    return plan;
  }

  // function to return all plans
  findAll(): Promise<Plans[]> {
    return this.plansRepository.find();
  }
}
