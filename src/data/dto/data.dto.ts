import { ApiProperty } from '@nestjs/swagger';

export class DataDto {
  @ApiProperty()
  encryptionKey: string;

  @ApiProperty()
  value: object;
}
