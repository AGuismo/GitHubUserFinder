// Index.js

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './configureStore'
import { GitHubUserFinder } from './containers'


// Store creation
const store = configureStore();


const render = () => {
  ReactDOM.render(
    <GitHubUserFinder store={store}/>,
    document.getElementById('content')
  );  
};

// First display
render();

// Subscribe
store.subscribe(render);