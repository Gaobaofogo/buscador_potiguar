// Require the framework and instantiate it
import PageDB from '../model/page_db';
import fastify from 'fastify'

const server = fastify()
const page_db = new PageDB();


server.get('/pesquisa', async (request, reply) => {
  if (request.query.q) {
    reply.send({
      urls: await page_db.searchPage(request.query.q)
    });
  }
 })

 server.listen(8080, (err, address) => {
  if(err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
 })
