import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap';
import Modal from '../../Modal'

import URL from '../../Helpers/Environment';

class CustomerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customerData: [], 
            show: false,  
            customer: [],
            name: '',
            contact1: '',
            contact2: '',
            email1: '',
            email2: '', }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    fetchCustomer = (e) => {
        fetch(`${URL}/customer/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            this.setState({ customerData: data });
            console.log(this.state.customerData)
        })
        .catch((err) => console.log(err))
    }

    customerUpdate = (e) => {
        e.preventDefault();
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
            console.log(res);
            this.hideModal()
        })
    }

    componentDidMount() {
        this.fetchCustomer()
    }

    customerMapper() {
        return (this.state.customerData).map((customer, index) => {
            return(
                <div key={index}>
                    <h3>{customer.name}</h3>
                    <main>
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        <ModalHeader>Update Customer</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={this.customerUpdate}>
                                <Label htmlFor="name">Customer Name</Label>
                                <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} name="name" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="contact1">Primary Contact</Label>
                                <Input onChange={(e) => this.setState({contact1: e.target.value.toUpperCase()})} name="contact1" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="email1">Primary Email</Label>
                                <Input onChange={(e) => this.setState({email1: e.target.value.toUpperCase()})} name="email1" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="contact2">Secondary Contact</Label>
                                <Input onChange={(e) => this.setState({contact2: e.target.value.toUpperCase()})} name="name" placeholder="Optional" type="text"/>
                                <br />
                                <Label htmlFor="name">Secondary Email</Label>
                                <Input onChange={(e) => this.setState({email2: e.target.value.toUpperCase()})} name="name" placeholder="Optional" type="text" />
                                <br />
                                <Button type="submit">Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    </main>
                    <Button onClick={() => {this.showModal(); this.props.editCustomer(customer)}}>Update</Button>
                </div>
            )
        })
    }

    render() { 
        return ( 
            <div>
                {this.customerMapper()}
            </div>
         );
    }
}
 
export default CustomerSearch;