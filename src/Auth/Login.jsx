import React from 'react';
import { Input, Form, Label, Button } from 'reactstrap';
import styled from "styled-components";
import APIURL from '../Helpers/Environment';

const Container = styled.div`
    margin: 0;
    padding: 0;
    font-size: 14px;
`;
const ButtonContainer = styled.button`
    width: 100%;
    color: #fff;
    font-size: 22px;
    border: none;
    background-color: #677487;
    border-radius: 4px;

    @media (max-width: 1024px) {
        background-color: black;
    }
`;
const InputFont = styled.div`
font-family: 'Roboto Mono', monospace;
font-size: large;
`

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
              console.log(`${this.APIURL}/user/login`)
              console.log(this.state.username)
              console.log(this.state.password)
          })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                        <Label htmlFor="username">Username</Label>
                        <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.state.username} placeholder="Username" type="text"/>
                        <br />
                        <Label htmlFor="password">Password</Label>
                        <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password} placeholder="Password" type="password"/>
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