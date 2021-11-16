import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Label, Input, Form, Modal } from 'reactstrap';

import URL from '../../Helpers/Environment';

class CustomerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {   
            name: this.props.customerToUpdate.name,
            contact1: this.props.customerToUpdate.contact1,
            contact2: this.props.customerToUpdate.contact2,
            email1: this.props.customerToUpdate.email1,
            email2: this.props.customerToUpdate.email2
        }
    }

    customerUpdate = (event) => {
        event.preventDefault();
        fetch(`${URL}/customer/update/${this.props.customerToUpdate.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                customer: {
                    name: this.state.name,
                    contact1: this.state.contact1,
                    contact2: this.state.contact2,
                    email1: this.state.email1,
                    email2: this.state.email2
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            res.json();
            this.props.updateOff()
            this.props.fetchCustomer()
        })  
    }

    render() { 
        return ( 
                <Modal isOpen={true}>
                <ModalHeader>Update Customer</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.customerUpdate}>
                        <Label htmlFor="name">Customer Name</Label>
                        <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} value={this.state.name} name="name" placeholder="Required" type="text" required/>
                        <br />
                        <Label htmlFor="contact1">Primary Contact</Label>
                        <Input onChange={(e) => this.setState({contact1: e.target.value.toUpperCase()})} value={this.state.contact1} name="contact1" placeholder="Required" type="text" required/>
                        <br />
                        <Label htmlFor="email1">Primary Email</Label>
                        <Input onChange={(e) => this.setState({email1: e.target.value.toUpperCase()})} defaultValue={this.state.email1} name="email1" placeholder="Required" type="text" required/>
                        <br />
                        <Label htmlFor="contact2">Secondary Contact</Label>
                        <Input onChange={(e) => this.setState({contact2: e.target.value.toUpperCase()})} defaultValue={this.state.contact2} name="contact2" placeholder="Optional" type="text"/>
                        <br />
                        <Label htmlFor="email2">Secondary Email</Label>
                        <Input onChange={(e) => this.setState({email2: e.target.value.toUpperCase()})} defaultValue={this.state.email2} name="email2" placeholder="Optional" type="text" />
                        <br />
                        <Button type="submit">Save</Button>
                        <Button type="button" onClick={() => this.props.updateOff()}>Cancel</Button>
                    </Form>
                </ModalBody>
                </Modal>
         );
    }
}
 
export default CustomerSearch;