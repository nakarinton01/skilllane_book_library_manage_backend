import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { BookQueryDto } from './dto/book-query.dto';
import { BookCreateDto } from './dto/book-create.dto';
// import { HasRole } from 'src/users/roles/decorator/has-role.decorator';
// import { RoleName } from 'src/users/roles/role.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetJwtUser } from 'src/auth/jwt/decorator/get-jwt-user.decorator';
import type { JwtUser } from 'src/auth/jwt/jwt.strategy';
import { BookUpdateDto } from './dto/book-update.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query() query: BookQueryDto) {
    return this.booksService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: BookCreateDto) {
    return this.booksService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  upddate(@Param('id') id: number, @Body() dto: BookUpdateDto) {
    return this.booksService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/borrow')
  borrow(@Param('id') id: number, @GetJwtUser() jwtUser: JwtUser) {
    return this.booksService.borrow(id, jwtUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/return')
  return(@Param('id') id: number) {
    return this.booksService.return(id);
  }
}
