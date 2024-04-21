import { Injectable } from "@nestjs/common"

import * as murmurhash from "murmurhash3js"
import * as requestip from "request-ip"
import * as useragent from "useragent"
import * as express from "express"

@Injectable()
export class FingerprintService {
    public async getFingerprint(request: express.Request) {
        const agent = useragent.parse(request.headers["user-agent"])

        const data = JSON.stringify({
            useragent: {
                browser: { 
                    family: agent.family,
                    major: agent.major,
                    minor: agent.minor
                },
                device: { 
                    family: agent.device.family,
                    major: agent.device.major,
                    minor: agent.device.minor
                },
                os: { 
                    family: agent.os.family, 
                    major: agent.os.major, 
                    minor: agent.os.minor 
                }
            },
            headers: {
                encoding: request.headers["accept-encoding"],
                language: request.headers["accept-language"],
                accept: request.headers["accept"]
            },
            ip: { 
                value: requestip.getClientIp(request) 
            }
        })

        return murmurhash.x64.hash128(data)
    }
}