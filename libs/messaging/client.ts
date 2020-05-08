import net from 'net';
import UTP from './url_transfer_interface';

/*
Client              Server

request url -----> Process and
                   send a url back
Pipeline, save <---|
on db and send
to server all
new urls  -------> Save new urls on
                   queue.
*/

class ClientMessages {
  private port: number;
  private urls: string[];
  private server_response: UTP;

  constructor(port: number = 30000) {
    this.port = port;
    this.urls = [];
    this.server_response = { action: '', urls: [], errors: '' };
  }

  startUTPWorkflow(pipeline: (x: string) => Promise<string[]>): void {
    console.log('Invoquei');
    this.getUTP(pipeline);
  }

  private getUTP(pipeline: (x: string) => Promise<string[]>): void {
    console.log('eu entrei');
    const request_utp: UTP = {
      action: 'GET',
      urls: [],
      errors: ''
    };

    const socket = new net.Socket();

    socket.on('data', async (server_response: Buffer) => {
      console.log('Recebi as coisas de volta');
      const data_response: UTP = JSON.parse(server_response.toString());
      let url: string;

      if (data_response.urls[0]) {
        console.log('Eu  deveria  ter entrado aqui');
        url = data_response.urls[0];
        this.urls = await pipeline(url);

        socket.end();

        console.log('Cheguei no fim do get');
        this.setServerResponse(data_response);
      }
    });

    socket.connect({ port: this.port });
    socket.write(JSON.stringify(request_utp));
  }

  private setServerResponse(server_response: UTP): void {
    this.server_response = server_response;
    console.log('Vim pro set');
    this.postUTP();
  }

  private postUTP(): void {
    const socket = new net.Socket();
    const response_client: UTP = {
      action: 'POST',
      urls: this.server_response.urls,
      errors: ''
    };
    
    socket.connect({ port: this.port });

    socket.write(JSON.stringify(response_client), (err) => {
      if (err) {
        throw err;
      }

      socket.end();
    });
  }
}


export default ClientMessages;