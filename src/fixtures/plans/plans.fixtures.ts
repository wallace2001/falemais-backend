import { PlansDto } from '../../entities/plans/plansDto';
import { faker } from '@faker-js/faker';
import { MESSAGE_ERROR_ALREADY_EXISTS_PLAN } from '../../constants';

export class PlansFixtures {
  plans: PlansDto[] = [];
  create(plansDto: PlansDto): PlansDto | Error {
    const plan = new PlansDto();

    const alreadyPlanExists = this.plans.find(
      (thisPlan) =>
        thisPlan.instance === plansDto.instance || thisPlan.id === plansDto.id,
    );

    if (alreadyPlanExists) {
      return new Error(MESSAGE_ERROR_ALREADY_EXISTS_PLAN);
    }

    Object.assign(plan, {
      ...plansDto,
      id: Number(faker.random.numeric(1)),
    });

    this.plans.push(plan);
    return plan;
  }

  findAll(): PlansDto[] {
    return this.plans;
  }
}
