// Components

import React from 'react'
import { Row, Col, Button, Image, Form, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'


export var UserList = React.createClass({
  handleUserRowClick: function(userLogin) {
    this.props.handleSelectedUserClick(userLogin);
  },
  render: function() {

    let userNodes = this.props.usersData.map(user => {
      return (
        <UserListRow user={user} onUserRowClick={this.handleUserRowClick} key={user.id}>
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

export var UserListRow = React.createClass({
  handleClick: function() {
    this.props.onUserRowClick(this.props.user.login);
  },
  render: function() {
    return (

      <ListGroupItem href="#userDetail" onClick={this.handleClick}>
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

//export UserListRow;

export var UserDetails = React.createClass({
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

    let details = new Array();

    for (const k of displayDetails)
    {
      if (this.props.userData[k.key] != null)
      {
        switch (k.key)
        {
          case "avatar_url":
            details.push(<Image src={this.props.userData[k.key]} circle className="userImgMed" key={k.key}/>);
            break;
          case "html_url":
            details.push(<p key={k.key}><a target="_blank" href={this.props.userData[k.key]}>{this.props.userData.login}</a></p>);
            break;
          case "blog":
            details.push(<p key={k.key}><b>{k.displayText}</b><a target="_blank" href={this.props.userData[k.key]}> {this.props.userData[k.key]}</a></p>);
            break;
          case "created_at":
            let userCreationDate = new Date(this.props.userData.created_at);
            details.push(<p key={k.key}><b>{k.displayText}</b> {userCreationDate.toDateString()}</p>);
            break;
          default:
            details.push(<p key={k.key}><b>{k.displayText}</b> {this.props.userData[k.key]}</p>);
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



export var SearchBar = React.createClass({
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
      this.props.handleSearchBarSubmit(userToFind);
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