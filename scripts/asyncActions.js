// Asynchrones Actions / API Fetch

import * as Actions from './actions'


function searchGitHubUser(userToFind)
{
    return fetch("https://api.github.com/search/users?q=" + userToFind);
}

function retrieveGitHubUserDatas(userToRetrieve)
{
    return fetch("https://api.github.com/users/" + userToRetrieve);
}

export function fetchSearchUsersDatas(userToFind) {
  return function (dispatch) {    
    return searchGitHubUser(userToFind).then(usersDatas => {

      if (usersDatas.status !== 200) {  
        dispatch(Actions.failedUpdateUsersAction("No user found :/"));
        return;  
      }
      else 
      {
        usersDatas.json().then(data => {
          if (data.total_count != 0)
            dispatch(Actions.updateSearchedUsersAction(data.items));            
          else
            dispatch(Actions.failedUpdateUsersAction("No users found :/"));
 
        });
      }
    })
  };
}

export function fetchSelectedUserDatas(userToFind) {
  return function (dispatch, getState) {

      let cachedUsers = getState().cachedUsers;
      let userExist = false;

      for (var userIndex = 0; userIndex < cachedUsers.length; userIndex++)
      {
        if (cachedUsers[userIndex].login == userToFind)
        {
          userExist = true;
          break;
        }
      }

    if (userExist)
      dispatch(Actions.switchSelectedUserAction(userIndex));
    else
      return retrieveGitHubUserDatas(userToFind).then(usersDatas => {
        
        if (usersDatas.status !== 200) {  
          dispatch(Actions.failedUpdateFocusedUserAction("No user found :/"));
          return;  
        }
        else 
        {
          usersDatas.json().then(data => {
            if (data.message == null)
              dispatch(Actions.updateCachedUsersAction(data));            
            else
              dispatch(Actions.failedUpdateFocusedUserAction("No user found :/"));
   
          });
        }
      })
  };
}