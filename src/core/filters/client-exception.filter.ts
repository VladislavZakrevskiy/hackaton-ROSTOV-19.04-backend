import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common"

import { ClientExceptionClass } from "@src/common/classes/client-exception.class"

@Catch(ClientExceptionClass)
export class ClientExceptionFilter implements ExceptionFilter {
    public async catch(exception: ClientExceptionClass, host: ArgumentsHost) {
        const response = exception.getResponse()
        const status = exception.getStatus()
        
        return await host.switchToHttp().getResponse().status(status).send(response)
    }
}
