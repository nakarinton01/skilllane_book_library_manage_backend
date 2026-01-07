import { IsNotEmpty, Length } from "class-validator";

export class BookCreateDto {
  @IsNotEmpty()
  @Length(1, 50)
  readonly title: string;
  
  @IsNotEmpty()
  @Length(1, 50)
  readonly author: string;

  @IsNotEmpty()
  @Length(1, 50)
  readonly isbn: string;
  
  @IsNotEmpty()
  @Length(1, 4)
  readonly publication_year: number;
  
  @IsNotEmpty()
  readonly image: string;

}
