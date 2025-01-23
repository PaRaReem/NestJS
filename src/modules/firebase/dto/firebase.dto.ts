import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrudDto {
  @IsString()
  @IsNotEmpty()
  collection: string;
}

export class FirebaseCreateDto extends CrudDto {
  value: any;
}

export class FirebaseReadDto extends CrudDto {
  @IsOptional()
  @IsString()
  whereField?: string;

  @IsOptional()
  @IsString()
  whereValue?: string;
}

export class FirebaseUpdateDto extends CrudDto {
  updatedValue: any;

  @IsString()
  @IsNotEmpty()
  whereField: string;

  @IsString()
  @IsNotEmpty()
  whereValue: string;
}

export class FirebaseDeleteDto extends CrudDto {
  @IsString()
  @IsNotEmpty()
  whereField: string;

  @IsString()
  @IsNotEmpty()
  whereValue: string;
}

export class BodyDto {
  value: any;
}

export class ParamsDto extends CrudDto {
  @IsString()
  @IsOptional()
  id: string;
}
