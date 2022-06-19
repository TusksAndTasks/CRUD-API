import { IncomingMessage } from "http";
import { IReqBody } from "../interfaces/interfaces";

export function getRequestBody(req: IncomingMessage): Promise<IReqBody>{
     let body = '';
     return new Promise((resolve, reject) => {
        try{
            req.setEncoding('utf8')
            req.on('data', async (chunk) => {
                try{body += chunk.toString()}catch{reject(new Error())}
            })
            req.on('end', async () => {try{
                resolve(JSON.parse(body))}catch{() => reject(new Error())};
        })
        } catch(err){
            reject(new Error()) 
        }
     })
}
