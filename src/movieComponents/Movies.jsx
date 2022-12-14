// shortcut to create body rcfe
import React from 'react'
import Home from './Home';
import Favourites from './Favourites';

import PageNotFound from './PageNotFound';
import {Route, Redirect, Switch} from 'react-router-dom';
function Movies() {
  return (
    <>
    <Switch>
    {/* route works like if's */}
    <Route path="/home">
        <Home></Home>
    </Route>

    <Route path="/favourites">
        <Favourites></Favourites>
    </Route>

    <Redirect from="/" to="/home"></Redirect>
    <Route>
      <PageNotFound></PageNotFound>
    </Route>
    </Switch>
     
    </>
  )
}


export default Movies