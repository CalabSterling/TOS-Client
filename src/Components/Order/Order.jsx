import React, { Component } from 'react';
import { Button, Form, Input, Label, ModalHeader, ModalBody } from 'reactstrap';
import Modal from '../../Modal';
//import OrderSearch from './OrderSearch';

import URL from '../../Helpers/Environment';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orderToUpdate: [], 
            siteData: [],
            show: false,
            pickupSite: '',
            dropoffSite: '',
            pickupDate: '',
            tempControl: false,
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
        this.setState({ [e.target.name]: e.target.value})
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

    editOrder = (order) => {
        this.setState({ orderToUpdate: order})
    }

    handleFetch = (e) => {
        e.preventDefault();
        fetch(`${URL}/order/create`, {
            method: 'POST',
            body: JSON.stringify({order:{
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

    fetchSite = (e) => {
        fetch(`${URL}/site/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            this.setState({ siteData: data });
        })
        .catch((err) => console.log(err))
    }

    componentDidMount() {
        this.fetchSite()
    }


    render() { 
        return ( 
                <div>
                <main>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <ModalHeader>Enter New Order</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleFetch}>
                                <Label htmlFor="pickupSite">Pickup Site</Label>
                                <select onChange={this.handleChange} name="pickupSite" placeholder="Required" required>
                                    {(this.state.siteData).map((option) => {
                                        return <option value={option.id}>{option.name}- {option.address}, {option.city}, {option.state} {option.zipCode}</option>
                                    })}
                                </select>
                                <br />
                                <Label htmlFor="dropoffSite">Drop Off Site</Label>
                                <select onChange={this.handleChange} name="dropoffSite" placeholder="Required" required>
                                    {(this.state.siteData).map((option) => {
                                        return <option value={option.id}>{option.name}- {option.address}, {option.city}, {option.state} {option.zipCode}</option>
                                    })}
                                </select>
                                <br />
                                <Label htmlFor="pickupDate">Pickup Date</Label>
                                <Input onChange={this.handleChange} name="pickupDate" placeholder="Required" type="date" value={this.state.pickupDate} required/>
                                <br />
                                <Label htmlFor="tempControl">Temperature Controlled</Label>
                                <select value={this.state.tempControl} onChange={this.handleChange} name="tempControl">
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                
                                {this.state.tempControl === 'true' ? <Input onChange={this.handleChange} name="tempSet" placeholder="Temperature °F" /> : null }
                                <Button type="submit" onClick={() => {this.hideModal()}}>Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </main>
                <Button onClick={() => {this.showModal()}}>New Order</Button>
                {/* <OrderSearch token={this.props.token} orderToUpdate={this.state.orderToUpdate} editOrder={this.editOrder} /> */}
            </div>
         );
    }
}
 
export default Order;