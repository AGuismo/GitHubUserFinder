// Actions
export const UPDATE_SEARCHED_USERS = 'UPDATE_SEARCHED_USERS'
export const UPDATE_CACHED_USER = 'UPDATE_CACHED_USER'
export const SWITCH_SELECTED_USER = 'SWITCH_SELECTED_USER'
export const UPDATE_SEARCHED_USERS_FAILURE = 'UPDATE_SEARCHED_USERS_FAILURE'
export const UPDATE_CACHED_USER_FAILURE = 'UPDATE_CACHED_USER_FAILURE'


export function updateSearchedUsersAction(usersData) {
  return {
    type: UPDATE_SEARCHED_USERS,
    usersData
  };
}

export function updateCachedUsersAction(userData) {
  return {
    type: UPDATE_CACHED_USER,
    userData
  };
}

export function switchSelectedUserAction(userCacheIndex) {
  return {
    type: SWITCH_SELECTED_USER,
    userCacheIndex
  };
}

export function failedUpdateUsersAction(error) {
  return {
    type: UPDATE_SEARCHED_USERS_FAILURE,
    error
  };
}

export function failedUpdateFocusedUserAction(error) {
  return {
    type: UPDATE_CACHED_USER_FAILURE,
    error
  };
}