import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';

/**
 * DTO для получения информации о сессии
 *
 * @class
 */
export class GetSessionInfoDto {
  /**
   * Идентификатор пользователя
   * @type {number}
   */
  @ApiProperty({ example: 1 })
  id: number;

  /**
   * Адрес электронной почты пользователя
   * @type {string}
   */
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  /**
   * Роль пользователя
   * @type {Role}
   */
  @ApiProperty({ enum: Role, example: 'USER' })
  role: Role;

  /**
   * Время истечения срока действия сессии
   * @type {number}
   */
  @ApiProperty({ example: 1672531200 })
  exp: number;
}
