import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Modal, Label, Input, Form } from 'reactstrap';

import URL from '../../Helpers/Environment';

class SiteSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: this.props.siteToUpdate.name,
            address: this.props.siteToUpdate.address,
            address2: this.props.siteToUpdate.address2,
            city: this.props.siteToUpdate.city,
            state: this.props.siteToUpdate.state,
            zipCode: this.props.siteToUpdate.zipCode,
        }
    }

    siteUpdate = (e) => {
        e.preventDefault();
        fetch(`${URL}/site/update/${this.props.siteToUpdate.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                site: {
                    name: this.state.name,
                    address: this.state.address,
                    address2: this.state.address2,
                    city: this.state.city,
                    state: this.state.state,
                    zipCode: this.state.zipCode,
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            console.log(res);
            this.props.updateOff()
            this.props.fetchSite()
        })
    }

    render() { 
        return ( 
            <div>
                <Modal isOpen={true}>
                        <ModalHeader>Update Site</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={this.siteUpdate}>
                                <Label htmlFor="name">Site Name</Label>
                                <Input onChange={(e) => this.setState({name: e.target.value.toUpperCase()})} name="name" placeholder="Required" type="text" value={this.state.name} required/>
                                <br />
                                <Label htmlFor="address">Address</Label>
                                <Input onChange={(e) => this.setState({address: e.target.value.toUpperCase()})} name="address" placeholder="Required" type="text" value={this.state.address} required/>
                                <br />
                                <Label htmlFor="address2">Address Line 2</Label>
                                <Input onChange={(e) => this.setState({address2: e.target.value.toUpperCase()})} name="address2" placeholder="Optional" type="text" value={this.state.address2}/>
                                <br />
                                <Label htmlFor="city">City</Label>
                                <Input onChange={(e) => this.setState({city: e.target.value.toUpperCase()})} name="city" placeholder="Required" type="text" value={this.state.city} required/>
                                <br />
                                <Label htmlFor="state">State</Label>
                                <Input onChange={(e) => this.setState({state: e.target.value.toUpperCase()})} name="state" placeholder="Required" type="text" value={this.state.state} required/>
                                <br />
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input onChange={(e) => this.setState({zipCode: e.target.value.toUpperCase()})} name="zipCode" placeholder="Required" type="text" value={this.state.zipCode} required/>
                                <br />
                                <Button type="submit">Save</Button>
                                <Button type="button" onClick={() => this.props.updateOff()}>Cancel</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
            </div>
         );
    }
}
 
export default SiteSearch;