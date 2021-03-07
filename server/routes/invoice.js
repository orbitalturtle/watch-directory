const express = require('express')
const routes = express.Router();
const grpc= require('grpc');
const fs = require("fs");
const db = require("../queries");


const protoLoader = require('@grpc/proto-loader');
const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
const packageDefinition = protoLoader.loadSync([__dirname + '/rpc.proto', __dirname + '/invoice.proto'], loaderOptions);
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;
const invoicesrpc = grpc.loadPackageDefinition(packageDefinition).invoicesrpc;
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
const macaroon = fs.readFileSync(process.env.DIR_MACAROON_PATH).toString('hex');
const lndCert = fs.readFileSync(process.env.DIR_CERT_PATH);
const sslCreds = grpc.credentials.createSsl(lndCert);
const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
  let metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  callback(null, metadata);
});
let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds)

let lightning = new lnrpc.Lightning('192.168.1.167:10009', creds);
let invoices = new invoicesrpc.Invoices('192.168.1.167:10009', creds);


routes.get('/invoice', (request, response) => {
  lightning.addInvoice({ 
        value: 1000
  }, function(err, resp) {
    if (err) {
        console.log("error: ", err)
    } else {
        let invoice = {
          payment_request: resp.payment_request,
          r_hash: resp.r_hash,
        }
        response.json(invoice);
    }
  })

  let req = {
     body: {
       tower_id: "ioehfas",
       address: "adlfjsdk",
     }   
  }   
  db.createTower(req)

})

routes.post('/invoice', (request, response) => {
  let id = request.body.id
  let address = request.body.address
  let invoice = request.body.invoice
  let r_hash = request.body.r_hash

  subscribeInvoice(r_hash.data, id, address)
})

const subscribeInvoice = (payment_hash, id, address) => {
  let call = invoices.subscribeSingleInvoice({r_hash: payment_hash});

  call.on('data', function(response) {
    // A response was received from the server.

    if (response.settled) {
      console.log("Invoice has been settled.")

      let request = {
        body: {
          tower_id: id,
          address: address,
        }
      }
      db.createTower(request)
    }
  });
  call.on('status', function(status) {
    // The current status of the stream.
  });
  call.on('end', function() {
    // The server has closed the stream.
  });
  call.on('error', function(err) {
    console.log("ERR: ", err)
  });
}

module.exports = routes;
