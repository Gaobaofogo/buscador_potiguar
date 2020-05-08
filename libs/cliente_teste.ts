import net from 'net';

const socket = new net.Socket();

socket.connect({port: 40000}, () => {
  console.log('Conectei no servidor :3');
});

const urls = {
  'urls': [
    'http://www.google.com',
    'http://www.duckduckgo.com'
  ]
};

socket.write(JSON.stringify(urls));