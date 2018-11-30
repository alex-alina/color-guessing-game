import React from 'react';
import { Component } from 'react';
import './SecretCode.css';




export default class SecretCode extends Component {
  state = {
    hiddenSecretCode: ['#d0d6e0', '#d0d6e0', '#d0d6e0']
  }


  render() {
    return (
      <div className="main-container">
        <p>Secret Code</p>
        {this.state.hiddenSecretCode.map(cell => {
          return <div className="secret-code-container" style={{ background: cell }}></div>
        }
        )}
      </div>
    )
  }
}