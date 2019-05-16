import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = "https://prnkstrserver.herokuapp.com/users.json"

class User extends Component {
 constructor (){
   super();
   this.state = {
     users: []
   };
   this.saveUser = this.saveUser.bind( this );

   const fetchUser = () => {
       axios.get(SERVER_URL).then( (results) => {
         this.setState({ users: results.data });
       });
     };

   fetchUser();
 }

 saveUser(s) {
   axios.post(SERVER_URL, {name: s.name, fill_murray: s.fill_murray, place_cage: s.place_cage, custom_header: s.custom_header, custom_header_text: s.custom_header_text, paragraph_background: s.paragraph_background, paragraph_color: s.paragraph_color, snap: s.snap, master_id: s.master_id}).then((results) => {
     console.log('results data', results);
     this.setState( {users: [...this.state.users, results.data]  });
   });
 }

 render(){
   return (
   <div>
     <h1>User</h1>
     <CreateUser onSubmit={ this.saveUser } />
     <Display users={ this.state.users } />
   </div>
   )
 }
};


class CreateUser extends Component {
 constructor() {
   super();
   this.state = {
     name: '',
     fill_murray: false,
     place_cage: false,
     custom_header: false,
     custom_header_text: '',
     paragraph_background: '',
     paragraph_color: '',
     snap: false,
     master_id: '',
   };

   this._handleChangeName = this._handleChangeName.bind(this);
   this._handleChangeFillMurray = this._handleChangeFillMurray.bind(this);
   this._handleChangePlaceCage = this._handleChangePlaceCage.bind(this);
   this._handleChangeCustomHeader = this._handleChangeCustomHeader.bind(this);
   this._handleChangeCustomHeaderText = this._handleChangeCustomHeaderText.bind(this);
   this._handleChangeParagraphBackground = this._handleChangeParagraphBackground.bind(this);
   this._handleChangeParagraphColor = this._handleChangeParagraphColor.bind(this);
   this._handleChangeSnap = this._handleChangeSnap.bind(this);
   this._handleChangeMasterId = this._handleChangeMasterId.bind(this);
   //submit
   this._handleSubmit = this._handleSubmit.bind(this);
 }

 _handleChangeName(e) {
   this.setState( {name: e.target.value} );
 }
 _handleChangeFillMurray(e) {
   this.setState( {fill_murray: e.target.value} );
 }
 _handleChangePlaceCage(e) {
   this.setState( {place_cage: e.target.value} );
 }
 _handleChangeCustomHeader(e) {
   this.setState( {custom_header: e.target.value} );
 }
 _handleChangeCustomHeaderText(e) {
   this.setState( {custom_header_text: e.target.value} );
 }
 _handleChangeParagraphBackground(e) {
   this.setState( {paragraph_background: e.target.value} );
 }
 _handleChangeParagraphColor(e) {
   this.setState( {paragraph_color: e.target.value} );
 }
 _handleChangeSnap(e) {
   this.setState( {snap: e.target.value} );
 }
 _handleChangeMasterId(e) {
   this.setState( {master_id: e.target.value} );
 }
 //submit
   _handleSubmit(e) {
     e.preventDefault();
     this.props.onSubmit( this.state );
     this.setState({
       name: '',
       fill_murray: false,
       place_cage: false,
       custom_header: false,
       custom_header_text: '',
       paragraph_background: '',
       paragraph_color: '',
       snap: false,
       master_id: ''
    });
   }

 render() {
   return(
   <div>
     <form onSubmit={ this._handleSubmit }>
       <label> Name  </label>
       <textarea onChange={ this._handleChangeName } value={this.state.name}></textarea>

       <label> FillMurray   </label>
       <textarea onChange={ this._handleChangeFillMurray } value={this.state.fill_murray}></textarea>

       <label> PlaceCage  </label>
       <textarea onChange={ this._handleChangePlaceCage } value={this.state.place_cage}></textarea>

       <label> CustomHeader  </label>
       <textarea onChange={ this._handleChangeCustomHeader} value={this.state.custom_header}></textarea>

       <label> CustomHeaderText  </label>
       <textarea onChange={ this._handleChangeCustomHeaderText } value={this.state.custom_header_text}></textarea>

       <label> ParagraphBackground  </label>
       <textarea onChange={ this._handleChangeParagraphBackground } value={this.state.paragraph_background}></textarea>

       <label> ParagraphColor  </label>
       <textarea onChange={ this._handleChangeParagraphColor } value={this.state.paragraph_color}></textarea>

       <label> Snap  </label>
       <textarea onChange={ this._handleChangeSnap } value={this.state.snap}></textarea>


       <label> MasterId  </label>
       <input type="number" onChange={ this._handleChangeMasterId } value={this.state.master_id} />
       <br/><br/>
       <input className="button" type="submit" value="Create User" />
     </form>
   </div>
   );
 }
};

//Child Comp

//Displayusers
class Display extends Component {
 render() {
   return (
     <div>
       <ul>
         {this.props.users.map( (s) => <p key={s.id}>User name:&nbsp;{s.name}&nbsp;&nbsp;|&nbsp;&nbsp;FillMurray:&nbsp;{s.fill_murray}&nbsp;&nbsp;|&nbsp;&nbsp;PlaceCage:&nbsp;{s.place_cage}&nbsp;&nbsp;|&nbsp;&nbsp;CustomHeader:&nbsp;{s.custom_header}&nbsp;&nbsp;|CustomHeaderText:&nbsp;{s.custom_header_text}&nbsp;&nbsp;|Paragraph Background:&nbsp;{s.paragraph_background}&nbsp;&nbsp;|Paragraph Color:&nbsp;{s.paragraph_color}&nbsp;&nbsp;|Snap:&nbsp;{s.snap}&nbsp;&nbsp;|&nbsp;&nbsp;Master ID:&nbsp;{s.master_id} </p> )}

         </ul>
         </div>
);
 }
};
export default User;
