import React from 'react';
import {Form, Input, Label, Button } from 'reactstrap';
//import styled from 'styled-components';
import URL from '../Helpers/Environment';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', firstName: '', lastName: '', role: '', customerId: 1}
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${URL}/user/create`, {
            method: 'POST',
            body: JSON.stringify({user: {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, role: this.state.role }}),
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
            })
    }

    render() {
        return ( 
            <div>
            <Form onSubmit={this.handleSubmit}>
                <Label htmlFor="firstName">First Name</Label>
                <Input onChange={(e) => this.setState({firstName: e.target.value})} name="firstName" value={this.state.firstName} type="text" placeholder="First Name" required/>
                <br />
                <Label htmlFor="lastName">Last Name</Label>
                <Input onChange={(e) => this.setState({lastName: e.target.value})} name="lastName" value={this.state.lastName} type="text" placeholder="Last Name" required/>
                <br />
                <Label htmlFor="username">Username</Label>
                <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.state.username} type="text" placeholder="Username" required/>
                <br />
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password} type="password" placeholder="Password" pattern="[A-Za-z]{8}" required title="8 characters minimum"/>
                <br />
                <Label htmlFor="role">Role</Label>
                <select name="role" value={this.state.role} onChange={(e) => {this.setState({role: e.target.value}); console.log(this.state.role)}} required>
                    <option disabled></option>
                    <option  value='admin'>Admin</option>
                    <option value='user'>User</option>
                </select>
                <br />
                <Button type="submit" >Signup</Button>
                <br />
                <div>Already a member? <a href="/login" onClick={this.props.switchToLogin}>Login</a></div>
            </Form>
            </div>
         );
    }
}
 
export default Signup;