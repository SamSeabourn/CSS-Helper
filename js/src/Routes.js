import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Slaves from './components/Slaves.js';
import SlaveControlPanel from './components/SlaveControlPanel.js';
import AddSlave from './components/AddSlave.js';

const Routes = (
	<Router>
		<div>
			<Route exact path="/" component={ SignIn } />
			<Route exact path="/SignIn" component={ SignIn } />
			<Route exact path="/SignUp" component={ SignUp } />
			<Route exact path="/slaves/:master" component={ Slaves } />
			<Route exact path="/controlpanel/:user" component={ SlaveControlPanel } />
			<Route exact path="/addslave" component={ AddSlave } />
		</div>
	</Router>
)

export default Routes;
