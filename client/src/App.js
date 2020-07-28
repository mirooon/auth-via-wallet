import React, { Component } from 'react';
import getWeb3 from "./getWeb3";
import LoginComponent from "./LoginComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isConnected: false};
  }
  async componentWillMount() {
    this.web3 = await getWeb3();
    const accounts = await this.web3.eth.getAccounts();
    if(this.web3) {
      this.setState({isConnected: true, account: accounts[0], web3: this.web3});
    }
  }

  render() {
    return (
      <div style={{marginLeft: 5 + 'em'}}>
        <h2>Client app</h2><br/>
        {this.state.isConnected? `MetaMask enabled. Your address ${this.state.account}`:'MetaMask disabled'}
        <LoginComponent web3={this.web3} account={this.state.account}/>
      </div>
    );
  }
}
export default App;