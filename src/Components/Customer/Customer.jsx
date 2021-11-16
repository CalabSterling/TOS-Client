import React, { Component } from 'react';
import { Button, Form, Label, Input, ModalHeader, ModalBody, Modal, Card, CardTitle, CardBody } from 'reactstrap';
import CustomerSearch from './CustomerSearch';

import URL from '../../Helpers/Environment';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customerToUpdate: [], 
            customerData: [],
            updateActive: false,
            createCustomerActive: false,
            name: '',
            contact1: '',
            contact2: '',
            email1: '',
            email2: '',
         }
         this.baseState = this.state
    }


    createCustomerOn = () => {this.setState({ createCustomerActive : true })}
    createCustomerOff = () => {this.setState({ createCustomerActive: false })}
    updateOn = () => {this.setState({ updateActive: true })}
    updateOff = () => {this.setState({ updateActive: false })}

    fetchCustomer = () => {
        fetch(`${URL}/customer/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            this.setState({ customerData: data });
        })
        .catch((err) => console.log(err))
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
        .then(this.fetchCustomer())
        .then(this.setState(this.baseState))
        .catch((err) => console.log(err))
    }

    deleteCustomer = (customer) => {
        fetch(`${URL}/customer/${customer.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token
            }),
        }).then((res) => console.log(res))
        .then(this.fetchCustomer())
    }

    componentDidMount() {
        this.fetchCustomer()
    }

    customerMapper() {
        return(this.state.customerData.map((customer, index) => {
            return (
                <Card key={index}>
                    <CardTitle>{customer.name}</CardTitle>
                    <CardBody>
                    <Button type="button" onClick={() => {this.updateOn(); this.setState({ customerToUpdate: customer }) }}>Update</Button>
                    <Button type="button" color="danger" onClick={() => {this.deleteCustomer(customer)}}>Delete</Button>
                    </CardBody>
                </Card>
            )
        }))
    }

    render() { 
        return ( 
                <div>
                    <Button onClick={() => {this.createCustomerOn()}}>New Customer</Button>
                        <Modal isOpen={this.state.createCustomerActive}>
                            <ModalHeader><h3>Enter New Customer</h3></ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleFetch}>
                                    <Label htmlFor="name">Customer Name</Label>
                                    <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} name="name" placeholder="Required" type="text" value={this.state.name} required/>
                                    <br />
                                    <Label htmlFor="contact1">Primary Contact</Label>
                                    <Input onChange={(e) => this.setState({contact1: e.target.value.toUpperCase()})} name="contact1" placeholder="Required" type="text" value={this.state.contact1} required/>
                                    <br />
                                    <Label htmlFor="email1">Primary Email</Label>
                                    <Input onChange={(e) => this.setState({email1: e.target.value.toUpperCase()})} name="email1" placeholder="Required" type="text" value={this.state.email1} required/>
                                    <br />
                                    <Label htmlFor="contact2">Secondary Contact</Label>
                                    <Input onChange={(e) => this.setState({contact2: e.target.value.toUpperCase()})} name="contact2" placeholder="Optional" type="text" value={this.state.contact2}/>
                                    <br />
                                    <Label htmlFor="email2">Secondary Email</Label>
                                    <Input onChange={(e) => this.setState({email2: e.target.value.toUpperCase()})} name="email2" placeholder="Optional" type="text" value={this.state.email2}/>
                                    <br />
                                    <Button type="submit" onClick={() => {this.createCustomerOff()}}>Save</Button>
                                    <Button type="button" onClick={() => {this.createCustomerOff()}}>Cancel</Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                    {this.customerMapper()}
                    {this.state.updateActive ? <CustomerSearch token={this.props.token} role={this.props.role} updateActive={this.state.updateActive} updateOn={this.updateOn} updateOff={this.updateOff} customerToUpdate={this.state.customerToUpdate} fetchCustomer={this.fetchCustomer} /> : null }
            </div>
         );
    }
}
 
export default Customer;