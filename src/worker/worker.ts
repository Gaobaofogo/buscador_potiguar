import { pipeline, PipelineObject } from './pipeline';
import net from 'net';
import UTP from '../../libs/messaging/url_transfer_interface';
import ClientMessages from '../../libs/messaging/client';

import PageDB from '../model/page_db';


const socket = new net.Socket();
const request: UTP = {
  action: 'GET',
  urls: [],
  errors: ''
};

socket.on('data', (buffer_response: Buffer) => {
  const response: UTP = JSON.parse(buffer_response.toString());
  console.log('Me devolveram algo');
  // const url = response.urls[0];

  // if (url) {
  //   pipeline(url).then((pipeline_object: PipelineObject) => {
  //     socket.connect({port: 30000}, () => {
  //       const page_db = new PageDB();
  //       const urls: UTP = {
  //         action: 'POST',
  //         urls: pipeline_object.valid_links,
  //         errors: ''
  //       };

  //       page_db.insertPage(url, pipeline_object.page_text);

  //       socket.write(JSON.stringify(urls), () => {
  //         socket.end();
  //       });
  //     });
  //   });
  // }
});

socket.connect({ port: 30000 });
socket.write(JSON.stringify(request));