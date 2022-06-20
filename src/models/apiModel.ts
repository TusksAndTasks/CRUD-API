import { IMessage, IReqBody, IUserData } from "../interfaces/interfaces";
import { v4 } from 'uuid';
import { default as dataArray } from '../data.json'; 



export function asyncStringify(data?: IMessage){
       return new Promise((resolve, reject) => {
          if(data){resolve(JSON.stringify(data))}
          else {resolve(JSON.stringify(dataArray))}
          reject(new Error());
       })
}

export function asyncFindUser(id: string ): Promise<string | null>{
     return new Promise((resolve, reject) => {
        const user = (dataArray as Array<IUserData>).find((user) => user.id === id)
        if (user){
         resolve(JSON.stringify(user))
        }
        else{
        resolve(null);
        }
        reject(new Error());
     })
}

export function asyncCreateUser(body: IReqBody){
     return new Promise ((resolve, reject) => {
        const newUser = {id: v4(), ...body};
        (dataArray as Array<IUserData>).push(newUser);
        resolve(JSON.stringify(newUser));
        reject(new Error());
     }) 
}

export function asyncUpdateUser(user: IUserData){
   return new Promise ((resolve, reject) => {
      (dataArray as Array<IUserData>) = (dataArray as Array<IUserData>).filter((arrayUser) => arrayUser.id !== user.id);
      (dataArray as Array<IUserData>).push(user);
      resolve(JSON.stringify(user));
      reject(new Error());
   })
}

export function asyncDeleteUser(id: string){
   return new Promise ((resolve, reject) => {
      (dataArray as Array<IUserData>) = (dataArray as Array<IUserData>).filter((arrayUser) => arrayUser.id !== id);
      resolve(JSON.stringify({message: 'User is deleted'}));
      reject(new Error());
   })
}