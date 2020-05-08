import net from 'net';
import LinksQueue from '../queue/links_queue';
import UTP from './url_transfer_interface';


class ServerMessages {
  private port: number;
  private host: string;
  private server: net.Server;
  private linksQueue: LinksQueue;

  constructor(port: number = 30000, host: string = '127.0.0.1') {
    this.port = port;
    this.host = host;
    this.linksQueue = new LinksQueue();
    this.socketManage = this.socketManage.bind(this);
    this.server = net.createServer();

    this.initServerListening(this.server);
  }

  private initServerListening(server: net.Server): void {
    server.on('connection', this.socketManage);
  }

  private socketManage(server_socket: net.Socket): void {
    let received_value = "";

    server_socket.on('data', (data) => {
      try {
        const parsed_value: UTP = JSON.parse(received_value);
        
        if (parsed_value.action === 'GET') {
          server_socket.write(
            JSON.stringify(this.treatUTPGet())
          );
        }
      } catch (err) {
        received_value += data.toString();
      }
    });

    server_socket.on('end', () => {
      if (received_value.length === 0) {
        return;
      }

      const parsed_value: UTP = JSON.parse(received_value);

      if (parsed_value.action === 'POST') {
        this.treathUTPPost(parsed_value.urls);
      }

      received_value = '';
      console.log(`Tamanho doo negocio: ${this.linksQueue.size()}`);
    });
  }

  private treatUTPGet(): UTP {
    const response_utp_url: UTP = {
      action: 'GET',
      urls: [this.linksQueue.pop()],
      errors: ''
    };

    return response_utp_url;
  }

  private treathUTPPost(urls: Array<string | undefined>) {
    urls.forEach((url: string | undefined) => {
      if (url) {
        this.linksQueue.insert(url);
      }
    });
  }

  private treatUTPObject(data: UTP): UTP {
    if (data.action === 'GET') {
      const response_utp_url: UTP = {
        action: 'GET',
        urls: [this.linksQueue.pop()],
        errors: ''
      };

      return response_utp_url;
    } else if (data.action === 'POST') {
      data.urls.forEach((url: string | undefined) => {
        if (url) {
          this.linksQueue.insert(url);
        }
      });
    }

    return { action: '', urls: [], errors: '' };
  }

  listen(): void {
    this.server.listen(this.port, this.host, () => {
      console.log(`Listening on ${this.host}:${this.port}`);
    });
  }

  close(): void {
    this.server.close();
  }
}

export default ServerMessages;

/*
Me ajudou com a programação com sockets

https://www.hacksparrow.com/nodejs/tcp-socket-programming-in-node-js.html
https://nodejs.org/docs/latest/api/net.html#net_event_data
*/