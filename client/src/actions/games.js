import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_GAME = 'ADD_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UPDATE_GAMES = 'UPDATE_GAMES'
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'
export const UPDATE_GUESS_CODE = 'UPDATE_GUESS_CODE'

const updateGames = games => ({
  type: UPDATE_GAMES,
  payload: games
})

const addGame = game => ({
  type: ADD_GAME,
  payload: game
})

const updateGame = (gameUpdate) => ({
  type: UPDATE_GAME,
  payload: gameUpdate
 })

const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS
})

export const getGames = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateGames(result.body)))
    .catch(err => console.error(err))
}

export const joinGame = (gameId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games/${gameId}/players`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(joinGameSuccess()))
    .catch(err => console.error(err))
}

export const createGame = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addGame(result.body)))
    .catch(err => console.error(err))
}

export const updatePlayerGuess = (gameId, guessedCode) => (dispatch, getState) => {
  const state = getState()

  const jwt = state.currentUser.jwt
  const palette = state.games[gameId].palette
  const hexCodes = guessedCode.map(el => palette[el])

  if (isExpired(jwt)) return dispatch(logout())
  request
    .patch(`${baseUrl}/games/${gameId}/guesses`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ playerGuess: hexCodes })
    .then(result => dispatch(updateGame(result.body)))
    .catch(err => console.error(err))
}

