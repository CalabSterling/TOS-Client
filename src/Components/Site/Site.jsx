import React, { Component } from 'react';
import { Button, Form, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import Modal from '../../Modal';
import SiteSearch from './SiteSearch';

import URL from '../../Helpers/Environment';

class Site extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            siteToUpdate: [], 
            show: false,
            name: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
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

    editSite = (site) => {
        this.setState({ siteToUpdate: site })
    }

    handleFetch = (e) => {
        e.preventDefault();
        fetch(`${URL}/site/create`, {
            method: 'POST',
            body: JSON.stringify({site:{
                name: this.state.name,
                address: this.state.address,
                address2: this.state.address2,
                city: this.state.city,
                state: this.state.state,
                zipCode: this.state.zipCode,
                customerId: this.props.customerId
            }}),
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
                        <ModalHeader>Enter New Site</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleFetch}>
                                <Label htmlFor="name">Site Name</Label>
                                <Input onChange={this.handleChange} name="name" placeholder="Required" type="text" required/>
                                <br />
                                <Label htmlFor="address">Address</Label>
                                <Input onChange={this.handleChange} name="address" placeholder="Required" type="text" value={this.state.address} required/>
                                <br />
                                <Label htmlFor="address2">Address Line 2</Label>
                                <Input onChange={this.handleChange} name="address2" placeholder="Optional" type="text" value={this.state.address2}/>
                                <br />
                                <Label htmlFor="city">City</Label>
                                <Input onChange={this.handleChange} name="city" placeholder="Optional" type="text" value={this.state.city} required/>
                                <br />
                                <Label htmlFor="state">State</Label>
                                <Input onChange={this.handleChange} name="state" placeholder="Required" type="text" value={this.state.state} required/>
                                <br />
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input onChange={this.handleChange} name="zipCode" placeholder="Required" type="text" value={this.state.zipCode} required/>
                                <br />
                                <Button type="submit" onClick={() => {this.hideModal()}}>Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </main>
                <Button onClick={() => {this.showModal()}}>New Site</Button>
                <SiteSearch token={this.props.token} siteToUpdate={this.state.siteToUpdate} editSite={this.editSite} customerId={this.props.customerId} />
            </div>
         );
    }
}
 
export default Site;