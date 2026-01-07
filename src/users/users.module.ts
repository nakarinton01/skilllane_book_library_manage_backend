import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './roles/role.entity';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
