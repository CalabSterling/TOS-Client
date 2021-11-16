import React, { Component } from 'react';
import { Input, Button, Form, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

import URL from '../../Helpers/Environment';

class OrderAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            status: '',
            equipment: '',
            sellRate: '',
            proNumber: '',
            pickupTime: '',
            orderId: '',
            carrierId: '', 
            orderAdminData: [],
            orderAdminToUpdate: [],
         }
         this.baseState = this.state
    }

    handleFetch = () => {
        fetch(`${URL}/orderadmin/create`, {
            method: 'POST',
            body: JSON.stringify({
                orderadmin:{
                    status: this.state.status,
                    equipment: this.state.equipment,
                    sellRate: this.state.sellRate,
                    proNumber: this.state.proNumber,
                    pickupTime: this.state.pickupTime,
                    orderId: this.props.orderToUpdate.id,
                    carrierId: this.state.carrierId,
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(this.props.adminOff())
        .catch((err) => console.log(err))
    }

    render() { 
        return ( 
                <Modal isOpen={true}>
                    <ModalHeader>Admin Order Update</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleFetch}>
                            <Label htmlFor="status">Status</Label>
                            <select onChange={(e) => this.setState({status: e.target.value.toUpperCase()})} name="status" placeholder="Required" required>
                                <option value="ASSIGNED">Assigned</option>
                                <option value="DISPATCHED">Dispatched</option>
                                <option value="LOADED">Loaded</option>
                                <option value="EMPTY">Empty</option>
                            </select>
                            <br />

                            <Label htmlFor="equipment">Equipment</Label>
                            <select onChange={(e) => this.setState({equipment: e.target.value.toUpperCase()})} name="equipment" placeholder="Required" required>
                                <option value="REEFER TRUCK">Reefer Truck</option>
                                <option value="DRY TRUCK">Dry Truck</option>
                                <option value="DRY VAN">Dry Van</option>
                                <option value="FLAT BED TRUCK">Flat Bed Truck</option>
                            </select>
                            <br />

                            <Label htmlFor="sellRate">Sell Rate</Label>
                            <Input onChange={(e) => this.setState({sellRate: e.target.value.toUpperCase()})} name="sellRate" placeholder="Required" step="0.01" type="number" value={this.state.sellRate} required/>
                            <br />

                            <Label htmlFor="proNumber">Pro Number</Label>
                            <Input onChange={(e) => this.setState({proNumber: e.target.value.toUpperCase()})} name="proNumber" placeholder="Required" type="text" value={this.state.proNumber} />
                            <br />

                            <Label htmlFor="pickupTime">Pick Up Time</Label>
                            <Input onChange={(e) => this.setState({pickupTime: e.target.value})} name="pickupTime" type="number" value={this.state.pickupTime} required/>
                            <br />

                            <Label htmlFor="carrierId">Carrier</Label>
                            <select onChange={(e) => this.setState({carrierId: e.target.value})} name="carrierId" required>
                                <option disabled></option>
                                {this.props.carrierData.map((option, index) => {
                                    return <option value={index}>{option.name}</option>
                                })}
                            </select>
                            <br />

                            <Button type="submit">Save</Button>
                            <Button type="button" color="danger" onClick={() => this.props.adminOff()}>Cancel</Button>
                        </Form>
                </ModalBody>
                </Modal>
         );
    }
}
 
export default OrderAdmin;