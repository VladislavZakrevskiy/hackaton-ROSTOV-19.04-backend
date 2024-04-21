import { UserEntity } from "@common/entities/user.entity"

declare global {
	namespace Express {
        interface User extends UserEntity {}

		interface Request {
            user: User
        }
	}
}