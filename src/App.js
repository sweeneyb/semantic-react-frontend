import _ from 'lodash'
import React, { Component } from 'react';
import logo from './logo.svg'; 
import './App.css';
import axios from 'axios';
import { Search, Grid, Header } from 'semantic-ui-react'


class App extends Component {
    componentWillMount() {
	this.resetComponent()
    }
    
    componentDidMount() {
	axios.get('/restaurants')
	    .then( res => this.setState( {restaurants: res.data._embedded}) )
	    .catch(function (error) {
		console.log(error);
	    });
    }


    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.name })

    handleSearchChange = (e, { value }) => {
	this.setState({ isLoading: true, value })

	setTimeout(() => {
	    if (this.state.value.length < 1) return this.resetComponent()

	    const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
	    const isMatch = result => re.test(result.name)

	    this.setState({
		isLoading: false,
		results: _.filter(this.state.restaurants.restaurants, isMatch),
	    })
	}, 500)
    }

    
    
    render() {
	const {isLoading, value, results } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to {this.state.name}!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
            </p>

	<Grid>
            <Grid.Column width={8}>
          <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
          />
        </Grid.Column>
            <Grid.Column width={8}>
          <Header>State</Header>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <Header>Options</Header>
            <pre>{JSON.stringify(this.state.restaruants, null, 2)}</pre>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

App.url = "/restaurants/1"

export default App;
