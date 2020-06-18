import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount () {
    this.retrieve.call(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    //TODO
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: {username : term}
    })
    .done( () => {
      console.log('Data has been posted');
      this.retrieve.call(this);
    });
    //.fail
  }

  retrieve () {
    $.get('/repos')
    //using chaining to ensure that get request responds with all data, before setting state
    //when tried to parse and setState inside of get request callback, didn't add all repos, by the time the site rerendered
    //actually still have to refresh...
    .done((data) => { //data returned from get request
      var repoArr = JSON.parse(data);
      this.setState({
        repos: repoArr
      });
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));