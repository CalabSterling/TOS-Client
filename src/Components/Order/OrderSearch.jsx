import React, { Component } from 'react';
import { Button, Form, Input, Label, ModalHeader, ModalBody, Modal } from 'reactstrap';

import URL from '../../Helpers/Environment';

class OrderSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            siteData: [],
            pickupSite: this.props.orderToUpdate.pickupSite,
            dropoffSite: this.props.orderToUpdate.dropoffSite,
            pickupDate: this.props.orderToUpdate.pickupDate,
            tempControl: this.props.orderToUpdate.tempControl,
            orderNumber: this.props.orderToUpdate.orderNumber,
            referenceNumber: this.props.orderToUpdate.referenceNumber,
            palletCount: this.props.orderToUpdate.palletCount,
            weight: this.props.orderToUpdate.weight,
            tempSet: this.props.orderToUpdate.tempSet,
         }
         this.baseState = this.state
    }

    fetchSite = () => {
        fetch(`${URL}/site/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            this.setState({ siteData: data })
            console.log(this.state.siteData);
        })
        .catch((err) => console.log(err))
    }

    orderUpdate = (e) => {
        e.preventDefault();
        fetch(`${URL}/order/update/${this.props.orderToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                order:{
                    pickupSite: this.state.pickupSite,
                    dropoffSite: this.state.dropoffSite,
                    pickupDate: this.state.pickupDate,
                    tempControl: this.state.tempControl,
                    orderNumber: this.state.orderNumber,
                    referenceNumber: this.state.referenceNumber,
                    palletCount: this.state.palletCount,
                    weight: this.state.weight,
                    tempSet: this.state.tempSet,
                    customerId: this.props.customerId,
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            this.props.updateOff()
            this.props.fetchOrder()
        })
    }

    componentDidMount() {
        this.fetchSite()
    }

    render() {
        return(
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>Update Order</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.orderUpdate}>
                                <Label htmlFor="referenceNumber">Reference Number</Label>
                                <Input onChange={(e) => this.setState({referenceNumber: e.target.value.toUpperCase()})} name="referenceNumber" placeholder="Required" type="text" value={this.state.referenceNumber} required/>
                                <br />

                                <Label htmlFor="orderNumber">Order Number</Label>
                                <Input onChange={(e) => this.setState({orderNumber: e.target.value.toUpperCase()})} name="orderNumber" placeholder="Required" type="text" value={this.state.orderNumber} required/>
                                <br />

                                <Label htmlFor="pickupSite">Pickup Site</Label>
                                <select onChange={(e) => this.setState({pickupSite: e.target.value})} name="pickupSite" placeholder="Required" value={this.state.pickupSite} required>
                                    {(this.state.siteData).map((option, index) => {
                                        return <option value={index}>{option.name}- {option.address}, {option.city}, {option.state} {option.zipCode}</option>
                                    })}
                                </select>
                                <br />

                                <Label htmlFor="dropoffSite">Drop Off Site</Label>
                                <select onChange={(e) => this.setState({dropoffSite: e.target.value})} name="dropoffSite" placeholder="Required" value={this.state.dropoffSite} required>
                                    {(this.state.siteData).map((option, index) => {
                                        return <option value={index} >{option.name}- {option.address}, {option.city}, {option.state} {option.zipCode}</option>
                                    })}
                                </select>
                                <br />

                                <Label htmlFor="pickupDate">Pickup Date</Label>
                                <Input onChange={(e) => this.setState({pickupDate: e.target.value})} name="pickupDate" type="date" value={this.state.pickupDate} required/>
                                <br />

                                <Label htmlFor="tempControl">Temperature Controlled</Label>
                                <select value={this.state.tempControl} onChange={(e) => this.setState({tempControl: e.target.value})} name="tempControl" required>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                
                                {this.state.tempControl === 'true' ? <Input onChange={(e) => this.setState({name: e.target.value})} name="tempSet" placeholder="Temperature °F" value={this.state.tempSet} /> : null }
                                <br />

                                <Label htmlFor="palletCount">Pallet Count</Label>
                                <Input onChange={(e) => this.setState({palletCount: e.target.value})} name="palletCount" placeholder="Required" type="number" value={parseInt(this.state.palletCount)} required/>
                                <br />

                                <Label htmlFor="weight">Weight</Label>
                                <Input onChange={(e) => this.setState({weight: e.target.value})} name="weight" placeholder="Optional" type="number" value={parseInt(this.state.weight)}/>
                                <br />

                                <Button type="submit">Save</Button>
                                <Button type="button" onClick={() => this.props.updateOff()}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
 
export default OrderSearch;