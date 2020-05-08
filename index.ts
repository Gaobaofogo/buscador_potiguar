import net from 'net';
import Queue from './libs/queue/links_queue';
import PageDB from './src/model/page_db';

const server = net.createServer();
const queue = new Queue();
const page_db = new PageDB();

queue.insert('http://www.odp.org/');

server.on('connection', (socket) => {
  const urlJson = { url: queue.pop() };
  let acumulator = '';

  socket.write(JSON.stringify(urlJson));

  socket.on('data', (buffer) => {
    acumulator += buffer.toString();
  });

  socket.on('end', () => {
    const data = JSON.parse(acumulator);

    data.founded_urls.forEach((url: string) => {
      queue.insert(url);
    });

    page_db.insertPage(data.url_requested, data.body);

    acumulator = '';

    console.log(`Qntd urls: ${queue.size()}`);
  });
});

server.listen(30000, 'localhost', () => {
  console.log('The server are listening on port 30000');
});