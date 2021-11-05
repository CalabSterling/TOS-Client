import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap';
import Modal from '../../Modal'

import URL from '../../Helpers/Environment';

class OrderSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orderData: [], 
            show: false,  
            order: [],
            pickupSite: '',
            dropoffSite: '',
            pickupDate: '',
            tempControl: '',
            orderNumber: '',
            referenceNumber: '',
            palletCount: '',
            weight: '',
            tempSet: '',
            customerId: '',
            status: '',
            equipment: '',
            sellRate: '',
            proNumber: '',
            pickupTime: '',
            orderId: '',
            carrierId: '', 
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


    fetchOrder = (e) => {
        fetch(`${URL}/order/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            this.setState({ orderData: data });
        })
        .catch((err) => console.log(err))
    }

    orderUpdate = (e) => {
        e.preventDefault();
        fetch(`${URL}/order/update/${this.props.orderToUpdate.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                order: {
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
        this.fetchOrder()
    }

    orderMapper() {
        return (this.state.orderData).map((order, index) => {
            console.log(order.name)
            return(
                <div key={index}>
                    <h3>{order.name}</h3>
                    <main>
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        <ModalHeader>Update Order</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={this.orderUpdate}>
                                <Label htmlFor="name">Order Name</Label>
                                <Input onChange={this.handleChange} defaultValue={this.props.orderToUpdate.name} name="name" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="contact1">Primary Contact</Label>
                                <Input onChange={this.handleChange} defaultValue={this.props.orderToUpdate.contact1} name="contact1" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="email1">Primary Email</Label>
                                <Input onChange={this.handleChange} defaultValue={this.props.orderToUpdate.email1} name="email1" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="contact2">Secondary Contact</Label>
                                <Input onChange={this.handleChange} defaultValue={this.props.orderToUpdate.contact2} name="contact2" placeholder="Optional" type="text"/>
                                <br />
                                <Label htmlFor="email2">Secondary Email</Label>
                                <Input onChange={this.handleChange} defaultValue={this.props.orderToUpdate.email2} name="email2" placeholder="Optional" type="text" />
                                <br />
                                <Button type="submit">Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    </main>
                    <Button onClick={() => {this.showModal(); this.props.editOrder(order)}}>Update</Button>
                </div>
            )
        })
    }

    render() { 
        return ( 
            <div>
                {this.orderMapper()}
            </div>
         );
    }
}
 
export default OrderSearch;