import { SetMetadata } from "@nestjs/common"

import { UserRoleEnum } from "@common/enums/user-role.enum"

export const UserRoleDecorator = (...roles: UserRoleEnum[]) => SetMetadata("roles", roles)