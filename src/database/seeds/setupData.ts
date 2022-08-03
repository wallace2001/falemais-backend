import { Factory, Seeder } from 'typeorm-seeding';
import { PLANS_DEFAULT } from '../../constants';
import { Plans } from '../../entities/plans/plans.entity';

export class SetupData implements Seeder {
  public async run(factory: Factory): Promise<void> {
    for (let i = 0; i < PLANS_DEFAULT.length; i++) {
      const { description, minutes, instance } = PLANS_DEFAULT[i];

      const plans = new Plans();
      plans.description = description;
      plans.instance = instance;
      plans.minutes = minutes;
      await plans.save();
    }
  }
}
