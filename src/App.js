import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

    state = { name: ""}

    componentDidMount() {
	axios.get(App.url)
	    .then( res => this.setState(res.data) )
	    .catch(function (error) {
		console.log(error);
	    });
    }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to {this.state.name}!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

App.url = "/restaurants/1"

export default App;
