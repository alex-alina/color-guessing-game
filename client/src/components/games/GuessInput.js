import React from 'react';
import { Component } from 'react';
import './GuessInput.css';
import {connect} from 'react-redux'

class GuessInput extends Component {

  render() {
    console.log(this.props.guessedCode)
    return (
      <div >
        <div className="guess-main-container">
        <p>Guess a code</p>
        {this.props.guessedCode.map(index => {
          return <div className="guess-container" style={{ background: this.props.palette[index] }}></div>
        }
        )}
        </div>
        <button >Send</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  guessedCode: state.guessedCode
})



export default connect(mapStateToProps)(GuessInput)
