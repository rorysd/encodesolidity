const express = require('express')
const IPFS = require('ipfs');
const path = require('path')
const all = require('it-all');
const Web3 = require('web3');
var cors = require('cors')
const app = express();
const port = 3000;

let web3 = new Web3('ws://localhost:8545');
const ownerPub = '0x26dC7C50E9a002b9a7624D3dF8FD97d6d1918024';

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

async function initGlobalIPFS() {
    global.IPFS = await IPFS.create()
};

initGlobalIPFS()

app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));
app.use(express.json({limit: '10mb'}))
app.use(cors())

const handler = (req, res) => {
    if (req.method === 'POST'){
        console.log(req.body)
        const imageData = req.body.imageData
        const name = req.body.name
        console.log(name, imageData)
        //mintNFT(imageData)
        res.json({cid: 'wefwefrefeqrwferferf34r2134r23eff'})
    }
}

app.post('/mint', cors(corsOptions), handler)

app.get('/getBalance', cors(corsOptions), async (req, res) => {
    const balance = await VolcanoNft.methods.balanceOf(ownerPub).call();
    console.log(balance);
    res.json({'balance': balance});
})

const mintNFT = async (name, imageData) => {
    //Upload image to ipfs and get back CID
    const cid = await global.IPFS.add(imageData);
    //Call NFT contract and get address

}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})