import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { Book } from './book.entity';
import { BookQueryDto } from './dto/book-query.dto';
import { BookCreateDto } from './dto/book-create.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(query: BookQueryDto) {
    const options: FindManyOptions<Book> = {};
    if (query.search) {
      options.where = {
        ...options.where,
        title: query.search ? Like(`%${query.search}%`) : undefined,
      };
    }

    return await this.bookRepository.find(options);
  }

  async findOne(id: number) {
    return this.bookRepository.findOneOrFail({
      where: { id },
      relations: { users: true },
    });
  }

  async create(dto: BookCreateDto) {
    return this.bookRepository.save(dto);
  }

  async update(id: number, dto: BookCreateDto) {
    return this.bookRepository.update(id, dto);
  }

  async borrow(id: number, userId: number) {
    return this.bookRepository.update(id, { users: { id: userId } });
  }

  async return(id: number) {
    return this.bookRepository.update(id, { users: undefined });
  }
}
