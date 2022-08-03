import { faker } from '@faker-js/faker';
import { PlansDto } from '../../entities/plans/plansDto';

export class PlansFaker {
  create(hasId?: boolean): PlansDto {
    const plan = new PlansDto();

    if (hasId) {
      plan.id = Number(faker.random.numeric());
    }
    plan.description = faker.name.firstName('male');
    plan.minutes = Number(faker.random.numeric(4));
    plan.instance = faker.name.firstName('male');

    return plan;
  }
}
