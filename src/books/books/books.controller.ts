import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { BooksService } from './books.service';
import { BookQueryDto } from './dto/book-query.dto';
import { BookCreateDto } from './dto/book-create.dto';
import { HasRole } from 'src/users/roles/decorator/has-role.decorator';
import { RoleName } from 'src/users/roles/role.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetJwtUser } from 'src/auth/jwt/decorator/get-jwt-user.decorator';
import type { JwtUser } from 'src/auth/jwt/jwt.strategy';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query() query: BookQueryDto) {
    return this.booksService.findAll(query);
  }

  @Get('/:id')
  findOne(id: number) {
    return this.booksService.findOne(id);
  }

  @HasRole(RoleName.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(dto: BookCreateDto) {
    return this.booksService.create(dto);
  }

  @HasRole(RoleName.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @Post('/:id/borrow')
  borrow(id: number, @GetJwtUser() jwtUser: JwtUser) {
    return this.booksService.borrow(id, jwtUser.id);
  }

  @HasRole(RoleName.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @Post('/:id/return')
  return(id: number) {
    return this.booksService.return(id);
  }
}
