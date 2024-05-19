import { PartialType } from '@nestjs/swagger';
import { CreateChildDto } from './create-child.dto';

/**
 * DTO для обновления учетной записи ребенка
 *
 * @class
 */
export class UpdateChildDto extends PartialType(CreateChildDto) {}
