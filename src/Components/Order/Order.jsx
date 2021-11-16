import React, { Component } from 'react';
import { Button, Form, Input, Label, ModalHeader, ModalBody, Modal, Card, CardBody, CardTitle } from 'reactstrap';
import OrderAdmin from './OrderAdmin';
import OrderSearch from './OrderSearch';

import URL from '../../Helpers/Environment';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orderData: [], 
            siteData: [],
            carrierData: [],
            orderToUpdate: [],
            updateActive: false,
            createActive: false,
            adminActive: false,
            pickupSite: '',
            dropoffSite: '',
            pickupDate: '',
            tempControl: false,
            orderNumber: '',
            referenceNumber: '',
            palletCount: 0,
            weight: 0,
            tempSet: 0, 
            orderAdminData: [],
            orderAdminToUpdate: [],
         }
         this.baseState = this.state
    }

    createOn = () => {this.setState({ createActive : true })}
    createOff = () => {this.setState({ createActive: false })}
    updateOn = () => {this.setState({ updateActive: true })}
    updateOff = () => {this.setState({ updateActive: false })}
    adminOn = () => {this.setState({ adminActive : true })}
    adminOff = () => {this.setState({ adminActive : false })}

    fetchOrder = () => {
        fetch(`${URL}/order/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            this.setState({ orderData: data })
        })
        .catch((err) => console.log(err))
    }

    fetchOrderAdmin = () => {
        fetch(`${URL}/orderadmin/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            this.setState({ orderAdminData: data})
        })
        .catch((err) => console.log(err))
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
            this.setState({ siteData: data });
        })
        .catch((err) => console.log(err))
    }

    fetchCarrier = () => {
        fetch(`${URL}/carrier/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            this.setState({ carrierData: data })
        })
        .catch((err) => console.log(err))
    }

    handleFetch = () => {
        fetch(`${URL}/order/create`, {
            method: 'POST',
            body: JSON.stringify({order:{
                pickupSite: this.state.pickupSite,
                dropoffSite: this.state.dropoffSite,
                pickupDate: this.state.pickupDate,
                tempControl: this.state.tempControl,
                orderNumber: this.state.orderNumber,
                referenceNumber: this.state.referenceNumber,
                palletCount: this.state.palletCount,
                weight: this.state.weight,
                tempSet: this.state.tempSet,
                customerId: this.props.customerId
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(this.fetchOrder())
        .then(this.setState(this.baseState))
        .catch((err) => console.log(err))
    }

    deleteOrder = (order) => {
        fetch(`${URL}/order/${order.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token
            }),
        }).then((res) => console.log(res))
        .then(this.fetchOrder())
    }

    componentDidMount() {
        this.fetchOrder();
        this.fetchSite();
        this.fetchCarrier();
        this.fetchOrderAdmin()
    }

    orderMapper() {
        return(this.state.orderData.map((order, index) => {
            return (
                <Card key={index}>
                    <CardTitle>{order.orderNumber}</CardTitle>
                    <CardBody>
                    <Button type="button" onClick={() => {this.updateOn(); this.setState({ orderToUpdate: order })}}>Update</Button>
                    <Button type="button" color="danger" onClick={() => {this.deleteOrder(order)}}>Delete</Button>
                    {localStorage.getItem('role') === 'admin' ? <Button type="button" color="info" onClick={() => {this.adminOn(); this.setState({ orderToUpdate: order })}}>Admin</Button> : null}
                    </CardBody>
                </Card>
            )
        }))
    }

    render() { 
        return ( 
            <div>
                <Button onClick={() => {this.createOn()}}>New Order</Button>
                    <Modal isOpen={this.state.createActive}>
                        <ModalHeader>Enter New Order</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleFetch}>
                                <Label htmlFor="referenceNumber">Reference Number</Label>
                                <Input onChange={(e) => this.setState({referenceNumber: e.target.value.toUpperCase()})} name="referenceNumber" placeholder="Required" type="text" value={this.state.referenceNumber} required/>
                                <br />

                                <Label htmlFor="orderNumber">Order Number</Label>
                                <Input onChange={(e) => this.setState({orderNumber: e.target.value.toUpperCase()})} name="orderNumber" placeholder="Required" type="text" value={this.state.orderNumber} required/>
                                <br />

                                <Label htmlFor="pickupSite">Pickup Site</Label>
                                <select onChange={(e) => this.setState({pickupSite: e.target.value.toUpperCase()})} name="pickupSite" placeholder="Required" required>
                                    {(this.state.siteData).map((option) => {
                                        return <option value={parseInt(option.id)}>{option.name}- {option.address}, {option.city}, {option.state} {option.zipCode}</option>
                                    })}
                                </select>
                                <br />

                                <Label htmlFor="dropoffSite">Drop Off Site</Label>
                                <select onChange={(e) => this.setState({dropoffSite: e.target.value.toUpperCase()})} name="dropoffSite" placeholder="Required" required>
                                    {(this.state.siteData).map((option) => {
                                        return <option value={parseInt(option.id)}>{option.name}- {option.address}, {option.city}, {option.state} {option.zipCode}</option>
                                    })}
                                </select>
                                <br />

                                <Label htmlFor="pickupDate">Pickup Date</Label>
                                <Input onChange={(e) => this.setState({pickupDate: e.target.value.toUpperCase()})} name="pickupDate" placeholder="Required" type="date" value={this.state.pickupDate} required/>
                                <br />

                                <Label htmlFor="tempControl">Temperature Controlled</Label>
                                <select value={this.state.tempControl} onChange={(e) => this.setState({tempControl: e.target.value.toUpperCase()})} name="tempControl" required>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                
                                {this.state.tempControl === 'true' ? <Input onChange={(e) => this.setState({tempControl: e.target.value.toUpperCase()})} name="tempSet" placeholder="Temperature °F" value={parseInt(this.state.tempSet)} defaultValue={0} /> : null }
                                <br />

                                <Label htmlFor="palletCount">Pallet Count</Label>
                                <Input onChange={(e) => this.setState({palletCount: e.target.value.toUpperCase()})} name="palletCount" placeholder="Required" type="number" value={parseInt(this.state.palletCount)} required/>
                                <br />

                                <Label htmlFor="weight">Weight</Label>
                                <Input onChange={(e) => this.setState({weight: e.target.value.toUpperCase()})} name="weight" placeholder="Optional" type="number" value={parseInt(this.state.weight)}/>
                                <br />

                                <Button type="submit" onClick={() => this.handleFetch()}>Save</Button>
                                <Button type="button" color="danger" onClick={() => this.createOff()}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>

                {this.orderMapper()}

                { this.state.updateActive ? <OrderSearch token={this.props.token} orderToUpdate={this.state.orderToUpdate}  customerId={this.props.customerId} updateActive={this.state.updateActive} updateOn={this.updateOn} updateOff={this.updateOff} fetchOrder={this.fetchOrder} /> : null }

                {this.state.adminActive ? <OrderAdmin token={this.props.token} orderToUpdate={this.state.orderToUpdate} customerId={this.props.customerId} adminOff={this.adminOff} fetchOrder={this.fetchOrder} carrierData={this.state.carrierData} /> : null}
            </div>
         );
    }
}
 
export default Order;