import {createServer} from 'http';
import { ApiControllers } from './controllers/apiControllers';
import cluster from 'cluster';
import { ResCodes } from './interfaces/enums';

export const ApiController = new ApiControllers();

export const server = createServer((req, res) => {
        if(cluster.isWorker){console.log(`Worker ${cluster.worker?.id} handle request`);}
        if(req.url === '/api/users'){
            ApiController.workWithUsers(req, res);
        } else if ((req.url as string).match(/\/api\/users\/([0-z]+)/)) {
            ApiController.workWithUser(req, res);  
        } else {
            ApiController.handleError(res, ResCodes.NOT_FOUND_CODE, ApiController.endpointError);         
        }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`) 
  if(cluster.worker){console.log(`Worker ${cluster.worker?.id} launched`)}
})