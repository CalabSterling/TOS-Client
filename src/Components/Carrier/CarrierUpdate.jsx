import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Form, Label, Input, Button } from 'reactstrap'

import URL from '../../Helpers/Environment';

class CarrierUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }
    }

    carrierUpdate = (e) => {
        e.preventDefault();
        fetch(`${URL}/carrier/update/${this.props.carrierToUpdate.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                carrier: {
                    name: this.state.name,
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            console.log(res);
            this.props.updateOff()
        })
    }

    render() { 
        return ( 
            <div>
                <Modal isOpen={true}>
                <ModalHeader>Update Carrier</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.carrierUpdate}>
                        <Label htmlFor="name">Carrier Name</Label>
                        <Input onChange={(e) => this.setState({name: e.target.value})} name="name" value={this.state.name.toUpperCase()} placeholder="Carrier Name" type="text"/>
                        <Button type="submit">Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
         );
    }
}
 
export default CarrierUpdate;

