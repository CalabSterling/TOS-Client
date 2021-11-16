import React, { Component } from 'react';
import { Button, Form, Label, Input, ModalHeader, ModalBody, Modal, Card, CardBody, CardTitle } from 'reactstrap';
import CarrierSearch from './CarrierSearch';

import URL from '../../Helpers/Environment';

class Carrier extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            carrierToUpdate: [], 
            carrierData: [],
            updateActive: false,
            createActive: false,
            name: '',
         }
         this.baseState = this.state
    }

    createOn = () => {this.setState({ createActive : true })}
    createOff = () => {this.setState({ createActive: false })}
    updateOn = () => {this.setState({ updateActive: true })}
    updateOff = () => {this.setState({ updateActive: false })}

    fetchCarrier = () => {
        fetch(`${URL}/carrier/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            this.setState({ carrierData: data });
        })
        .catch((err) => console.log(err))
    }

    handleFetch = (e) => {
        e.preventDefault();
        fetch(`${URL}/carrier/create`, {
            method: 'POST',
            body: JSON.stringify({carrier:{
                name: this.state.name,
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(this.fetchCarrier())
        .then(this.setState(this.baseState))
        .catch((err) => console.log(err))
    }

    componentDidMount() {
        this.fetchCarrier()
    }

    deleteCarrier = (carrier) => {
        fetch(`${URL}/carrier/${carrier.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token
            }),
        }).then((res) => console.log(res))
        .then(this.fetchCarrier())
    }

    carrierMapper() {
        return(this.state.carrierData.sort().map((carrier, index) => {
            return (
                <Card key={index}>
                    <CardTitle>{carrier.name}</CardTitle>
                    <CardBody>
                    <Button type="button" onClick={() => {this.updateOn(); this.setState({ carrierToUpdate: carrier }) }}>Update</Button>
                    <Button type="button" color="danger" onClick={() => {this.deleteCarrier(carrier)}}>Delete</Button>
                    </CardBody>
                </Card>
            )
        }))
    }

    render() { 
        return ( 
                <div>
                    <Button onClick={() => {this.createOn()}}>New Carrier</Button>
                        <Modal isOpen={this.state.createActive}>
                            <ModalHeader><h3>Enter New Carrier</h3></ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleFetch}>
                                    <Label htmlFor="name">Carrier Name</Label>
                                    <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} value={this.state.name} name="name" placeholder="Required" type="text" required/>
                                    <br />
                                    <Button type="submit" onClick={() => {this.createOff()}}>Save</Button>
                                    <Button type="button" onClick={() => {this.createOff()}}>Cancel</Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                    {this.carrierMapper()}
                    {this.state.updateActive ? <CarrierSearch token={this.props.token} role={this.props.role} updateActive={this.state.updateActive} updateOn={this.updateOn} updateOff={this.updateOff} carrierToUpdate={this.state.carrierToUpdate} fetchCarrier={this.fetchCarrier} /> : null }
            </div>
         );
    }
}
 
export default Carrier;