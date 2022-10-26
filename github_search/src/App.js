import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './Github';
import Header from './Components/Header'
import Auth0Lock from 'auth0-lock';
class App extends Component {
constructor(props) {
  super(props)

  this.state = {
  idToken:'',
  profile:{}
  };
}


 static defaultProps={
  clientID:'7t7jNaeOLE0xxrQAW1uhkBQQpEZir9hf',
  domain:'dev-qmixs-uz.us.auth0.com'
 }
 componentDidMount(){
  this.lock=new Auth0Lock(this.props.clientID,this.props.domain);
  this.lock.on('authenticated',(authResult)=>{
    console.log(authResult);
    this.lock.getProfile(authResult.accessToken,(error,profile)=>{
      if(error){
        console.log(error);
        return;
      }
     this.setProfile(authResult.idToken,profile);
    });
  });
  //if the component is already authenticated ie user is already signed in
  this.getProfile();
 }
 setProfile(idToken,profile){
  localStorage.setItem('idToken',idToken);
  localStorage.setItem('profile',JSON.stringify(profile));
  this.setState({
    idToken:localStorage.getItem('idToken'),
    profile:JSON.parse(localStorage.getItem('profile'))
  });
 }
 getProfile(){
  //check if localstorage is empty
  if(localStorage.getItem('idToken')!=null){
    this.setState({
      idToken:localStorage.getItem('idToken'),
      profile:JSON.parse(localStorage.getItem('profile'))
    },()=>{
      console.log(this.state);
    });
  }
 }

showLock(){
  this.lock.show();
}
logout(){
  this.setState ({
    idToken:'',
    profile:''
    },()=>{
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
}
  render(){
    let gitty;
    if(this.state.idToken){
      gitty= <Github/>
    }else{
      gitty="Click on login to view github viewer"
    }
  return (
    <div className="App">
      <Header
      lock={this.lock}
      idToken={this.state.idToken}
      profile={this.state.profile}
      onLogout={this.logout.bind(this)}
      onLogin={this.showLock.bind(this)}/>
     
      {gitty}
      
      
    </div>
  );
}}

export default App;
