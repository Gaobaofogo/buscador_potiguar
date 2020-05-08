import { pipeline, PipelineObject } from './pipeline';
import net from 'net';
import rx from 'rx';

const subject = new rx.Subject();


function worker() {
  const socket = new net.Socket();

  socket.connect({ port: 30000});

  socket.on('data', (buffer) => {
    const url_from_data = JSON.parse(buffer.toString()).url;

    pipeline(url_from_data).then((pipeline_object: PipelineObject) => {
      const data = {
        url_requested: url_from_data,
        founded_urls: pipeline_object.valid_links,
        body: pipeline_object.page_text
      };

      socket.write(JSON.stringify(data), () => {
        subject.onNext('');
        socket.end();
      });
    });
  });
}

subject.subscribe(_ => {
  worker();
});

worker();