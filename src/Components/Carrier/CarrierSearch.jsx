import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap';
import Modal from '../../Modal'

import URL from '../../Helpers/Environment';

class CarrierSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { carrierData: [], show: false, name: '', carrier: [] }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    fetchCarrier = (e) => {
        fetch(`${URL}/carrier/select`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then((data) => {
            this.setState({ carrierData: data })
        })
        .catch((err) => console.log(err))
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
            this.hideModal()
        })
    }

    componentDidMount() {
        this.fetchCarrier()
    }

    carrierMapper() {
        return (this.state.carrierData).map((carrier, index) => {
            return(
                <div key={index}>
                    <h3>{carrier.name}</h3>
                    <main>
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        <ModalHeader>Update Carrier</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.carrierUpdate}>
                                <Label htmlFor="name">Carrier Name</Label>
                                <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} name="name" placeholder="Carrier Name" type="text" defaultValue={this.props.carrierToUpdate.name} required/>
                                <Button type="submit" onClick={() => {this.hideModal()}}>Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    </main>
                    <Button onClick={() => {this.showModal(); this.props.editCarrier(carrier)}}>Update</Button>
                </div>
            )
        })
    }

    render() { 
        return ( 
            <div>
                {this.carrierMapper()}
            </div>
         );
    }
}
 
export default CarrierSearch;