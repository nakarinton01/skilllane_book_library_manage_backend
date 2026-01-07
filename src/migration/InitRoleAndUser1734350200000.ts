import { MigrationInterface, QueryRunner } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { Role, RoleName } from 'src/users/roles/role.entity';
import { User } from 'src/users/users/user.entity';

export class InitRoleAndUser1734350200000 implements MigrationInterface {
  name = 'InitRoleAndUser1734350200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Role);
    const userRepository = queryRunner.manager.getRepository(User);

    console.log('Creating roles...');

    // 1️⃣ Create Roles
    const roles = await roleRepository.save([
      {
        name: RoleName.ADMIN,
        description: 'System administrator',
      },
      {
        name: RoleName.CUSTOMER,
        description: 'Normal customer',
      },
    ]);

    console.log(`Created ${roles.length} roles`);

    const adminRole = roles.find((r) => r.name === RoleName.ADMIN);

    // 2️⃣ Create Admin User
    console.log('Creating admin user...');

    const salt = (await genSalt(
      +(process.env.NEST_SALT_ROUND || 10),
    )) as string;
    const adminPassword = (await hash(
      process.env.NEST_DEFAULT_ADMIN_PASSWORD || 'password',
      salt,
    )) as string;

    await userRepository.save({
      username: process.env.NEST_DEFAULT_ADMIN_USERNAME || 'admin',
      password: adminPassword,
      role: adminRole,
    });

    console.log('Created admin user');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const roleRepository = queryRunner.manager.getRepository(Role);

    console.log('Removing seeded users and roles...');

    // 1️⃣ Remove users
    await userRepository.delete({
      username: process.env.NEST_DEFAULT_ADMIN_USERNAME || 'admin',
    });

    // 2️⃣ Remove roles
    await roleRepository.delete({
      name: RoleName.ADMIN,
    });
    await roleRepository.delete({
      name: RoleName.CUSTOMER,
    });

    console.log('Removed seeded data');
  }
}
