import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Link } from 'react-router-dom'

const MASTER_URL = "https://prnkstrserver.herokuapp.com/masters"
const USER_URL = "https://prnkstrserver.herokuapp.com/users"

class Slaves extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			masterId: props.match.params.master,
			users: []
		};
		this.getSlaves( this.state.masterId );
	}
	getSlaves = ( id ) => {
		axios.get( `${ MASTER_URL + '/' + id + '.json' }` ).
			then( ( response ) => {
				this.setState( { users: response.data.users } )
			} )
	}
	render() {
		return (
			<div className="container">
			  <div className="row justify-content-center">
					<div className="col-lg-4 col-md-6">
						<img className="img-fluid py-4" src={ process.env.PUBLIC_URL + '/prnkstr_long_logo.svg' } />
						<h2> Current Connections </h2>
					</div>
				</div>
				{ this.state.users.map( ( user ) => <Link to={ '/controlpanel/' + user.id }><div className="card"><p key={ user.id }>{ user.name }</p></div></Link> ) }
			</div>
		)
	}
}

export default Slaves;
