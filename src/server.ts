import {createServer} from 'http';

const server = createServer((req, res) => {})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`))