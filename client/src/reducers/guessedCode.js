import {UPDATE_COLOR} from '../actions/updateColor';

export default (state = [], {type, payload}) => {
  switch (type) {
    case UPDATE_COLOR:
    if(state.length < 3){
      return [
        ...state,
        payload
       ]
    } else {
      return state
    }
     
    default:
      return state
  }
}
