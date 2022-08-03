import { PlansFaker } from '../../factories/plans/plans.factory';
import { get, isArray } from 'lodash';
import { MESSAGE_ERROR_ALREADY_EXISTS_PLAN } from '../../constants';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plans } from '../../entities/plans/plans.entity';
import { PlansService } from './plans.service';
import { PlansDto } from 'src/entities/plans/plansDto';

describe('PlansService', () => {
  let plansService: PlansService;
  let plansFaker: PlansFaker;
  let createPlan: jest.Mock;
  let findOneBy: jest.Mock;
  let planMocked: PlansDto;

  beforeEach(async () => {
    plansFaker = new PlansFaker();

    planMocked = plansFaker.create(true);
    createPlan = jest.fn().mockReturnValue(planMocked);
    findOneBy = jest.fn().mockReturnValue(false);

    const plansRepository = {
      save: createPlan,
      find: jest.fn().mockReturnValue(Promise.resolve([planMocked])),
      findOneBy,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        {
          provide: getRepositoryToken(Plans),
          useValue: plansRepository,
        },
      ],
    }).compile();

    plansService = await module.get(PlansService);
  });

  describe('PlansService', () => {
    describe('when saving a new plan', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(false);
        createPlan.mockReturnValue(planMocked);
      });
      it('should saved a new plan', async () => {
        const planSaved = await plansService.create(planMocked);

        expect(get(planSaved, 'id')).toBeTruthy();
        expect(get(planSaved, 'description')).toBe(planMocked.description);
        expect(get(planSaved, 'minutes')).toBe(planMocked.minutes);
        expect(get(planSaved, 'instance')).toBe(planMocked.instance);
      });
    });
    describe('and if already a plan', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(true);
      });
      it('an error should occur when trying to save a new plan that already exists', async () => {
        try {
          await plansService.create(planMocked);
        } catch (error) {
          expect(error.message).toBe(MESSAGE_ERROR_ALREADY_EXISTS_PLAN);
        }
      });
    });
    describe('when you go to get all the plans', () => {
      it('return all plans', async () => {
        const plans = await plansService.findAll();

        expect(isArray(plans)).toBe(true);
      });
    });
  });
});
