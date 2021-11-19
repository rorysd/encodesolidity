const express = require('express')
const IPFS = require('ipfs');
const path = require('path')
const all = require('it-all');
const app = express();
const port = 3000;

async function initGlobalIPFS() {
    global.IPFS = await IPFS.create()
};

initGlobalIPFS()

app.use( '/' , express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));
app.use(express.json({limit: '10mb'}))

app.get('/', function(req, res){
    res.sendFile('/public/index.html',{root: __dirname});
});

app.get('/ipfs', handler);
app.post('/ipfs', handler);

async function handler(req, res) {

if (req.method === 'POST'){
    // Set some data to a variable
    const data = req.body.uploadText;
    // Submit data to the network
    const cid = await global.IPFS.add(data);
    res.send({cid: cid.path});
}

if (req.method === 'GET'){
    cid = req.query.cid
    const data = Buffer.concat(await all(global.IPFS.cat(cid)));
    res.send({data: data.toString()});
}
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});