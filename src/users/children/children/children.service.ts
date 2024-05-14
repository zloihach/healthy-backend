import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DbService } from '../../../db/db.service';
import { VaccinationService } from '../../../vaccination/vaccination.service';

@Injectable()
export class ChildrenService {
  constructor(
    private readonly db: DbService,
    @Inject(forwardRef(() => VaccinationService))
    private readonly vaccinationService: VaccinationService,
  ) {}
}
