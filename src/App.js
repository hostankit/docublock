import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';

class App extends Component {
 
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''   
    };
   
    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onClick = async () => {

    try {
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        // get Transaction Receipt in console on click
        // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({ blockNumber: this.state.txReceipt.blockNumber });
        await this.setState({ gasUsed: this.state.txReceipt.gasUsed });    
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick

    onSubmit = async (event) => {
      event.preventDefault();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
     
      console.log('Sending from Metamask account: ' + accounts[0]);

      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });

        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
        
        storehash.methods.sendHash(this.state.ipfsHash).send({
          from: accounts[0] 
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //storehash 
      }) //await ipfs.add 
    }; //onSubmit 
  
    render() {
      
      return (
        <div className="App" style={{backgroundColor: "grey40"}}>
          <header className="App-header" style={{borderColor: "#FF8C00"}}>
            <h1> Document Management System</h1>
            <h4> National Institute of Technology Silchar, Assam</h4>
          </header>
          
          <hr />

        <Grid style={{borderColor: "#060606"}}>
          <h3> Choose file to add </h3>
          <Form onSubmit={this.onSubmit}>
            <input
              type = "file"
              onChange = {this.captureFile}
            />
             <Button 
             bsStyle="primary" 
             type="submit"> 
             Send it 
             </Button>
          </Form>

          <hr/>
            <Button bsStyle="primary" style={{borderColor: "#517DF1"}} onClick = {this.onClick}> Get Transaction Receipt </Button>

              <Table bordered responsive style={{borderColor: "#060606"}}>
                <thead style={{borderColor: "#060606"}}>
                  <tr style={{borderColor: "#060606"}}>
                    <th style={{borderColor: "#060606"}}>Tx Receipt Category</th>
                    <th style={{borderColor: "#060606"}}>Values</th>
                  </tr>
                </thead>
               
                <tbody style={{borderColor: "#060606"}}>
                  <tr style={{borderColor: "#060606"}}>
                    <td style={{borderColor: "#060606"}}>IPFS Hash # stored on Eth Contract</td>
                    <td style={{borderColor: "#060606"}}>{this.state.ipfsHash}</td>
                  </tr>
                  <tr style={{borderColor: "#060606"}}>
                    <td style={{borderColor: "#060606"}}>Ethereum Contract Address</td>
                    <td style={{borderColor: "#060606"}}>{this.state.ethAddress}</td>
                  </tr>

                  <tr style={{borderColor: "#060606"}}>
                    <td style={{borderColor: "#060606"}}>Tx Hash # </td>
                    <td style={{borderColor: "#060606"}}>{this.state.transactionHash}</td>
                  </tr>

                  <tr style={{borderColor: "#060606"}}>
                    <td style={{borderColor: "#060606"}}>Block Number # </td>
                    <td style={{borderColor: "#060606"}}>{this.state.blockNumber}</td>
                  </tr>

                  <tr style={{borderColor: "#060606"}}>
                    <td style={{borderColor: "#060606"}}>Gas Used</td>
                    <td style={{borderColor: "#060606"}}>{this.state.gasUsed}</td>
                  </tr>                
                </tbody>
            </Table>
        </Grid>
        <div style={{height: "90px"}}></div>
        <div className="App-header1" style={{borderColor: "#FF8C00"}}>
            <h4> Built by</h4>
            <h4><strong>Team BlockBit</strong></h4>
          </div>
     </div>
      );
    } //render
}

export default App;
