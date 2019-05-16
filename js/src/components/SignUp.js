import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { Redirect } from "react-router-dom";


const SERVER_URL = "https://prnkstrserver.herokuapp.com/masters.json"

class SignUp extends Component {
	constructor(){
		super();
		this.state = {
			signedUp: false
		}
	}
	_handleChange = ( event ) => {
		this.setState( {
			masterName: event.target.value
		} );
	}
	_handlePassword = ( event ) => {
		this.setState( {
			password: event.target.value
		} );
	}
	_handleConfirmPassword = ( event ) => {
		this.setState( {
			confirmPassword: event.target.value
		} );
	}
	_handleSubmit = ( event ) => {
		event.preventDefault();
		axios
			.post( SERVER_URL, { name: this.state.masterName, password_digest: this.state.password } )
			.then( ( response ) => {
				console.log( response.data )
				this.setState( { id: response.data.id, signedUp: true } )
			} )
	}
	render() {
		if ( this.state.signedUp ) return <Redirect to={'/slaves/'+ this.state.id } />

		return(
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-4 col-md-6">
						<img className="img-fluid py-4" src={process.env.PUBLIC_URL + '/prnkstr_long_logo.svg'} />
					</div>
				</div>
				<div className="row justify-content-center text-center">
					<div className="col-lg-4 col-md-6">
							<h4>Sign Up</h4>
					</div>
				</div>
				<form onSubmit={ this._handleSubmit } >
					<div className="row justify-content-center">
						<div className="col-lg-4 col-md-6">
							<div className="form-group" controlId="formBasicEmail">
								<label>Master Name</label>
								<input className="form-control" onChange={ this._handleChange } type="text" />
							</div>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-lg-4 col-md-6">
							<div className="form-group" controlId="formBasicPassword">
								<label>Password</label>
								<input className="form-control" onChange={ this._handlePassword } type="password" />
							</div>
						</div>
					</div>
					<div className="row justify-content-center mb-4">
						<div className="col-lg-4 col-md-6">
							<div className="form-group" controlId="formBasicPassword">
								<label>Confirm Password</label>
								<input className="form-control" onChange={ this._handleConfirmPassword } type="password" />
							</div>
						</div>
					</div>
					<div className="row text-center justify-content-center">
						<div className="col-lg-4 col-md-6">
							<button className="btn btn-block btn-outline-danger" type="submit">Submit</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default SignUp;
