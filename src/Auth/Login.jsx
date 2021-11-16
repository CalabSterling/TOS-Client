import React from 'react';
import { Input, Form, Label, Button } from 'reactstrap';
//import styled from "styled-components";
import APIURL from '../Helpers/Environment';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user:{username: this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => (response.json())
            )
          .then((data)=> {
              this.props.updateToken(data.sessionToken);
              this.props.updateID(data.ID);
              this.props.updateRole(data.user.role)
              console.log(data);
          })
          .catch(err => {
              alert('failed to login');
              console.log(err)
          })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                        <Label htmlFor="username">Username</Label>
                        <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.state.username} placeholder="Username" type="text" required/>
                        <br />
                        <Label htmlFor="password">Password</Label>
                        <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password} placeholder="Password" type="password" required/>
                        <br />
                        <Button type="submit">Login</Button>
                        <br />
                        <p>Don't have an account? <a href="/create" onClick={this.props.switchToSignup}>Signup</a></p>
    
                </Form>
            </div>
         )
    }
}
 
export default Login;