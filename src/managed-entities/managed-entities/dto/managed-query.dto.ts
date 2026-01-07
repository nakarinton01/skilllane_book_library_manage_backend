import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ManagedQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly limit: number;

  @IsOptional()
  readonly search: string;

  isEmpty(): boolean {
    return Object.keys(this).length === 0;
  }

  isPaginate(): boolean {
    return !!this.page || !!this.limit;
  }

  getPaginateOptions() {
    return this.isPaginate() ? { page: this.page || 1, limit: this.limit || 1 } : undefined;
  }
}
