import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updatePlayerGuess } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from 'material-ui/Paper'
import SecretCode from './SecretCode'
import './GameDetails.css'
import Palette from './Palette';
import { updateColor } from '../../actions/updateColor'
import GuessInput from './GuessInput';

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  paletteHandler = (event) => {
    this.props.updateColor(event.target.value)
  }

  sendGuessHandler = (event) => {
    const guessedCodeArr = this.props.guessedCode.map(el => parseInt(el, 10))
    this.props.updatePlayerGuess(this.props.game.id, guessedCodeArr)
  }

  render() {
    const { game, users, authenticated, userId } = this.props

    if (!authenticated) return (
      <Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    // const winner = game.players
    //   .filter(p => p.symbol === game.winner)
    //   .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player === game.playerOneTurn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>

      }
      <SecretCode />
      <hr />
      <GuessInput onclick={this.sendGuessHandler} palette={game.palette} />
      <hr />
      <Palette onclick={this.paletteHandler} palette={game.palette} />

      {/* {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      } */}

      <hr />

      {
        game.status !== 'pending' //you have to complete this with smth

      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  guessedCode: state.guessedCode
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updatePlayerGuess, updateColor
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
