import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlansDto } from 'src/entities/plans/plansDto';
import { Plans } from '../entities/plans/plans.entity';
import { PlansFaker } from '../fixtures/plans/plans.faker';
import * as request from 'supertest';
import { PlansService } from '../services/plans/plans.service';
import { PlansController } from './plans/plans.controller';

describe('PlansController', () => {
  let app: INestApplication;
  let plansFaker: PlansFaker;
  let plansMocked: PlansDto;
  let findOneBy: jest.Mock;

  beforeEach(async () => {
    plansFaker = new PlansFaker();
    plansMocked = plansFaker.create(true);

    findOneBy = jest.fn().mockResolvedValue(false);

    const plansRepository = {
      save: jest.fn().mockResolvedValue(plansMocked),
      findOneBy,
      findAll: jest.fn().mockReturnValue(Promise.resolve([plansMocked])),
      find: jest.fn().mockReturnValue(Promise.resolve([plansMocked])),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansController],
      providers: [
        PlansService,
        {
          provide: getRepositoryToken(Plans),
          useValue: plansRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('when saving', () => {
    describe('', () => {
      it('should saved a new plan', () => {
        return request(app.getHttpServer())
          .post('/plans')
          .send({
            origin: plansMocked.origin,
            destiny: plansMocked.destiny,
            price: plansMocked.price,
            instance: plansMocked.instance,
          })
          .expect(200);
      });
    });

    describe('and when saving a plan for the second time', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(true);
      });

      it('should return status 400', () => {
        return request(app.getHttpServer())
          .post('/plans')
          .send({
            origin: plansMocked.origin,
          })
          .expect(400);
      });
    });

    describe('when request all plans', () => {
      it('return status 200 when request all plans', () => {
        return request(app.getHttpServer()).get('/plans').send().expect(200);
      });
    });
  });
});
