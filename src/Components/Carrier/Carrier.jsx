import React, { Component } from 'react';
import { Button, Form, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import Modal from '../../Modal';
import CarrierSearch from './CarrierSearch';

import URL from '../../Helpers/Environment';

class Carrier extends Component {
    constructor(props) {
        super(props);
        this.state = { carrierToUpdate: [], show: false, name: '' }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
        console.log(this.state.show)
    };

    hideModal = () => {
        this.setState({ show: false });
        console.log('hi from hide')
    };

    editCarrier = (carrier) => {
        this.setState({ carrierToUpdate: carrier })
    }

    handleFetch = (e) => {
        fetch(`${URL}/carrier/create`, {
            method: 'POST',
            body: JSON.stringify({carrier:{name: this.state.name}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch((err) => console.log(err))
    }

    render() { 
        return ( 
            <div>
                <main>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <ModalHeader>Enter New Carrier</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleFetch}>
                                <Label htmlFor="name">Carrier Name</Label>
                                <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} name="name" placeholder="Carrier Name" type="text"/>
                                <Button type="submit" onClick={() => {this.hideModal()}}>Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </main>
                <Button onClick={() => {this.showModal()}}>New Carrier</Button>
                <CarrierSearch token={this.props.token} carrierToUpdate={this.state.carrierToUpdate} editCarrier={this.editCarrier} />
            </div>
         );
    }
}
 
export default Carrier;