import { IncomingMessage, ServerResponse } from 'http';
import { Methods, ResCodes } from '../interfaces/enums';
import { IMessage, IUserData } from '../interfaces/interfaces';
import { asyncCreateUser, asyncDeleteUser, asyncFindUser, asyncStringify, asyncUpdateUser } from '../models/apiModel';
import { validate } from 'uuid';
import { getRequestBody } from '../helpers/helpers';


export class ApiControllers{
    contentType: {'Content-Type': string};
    serverError: IMessage;
    endpointError: IMessage;
    idError: IMessage;
    userError: IMessage;
    bodyError: IMessage;


    constructor(){
        this.contentType = {'Content-Type':'application/json'};
        this.serverError = {message: 'Something went wrong, please try again...'};
        this.endpointError = {message: 'Endpoint not found, please try different endpoint'};
        this.idError = {message: 'User not found, please enter existing user'};
        this.userError = {message: 'User ID is invalid, please try enter valid ID'};
        this.bodyError = {message: 'To create new user you must fill or user properties. Please try again'}
    }

    async handleError(res: ServerResponse, code: ResCodes, message: IMessage){
        res.writeHead(code, this.contentType);
        res.end( await asyncStringify(message));
    }

    isIdValid(id: string){
        return validate(id);
      }

    async getUsers(res: ServerResponse){
        res.writeHead(ResCodes.CORRECT_CODE, this.contentType)
        res.end( await asyncStringify())
    }

    async getUser(req: IncomingMessage, res: ServerResponse){
        const id = (req.url as string).split('/')[3]
        if (this.isIdValid(id)){
            const searchData = await asyncFindUser(id);
            if(searchData){
                res.writeHead(ResCodes.CORRECT_CODE, this.contentType)
                res.end( searchData);
            } else{
                this.handleError(res, ResCodes.NOT_FOUND_CODE, this.idError)
            }
        } else {
          this.handleError(res, ResCodes.USER_ERROR_CODE, this.userError);
        }
    }

    async createUser(req: IncomingMessage, res: ServerResponse){
        const body = await getRequestBody(req);
        const {username, age, hobbies} = body;
        if(!username || !age || !hobbies){
          this.handleError(res, ResCodes.USER_ERROR_CODE, this.bodyError)
        } else {
           res.writeHead(ResCodes.CORRECT_CREATE_CODE, this.contentType)
           res.end( await asyncCreateUser(body))
        } 
    }

    async updateUser(req: IncomingMessage, res: ServerResponse){
        const id = (req.url as string).split('/')[3];
        if (this.isIdValid(id)){
            const body = await getRequestBody(req);
            if(!body){
                this.handleError(res, ResCodes.INCORRECT_CODE, this.serverError)
            }
            const searchData = await asyncFindUser(id);
            const parsedSearchData = await JSON.parse(searchData as string) as IUserData;
            if(searchData){
                const updateUser = {...parsedSearchData, ...body};
                res.writeHead(ResCodes.CORRECT_CODE, this.contentType)
                res.end(await asyncUpdateUser(updateUser));
            }else{
                this.handleError(res, ResCodes.NOT_FOUND_CODE, this.idError)
            }    
    } else {
        this.handleError(res, ResCodes.USER_ERROR_CODE, this.userError);
      }
    }
    
    async deleteUser(req: IncomingMessage, res: ServerResponse){
        const id = (req.url as string).split('/')[3];
        if (this.isIdValid(id)){
            const searchData = await asyncFindUser(id);
            if(searchData){
                res.writeHead(ResCodes.CORRECT_DELETE_CODE, this.contentType)
                res.end(await asyncDeleteUser(id));
            }else{
                this.handleError(res, ResCodes.NOT_FOUND_CODE, this.idError)
            }    
    } else {
        this.handleError(res, ResCodes.USER_ERROR_CODE, this.userError);
      }
    }

    async workWithUsers(req: IncomingMessage, res: ServerResponse){
        try{
           switch(req.method){
            case Methods.GET_METHOD:
                this.getUsers(res);
                break;
            case Methods.POST_METHOD:
                this.createUser(req, res);
                break;    
            default:
                this.handleError(res, ResCodes.INCORRECT_CODE, this.serverError);
                break;
           }
        } catch(err){
            this.handleError(res, ResCodes.INCORRECT_CODE, this.serverError);
        }
    }

    async workWithUser(req: IncomingMessage, res: ServerResponse){
        try{
            switch(req.method){
             case Methods.GET_METHOD:
                this.getUser(req, res);
                break;
             case Methods.PUT_METHOD:
                this.updateUser(req, res);
                break;
             case Methods.DELETE_METHOD:
                this.deleteUser(req, res);
                break;      
             default:
                this.handleError(res, ResCodes.INCORRECT_CODE, this.serverError);
                break;
            }
        } catch(err){
            this.handleError(res, ResCodes.INCORRECT_CODE, this.serverError);
        }
    }

}