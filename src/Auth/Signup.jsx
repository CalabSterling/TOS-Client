import React from 'react';
import {Form, Input, Label, } from 'reactstrap';
import styled from 'styled-components';
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
const MemberP = styled.p`
    padding-top: 5%;
`;

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', firstName: '', lastName: '', role: 'user', customerId: 1}
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/user/create`, {
            method: 'POST',
            body: JSON.stringify({user: {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, role: this.state.role, customerId: this.state.customerId}}),
            headers: new Headers ({
                'Content-Type': "application/json"
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
            this.props.updateID(data.ID)
            this.props.updateRole(data.role)
            console.log(data.sessionToken)
        }).catch(
            (err) => {
            console.log(err)
            console.log(this.state.username)
            console.log(this.state.password)
            })
    }

    render(props) {
        return ( 
            <Container>
            <Form onSubmit={this.handleSubmit}>
                <Label htmlFor="firstName">First Name</Label>
                <Input onChange={(e) => this.setState({firstName: e.target.value})} name="firstName" value={this.state.firstName} type="text" placeholder="First Name"/>
                <br />
                <Label htmlFor="lastName">Last Name</Label>
                <Input onChange={(e) => this.setState({lastName: e.target.value})} name="lastName" value={this.state.lastName} type="text" placeholder="Last Name"/>
                <br />
                <Label htmlFor="username">Username</Label>
                <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.state.username} type="text" placeholder="Username"/>
                <br />
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password} type="password" placeholder="Password" pattern="[A-Za-z]{8}" required title="8 characters minimum"/>
                <br />
                <ButtonContainer type="submit" >Signup</ButtonContainer>
                <br />
                <MemberP>Already a member? <a href="/login" onClick={this.props.switchToLogin}>Login</a></MemberP>
            </Form>
            </Container>
         );
    }
}
 
export default Signup;