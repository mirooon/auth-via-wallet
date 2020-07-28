import React, { Component } from "react";
import { getMessage } from "../../common/consts";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.state = { access_token: "" };
  }

  authenticate = async () => {
    const accountAddress = this.props.account;
    const signature = await this.props.web3.currentProvider.send(
      "personal_sign",
      [
        getMessage(),
        accountAddress, //from which account should be signed. Web3, metamask will sign message by private key inconspicuously.
      ]
    );
    const signatureResult = signature.result;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountAddress, "signature":signatureResult }),
    };
    //make request to local server
    return fetch(`http://localhost:3001/auth/login`, requestOptions)
      .then((response) => response.json())
      .then((token) => {
        this.setState({ access_token: token });
      });
  };

  render() {
    return (
      <div>
        <br></br>
        {this.state.access_token ? (
          `User access token: ${this.state.access_token}`
        ) : (
          <button onClick={this.authenticate}>Login</button>
        )}
      </div>
    );
  }
}

export default LoginComponent;
