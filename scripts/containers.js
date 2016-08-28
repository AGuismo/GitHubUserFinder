// Containers

import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { UserList, UserListRow, UserDetails, SearchBar } from './components'
import * as AsyncActions from './asyncActions'


export var GitHubUserFinder = React.createClass({
  getInitialState: function() {
    return {firstPass: true};
  },
  searchUser: function(userToFind) {
      this.props.store.dispatch(AsyncActions.fetchSearchUsersDatas(userToFind));
  },
  searchSelectedUser: function(userToFind) {
      this.props.store.dispatch(AsyncActions.fetchSelectedUserDatas(userToFind));
  },  
  render: function() {

    let focusedUser = null;
    let usersList = null;
    let storeState = this.props.store.getState();

    // Mount user details if there is one focused anf if it exists in the store
    if (storeState.userSelected != "")
    {

      let userExist = false;
      for (var userIndex = 0; userIndex < storeState.cachedUsers.length; userIndex++)
      {
        if (storeState.cachedUsers[userIndex].login == storeState.userSelected)
        {
          userExist = true;
          break;
        }
      }

      if (userExist)
        focusedUser = <Col md={5} xs={12} mdOffset={1}>
                          <h1 id="userDetail">User Details</h1>
                          <div className="focusedUserDetails">
                            <UserDetails userData={storeState.cachedUsers[userIndex]} />
                          </div>
                        </Col>;                   
    }

    // Mount users list if there are users to display
    if (storeState.users.length != 0)
      usersList = <UserList usersData={storeState.users} handleSelectedUserClick={this.searchSelectedUser} />;
    else if (!this.state.firstPass)
      usersList = <p>No results found :/</p>; 

    // Prevent display "no results found" at startup
    this.state.firstPass = false;

    return (
      <Grid>
        <Row>
          <Col md={(focusedUser != null) ? 5 : 8 } mdOffset={(focusedUser != null) ? 1 : 2 } xs={12}>
            <div className="userFinder">
              <h1>GitHub User Finder</h1>
              <SearchBar handleSearchBarSubmit={this.searchUser}/>
              {usersList}
            </div>
          </Col>
          {focusedUser}
        </Row>
        <Row>
          <h3>By AGuismo - 2016</h3>
        </Row>
      </Grid>
    );
  }
});