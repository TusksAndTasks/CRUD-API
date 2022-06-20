import os from 'os';
import cluster from 'cluster';


if(cluster.isPrimary){
    let cpus = os.cpus();

    cpus.forEach(() => {
        cluster.fork();
    })
    
    cluster.on('exit', (worker) => {
        console.log(`Worker  ${worker.id} is finished.`)
    })

} else{
    import ('../server');
}