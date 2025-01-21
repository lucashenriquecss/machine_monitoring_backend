import { PartialType } from '@nestjs/mapped-types';
import { CreateTelimetryDto } from './create-telimetry.dto';

export class UpdateTelimetryDto extends PartialType(CreateTelimetryDto) {
  id: number;
}
