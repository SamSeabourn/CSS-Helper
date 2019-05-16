import React, { Component } from 'react';
import axios from 'axios';
import logo from './prnkstr_logo_long.svg'


// import ReactDOM from 'react-dom';
// import './App.css';
import SignIn from './SignIn';
// import SignUp from './SignUp';

// import { Redirect, Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			masterName: '',
			password: '',
			confirmPassword: '',
		}
	}

  componentDidMount() {
    axios.put( 'https://prnkstrserver.herokuapp.com/users/51.json', {"name": "Was Sams MBa testing name update with the Yianster"})
    .then(r => console.log(r.status)).catch(e => console.log(e))
  }


	render() {
		return (
			<Container>
				<Row>
					<div className="col-4 col-offset-4 justify-center">
						<img src={logo} alt="Logo" className="img-fluid"/>
					</div>
				</Row>
				
				<Row>
					<Col>
						<SignIn />
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Home;
