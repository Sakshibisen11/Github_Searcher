import React, { Component } from 'react'
import {Navbar,Nav,NavItem} from 'react-bootstrap';
export default class Header extends Component {
    onLogin(){
        this.props.onLogin();
    }
    onLogout(){
        this.props.onLogout();
    }
    
  render() {
    let page;
    if(this.props.idToken){
        page=<Nav.Link onClick={this.onLogout.bind(this)} href="#">Logout</Nav.Link>
    }else{
       page= <Nav.Link onClick={this.onLogin.bind(this)} href="#">Login</Nav.Link>
    }
    return (
      <div>
        <Navbar>
        <Navbar.Brand>
                    Github Searcher
        </Navbar.Brand>
        <Nav.Item>
        {page}
      </Nav.Item>
        </Navbar>
      </div>
    )
  }
}
