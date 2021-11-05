import React, { Component } from 'react';
import { Button, Form, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import Modal from '../../Modal';
import CustomerSearch from './CustomerSearch';

import URL from '../../Helpers/Environment';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customerToUpdate: [], 
            show: false,
            name: '',
            contact1: '',
            contact2: '',
            email1: '',
            email2: '',
         }
         this.showModal = this.showModal.bind(this);
         this.hideModal = this.hideModal.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.submitForm = this.submitForm.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value.toUpperCase()})
    }

    submitForm() {
        console.log(this.state)
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    editCustomer = (customer) => {
        this.setState({ customerToUpdate: customer})
    }

    handleFetch = (e) => {
        e.preventDefault();
        fetch(`${URL}/customer/create`, {
            method: 'POST',
            body: JSON.stringify({customer:{
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
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch((err) => console.log(err))
    }

    render() { 
        return ( 
                <div>
                <main>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <ModalHeader>Enter New Customer</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleFetch}>
                                <Label htmlFor="name">Customer Name</Label>
                                <Input onChange={this.handleChange} name="name" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="contact1">Primary Contact</Label>
                                <Input onChange={this.handleChange} name="contact1" placeholder="Required" type="text" value={this.state.contact1} required/>
                                <br />
                                <Label htmlFor="email1">Primary Email</Label>
                                <Input onChange={this.handleChange} name="email1" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="contact2">Secondary Contact</Label>
                                <Input onChange={this.handleChange} name="contact2" placeholder="Optional" type="text"/>
                                <br />
                                <Label htmlFor="email2">Secondary Email</Label>
                                <Input onChange={this.handleChange} name="email2" placeholder="Optional" type="text" />
                                <br />
                                <Button type="submit" onClick={() => {this.hideModal()}}>Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </main>
                <Button onClick={() => {this.showModal()}}>New Customer</Button>
                <CustomerSearch token={this.props.token} customerToUpdate={this.state.customerToUpdate} editCustomer={this.editCustomer} />
            </div>
         );
    }
}
 
export default Customer;