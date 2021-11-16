import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Modal, Label, Input, Form } from 'reactstrap';

import URL from '../../Helpers/Environment';

class CarrierSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: this.props.carrierToUpdate.name, 
        }
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
            this.props.fetchCarrier()
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
                                <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} name="name" placeholder="Carrier Name" type="text" value={this.state.name} required/>
                                <Button type="submit">Save</Button>
                                <Button type="button" onClick={this.props.updateOff}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
            </div>
         );
    }
}
 
export default CarrierSearch;