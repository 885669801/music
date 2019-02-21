import React, { Component } from 'react';
import Chouti from "./components/index/chouti"
import Player from "./components/player/player"
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom"
import PlayerList from "./components/player/playerlist"
import TopList from './pages/toplist/Toplist'
import Search from './pages/search/search'
import SheetList from './sheet/sheet'
import Playlist from './playlist/playlist'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/toplist' component={TopList} />
          <Route path="/discover" component={Chouti} />
          <Route path="/player" component={Player} />
          <Route path="/playerlist" component={PlayerList} />
          <Route path='/search' component={Search}/>
          <Route path='/sheetlist' component={SheetList}/>
          <Route path='/playlist' component={Playlist}/>
          <Redirect to="/discover" />
        </Switch>
      </Router>
    );
  }
}

export default App;
