import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChildsService } from './childs.service';

@Controller('childs')
@ApiTags('Childs')
export class ChildsController {
  constructor(private childService: ChildsService) {}
}
