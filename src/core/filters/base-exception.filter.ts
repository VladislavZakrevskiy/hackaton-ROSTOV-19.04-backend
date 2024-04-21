import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common"

import { ExceptionStatusEnum } from "@common/enums/exception-status.enum"

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
    public async catch(exception: unknown, host: ArgumentsHost) {
        if(exception instanceof HttpException) {
            const response = exception.getResponse()
            const status = exception.getStatus()
        
            return await host.switchToHttp().getResponse().status(status).send(response)
        }
        else {
            return await host.switchToHttp().getResponse().status(ExceptionStatusEnum.INTERNAL_SERVER_ERROR).send({
                message: "Unhandled exception has occurred",
                status: ExceptionStatusEnum.INTERNAL_SERVER_ERROR,
                cause: exception
            })
        }
    }
}