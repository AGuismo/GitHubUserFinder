// ReactBootsrap UI
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;
var Image = ReactBootstrap.Image;
var Form = ReactBootstrap.Form;
var FormControl = ReactBootstrap.FormControl;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;




// Utils function
function findUserInCachedUsers(userLogin)
{
  var cachedUsers = store.getState().cachedUsers;

  for (var i = 0; i < cachedUsers.length; i++)
  {
    if (cachedUsers[i].login == userLogin)
      return i;
  }
  return -1;
}




// Actions
function updateSearchedUsersAction(usersData) {
  return {
    type: 'UPDATE_SEARCHED_USERS',
    usersData
  };
}

function updateCachedUsersAction(userData) {
  return {
    type: 'UPDATE_CACHED_USER',
    userData
  };
}

function switchSelectedUserAction(userCacheIndex) {
  return {
    type: 'SWITCH_SELECTED_USER',
    userCacheIndex
  };
}

function failedUpdateUsersAction(error) {
  return {
    type: 'UPDATE_SEARCHED_USERS_FAILURE',
    error
  };
}

function failedUpdateFocusedUserAction(error) {
  return {
    type: 'UPDATE_CACHED_USER_FAILURE',
    error
  };
}




// Async Actions / API Fetch
function searchGitHubUser(userToFind)
{
    return fetch("https://api.github.com/search/users?q=" + userToFind);
}

function retrieveGitHubUserDatas(userToRetrieve)
{
    return fetch("https://api.github.com/users/" + userToRetrieve);
}


function fetchSearchUsersDatas(userToFind) {
  return function (dispatch) {    
    return searchGitHubUser(userToFind).then(usersDatas => {

      if (usersDatas.status !== 200) {  
        dispatch(failedUpdateUsersAction("No user found :/"));
        return;  
      }
      else 
      {
        usersDatas.json().then(data => {
          if (data.total_count != 0)
            dispatch(updateSearchedUsersAction(data.items));            
          else
            dispatch(failedUpdateUsersAction("No users found :/"));
 
        });
      }
    })
  };
}

function fetchSelectedUserDatas(userToFind) {
  return function (dispatch) {
    let userCacheIndex = findUserInCachedUsers(userToFind);
    if (userCacheIndex != -1)
      dispatch(switchSelectedUserAction(userCacheIndex));
    else
      return retrieveGitHubUserDatas(userToFind).then(usersDatas => {
        
        if (usersDatas.status !== 200) {  
          dispatch(failedUpdateFocusedUserAction("No user found :/"));
          return;  
        }
        else 
        {
          usersDatas.json().then(data => {
            if (data.message == null)
              dispatch(updateCachedUsersAction(data));            
            else
              dispatch(failedUpdateFocusedUserAction("No user found :/"));
   
          });
        }
      })
  };
}




// Reducer
const reducer = (state = {users: [], cachedUsers: [], userSelected: "" }, action) => {
  switch(action.type) {
    case 'UPDATE_SEARCHED_USERS':
      state.users = action.usersData;
      return state;
    case 'SWITCH_SELECTED_USER':
      state.userSelected = state.cachedUsers[action.userCacheIndex].login;
      return state;  
    case 'UPDATE_CACHED_USER':
      state.cachedUsers.push(action.userData);
      state.userSelected = action.userData.login;
      return state;
    case 'UPDATE_SEARCHED_USERS_FAILURE':
      state.users = [];
      return state;
    case 'UPDATE_CACHED_USER_FAILURE':
      state.userSelected = "";
      return state;
    default:
      return state;
  }
}




// Store creation
const { createStore, applyMiddleware } = Redux;
const reduxThunk = window.ReduxThunk.default;
const store = createStore(reducer, applyMiddleware(reduxThunk));




// Components / containers
var UserListRow = React.createClass({
  userSelected: function()
  {
    store.dispatch(fetchSelectedUserDatas(this.props.user.login));
  },
  render: function() {
    return (

      <ListGroupItem href="#userDetail" onClick={this.userSelected}>
        <Row>
          <Col md={4} xs={2}>         
              <Image src={this.props.user.avatar_url} circle className="userImgMin" />
          </Col>
          <Col md={4} xs={5} className="alignCenter">
              <span className="userInfoMin">{this.props.user.login}</span>
          </Col>
          <Col md={4} xs={5} className="alignCenter">
            {this.props.user.id}
          </Col>
        </Row>
      </ListGroupItem>    

    );
  }
});


var UserList = React.createClass({
  render: function() {

    var userNodes = this.props.usersData.map(user => {
      return (
        <UserListRow user={user} key={user.id}>
        </UserListRow>
      );
    });
    return (

      <ListGroup className="usersList">
        {userNodes}
      </ListGroup>

    );
  }
});


var SearchBar = React.createClass({
    getInitialState: function() {
      return {userToFind: ''};
    },
    handleUserToFindChange: function(e) {
      this.setState({userToFind: e.target.value});
    },
    submit: function(e) {
      e.preventDefault();
      let userToFind = this.state.userToFind.trim();

      if (!userToFind)
        return;
    
      this.state.userToFind = ""; // prevent buttons smashing :D
      store.dispatch(fetchSearchUsersDatas(userToFind));
  },
  render: function() {
    return (

    <Form  onSubmit={this.submit}>
      <Row className="searchBar">
        <Col md={10} xs={9}>
            <FormControl value={this.state.userToFind} type="text" placeholder="Login or username =)" onChange={this.handleUserToFindChange}/>
        </Col>
        <Col md={2} xs={3} className="searchButton ">    
            <Button bsStyle="primary" type="submit">Find</Button>
        </Col>
      </Row>
    </Form>

    );
  }
});


var UserDetails = React.createClass({
  render: function() {

    const displayDetails = [

      { key: "avatar_url", displayText: "1" },
      { key: "html_url", displayText: "2" },
      { key: "id", displayText: "Id:" },
      { key: "name", displayText: "Name:" },
      { key: "company", displayText: "Company:" },
      { key: "blog", displayText: "Blog:" },//
      { key: "location", displayText: "Location:" },
      { key: "created_at", displayText: "Created:" },
      { key: "email", displayText: "Email:" },
      { key: "bio", displayText: "Bio:" },
      { key: "public_repos", displayText: "Public repos:" },
      { key: "public_gists", displayText: "Public gists:" },
      { key: "followers", displayText: "Followers:" },
      { key: "following", displayText: "Following:" },

    ];

    var details = new Array();

    for (const k of displayDetails)
    {
      if (this.props.userData[k.key] != null)
      {
        switch (k.key)
        {
          case "avatar_url":
            details.push(<Image src={this.props.userData[k.key]} circle className="userImgMed"/>);
            break;
          case "html_url":
            details.push(<p><a target="_blank" href={this.props.userData[k.key]}>{this.props.userData.login}</a></p>);
            break;
          case "blog":
            details.push(<p><b>{k.displayText}</b><a target="_blank" href={this.props.userData[k.key]}> {this.props.userData[k.key]}</a></p>);
            break;
          case "created_at":
            var userCreationDate = new Date(this.props.userData.created_at);
            details.push(<p><b>{k.displayText}</b> {userCreationDate.toDateString()}</p>);
            break;
          default:
            details.push(<p><b>{k.displayText}</b> {this.props.userData[k.key]}</p>);
        }

      }

    }

    return (
      <div>
        {details}  
      </div>
    );
  }
});


var GitHubUserFinder = React.createClass({
  getInitialState: function() {
    return {firstPass: true};
  },
  render: function() {

    var focusedUser = null;
    var usersList = null;

    // Mount user details if there is one focused anf if it exists in the store
    if (this.props.storeState.userSelected != "")
    {
      let userFocusedIndex = findUserInCachedUsers(this.props.storeState.userSelected);
      if (userFocusedIndex != -1)
        focusedUser = <Col md={5} xs={12} mdOffset={1}>
                          <h1 id="userDetail">User Details</h1>
                          <div className="focusedUserDetails">
                            <UserDetails userData={this.props.storeState.cachedUsers[userFocusedIndex]} />
                          </div>
                        </Col>;
    }

    // Mount users list if there are users to display
    if (this.props.storeState.users.length != 0)
      usersList = <UserList usersData={this.props.storeState.users} />;
    else if (!this.state.firstPass)
      usersList = <p>No results found :/</p>; 

    // Prevent display no results found at startup
    this.state.firstPass = false;

    return (
      <Grid>
        <Row>
          <Col md={(focusedUser != null) ? 5 : 8 } mdOffset={(focusedUser != null) ? 1 : 2 } xs={12}>
            <div className="userFinder">
              <h1>GitHub User Finder</h1>
              <SearchBar />
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



const render = () => {
  ReactDOM.render(
    <GitHubUserFinder storeState={store.getState()}/>,
    document.getElementById('content')
  );  
};

render();

store.subscribe(render);