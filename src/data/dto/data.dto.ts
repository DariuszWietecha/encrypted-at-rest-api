import { ApiProperty } from '@nestjs/swagger';

export class DataDto {
  @ApiProperty()
  value: object;
}
