import { SetMetadata } from '@nestjs/common';

import { RoleName } from 'src/users/roles/role.entity';

export const HasRole = (...role: RoleName[]) => SetMetadata('role', role);
