// import * as request from 'superagent'

export const UPDATE_COLOR = 'UPDATE_COLOR'

export const updateColor = (palette_index) => ({
  type: UPDATE_COLOR,
  payload: palette_index
})

