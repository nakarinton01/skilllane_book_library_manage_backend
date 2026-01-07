import { IsOptional, Length } from "class-validator";

export class BookUpdateDto {
  @IsOptional()
  @Length(1, 50)
  readonly title: string;
  
  @IsOptional()
  @Length(1, 50)
  readonly author: string;

  @IsOptional()
  @Length(1, 50)
  readonly isbn: string;
  
  @IsOptional()
  @Length(1, 4)
  readonly publication_year: number;
  
  @IsOptional()
  readonly image: string;
}
