import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './register.dto.js';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
