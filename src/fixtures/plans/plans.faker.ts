import { faker } from '@faker-js/faker';
import { PlansDto } from '../../entities/plans/plansDto';

export class PlansFaker {
  create(hasId?: boolean): PlansDto {
    const plan = new PlansDto();

    if (hasId) {
      plan.id = Number(faker.random.numeric());
    }
    plan.origin = faker.random.numeric(3);
    plan.destiny = faker.random.numeric(3);
    plan.instance = faker.name.firstName('male');
    plan.price = faker.random.numeric(3);

    return plan;
  }
}
