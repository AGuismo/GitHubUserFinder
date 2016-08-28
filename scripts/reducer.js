// Reducer

import { UPDATE_SEARCHED_USERS, UPDATE_CACHED_USER, SWITCH_SELECTED_USER, UPDATE_SEARCHED_USERS_FAILURE, UPDATE_CACHED_USER_FAILURE } from './actions'


export default function(state = {users: [], cachedUsers: [], userSelected: "" }, action) {
  switch(action.type) {
    case UPDATE_SEARCHED_USERS:
      state.users = action.usersData;
      return state;
    case SWITCH_SELECTED_USER:
      state.userSelected = state.cachedUsers[action.userCacheIndex].login;
      return state;  
    case UPDATE_CACHED_USER:
      state.cachedUsers.push(action.userData);
      state.userSelected = action.userData.login;
      return state;
    case UPDATE_SEARCHED_USERS_FAILURE:
      state.users = [];
      return state;
    case UPDATE_CACHED_USER_FAILURE:
      state.userSelected = "";
      return state;
    default:
      return state;
  }
}