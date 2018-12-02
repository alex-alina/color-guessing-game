import React from 'react';
import { Component } from 'react';
import './Palette.css';

export default class Palette extends Component {

  render() {
    return (
      <div className="palette-main-container">
        <p>Color Palette</p>
        {this.props.palette.map((cell, index) => {
          return <button onClick={this.props.onclick} value={index} className="palette-container" style={{ background: cell }}></button>
        }
        )}
      </div>
    )
  }
}

//target e elementul html pe care evenimentul s-a declansat
//evenimentul e un obiectul care se trimite ca parametru event handlerului care are o proprietate numita target
//orice proprietate / atribut definita pe un element html va fi regasita in proprietatea target a obiectului eveniment