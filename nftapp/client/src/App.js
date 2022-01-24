import { Row, Col, Button, Steps, Layout} from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import nftAbi from "./VolcanoToken.json";
import Web3 from "web3";
const { Content } = Layout;
const contractAddress = "0x6191c2F27275323308feA9ff59868D337CC53f43";

const stepTexts = ['Verify Details', 'Upload NFT', 'Finish', 'Next']

function App() {

  const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [transferTokenId, setTransferTokenId] = useState("");
  const [ownerOfTokenId, setOwnerOfTokenId] = useState("");
  const [ownerMessage, setOwnerMessage] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [certificate, setCertificate] = useState("");
  const [transferMessage, setTransferMessage] = useState("");
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [imageData, setImageData] = useState('');
  const [buttonText, setButtonText] = useState('Next');
  const [nftName, setNftname] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadWeb3Accounts();
  }, []);

  useEffect(() => {
    if (account) {
      getContractNameAndBalance();
    }
  }, [account]);

  if (!window.web3) {
    return alert("No MetaMask installed");
  }

  // Initialise web3 library
  const web3 = new Web3(window.web3.currentProvider);
  window.ethereum.request({ method: "eth_requestAccounts" });

  // Initialise contract
  const contract = new web3.eth.Contract(nftAbi.abi, contractAddress);

  // Load accounts from MetaMask
  const loadWeb3Accounts = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log('all caccounts', accounts)
    setAccount(accounts[0]);
    console.log('set account', accounts[0])
  };

  const getContractNameAndBalance = async () => {
    const name = await contract.methods.name().call();
    const balance = await contract.methods.balanceOf(account).call();
    console.log("Contract name:", name);
    console.log(`Balance of ${account}:`, balance);
  };

  const mintNFT = async (name, imageData) => {
    // Generate certificate and send to IPFS
    const res = await axios.post("http://localhost:3000/mint", { 
      'name': name,
      'imageData': imageData
     });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const mintRes = await contract.methods
      .mint(name)
      .send({from: accounts[0], gas: 2930785}); 
    if (mintRes.status) {
      //const tokenID = await contract.methods.tokenID().call();
      setName("");
      console.log(mintRes);
      console.log("Minted");
    } else {
    }
  };

  const getTokenURI = async () => {
    const tokenURI = await contract.methods.tokenURI(tokenId).call();
    setCertificate(tokenURI);
  };

  const getOwnerOf = async () => {
    const ownerAddress = await contract.methods.ownerOf(ownerOfTokenId).call();
    setOwnerMessage(ownerAddress);
  };

  const transferNFT = async () => {
    const transferRes = await contract.methods
      .safeTransferFrom(account, transferTo, transferTokenId)
      .send({ from: account });
    if (transferRes.status) {
      setTransferMessage("NFT Transferred!");
      setTransferTo("");
      setTransferTokenId("");
    } else {
      setTransferMessage("ERROR!", JSON.stringify(transferRes));
    }
  };

  const setStepAndLog = (toSet) => {
    console.log(`setting to ${toSet}`)
    setCurrentStep(toSet)
    if (toSet === 2){
      console.log("you clicked finish button")
      //make backend call to mint

      console.log(`the image is ${imageData}`)

      mintNFT(imageData);
    }
  }

  const CurrentStep = () => {
    if (currentStep === 0){
      return <Step1 
        updateImage={setImageData}
        imageData={imageData}
        currentStep={currentStep}
        setCurrentStep={setStepAndLog}
      />
    }
    if (currentStep === 1){
      return <Step2 
        imageData={imageData}
        nftName={nftName}
        updateNftName={setNftname}
      />
    }
    if (currentStep === 2){
      return <Step3 
        nftName={nftName}
      />
    }
  }

  const PreviousButton = () => {
    if (currentStep === 0){
      return <></>
    }
    if (currentStep === 1 || 2){
      return (
        <Button onClick={() => setStepAndLog(currentStep - 1)} type="default" block>
          Previous Step
        </Button>
      )
    }
  }

  
  return (
    <Layout style={{'padding': '24px', 'height': '100vh'}}>
    <Row >
      <Steps style={{'paddingBottom': '30px'}} current={currentStep}>
        <Step title="Upload your Image"/>
        <Step title="Provide NFT Details"/>
        <Step title="View Result"/>
      </Steps>
    </Row>
    <Row style={{'height': '50%'}}>
    <Col span={5}>
    </Col>
    <Col span={14}>
    <div style={{'background': '#fff'}}>
        <Content style={{ padding: '50px' }}>
        <CurrentStep />
        <div>
          {currentStep === 0 ? '' : <Button style={{'marginBottom': '5px'}} onClick={() => {
            setButtonText(stepTexts[currentStep + 1])
            currentStep > 1 ? setStepAndLog(0) : setStepAndLog(currentStep + 1)
          }} type="primary" block>
               {buttonText}
          </Button>}
          <br />
          <PreviousButton />
        </div>
        </Content>
        </div>
      </Col>
      <Col span={5}>
      </Col>
    </Row>
    </Layout>
  );
}

export default App;
