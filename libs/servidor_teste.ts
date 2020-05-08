import net from 'net';

const server = net.createServer((socket) => {
  socket.end('goodbye/n');

  socket.on('data', (data) => {
    const valor = JSON.parse(data.toString());
    console.log(`Informação que veio do amiguinho: ${valor.urls}`);
  });
});

server.on('connection', () => {
  console.log('Um amiguinho se conectou :3');
});

server.listen(40000, () => {
  console.log(`opened server on `, server.address());
});