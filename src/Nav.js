import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";

import MainContainer from './MainContainer';
import Upload from './Upload';

function Nav () {
    return(
       <Router>
           <ul>
             <li>
               <Link to="/">Home</Link>
             </li>
             <li>
               <Link to="/upload">Add Tower</Link>
             </li>
           </ul>

           <hr />
          
         <Switch>
              <Route exact path="/">
                <MainContainer />
              </Route>
              <Route path="/upload">
                <Upload />
              </Route>
         </Switch>
       </Router>
    )
}

export default Nav;
