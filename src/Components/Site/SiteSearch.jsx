import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap';
import Modal from '../../Modal'

import URL from '../../Helpers/Environment';

class SiteSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            siteData: [], 
            show: false,  
            site: [],
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


    fetchSite = (e) => {
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
                    customerId: this.props.customerId
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
        this.fetchSite()
    }

    siteMapper() {
        return (this.state.siteData).map((site, index) => {
            return(
                <div key={index}>
                    <h3>{site.name}</h3>
                    <main>
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        <ModalHeader>Update Site</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={this.siteUpdate}>
                                <Label htmlFor="name">Site Name</Label>
                                <Input onChange={this.handleChange} name="name" placeholder="Required" type="text" defaultValue={this.props.siteToUpdate.name} required/>
                                <br />
                                <Label htmlFor="address">Address</Label>
                                <Input onChange={this.handleChange} name="address" placeholder="Required" type="text" defaultValue={this.props.siteToUpdate.address} required/>
                                <br />
                                <Label htmlFor="address2">Address Line 2</Label>
                                <Input onChange={this.handleChange} name="address2" placeholder="Optional" type="text" defaultValue={this.props.siteToUpdate.address2}/>
                                <br />
                                <Label htmlFor="city">City</Label>
                                <Input onChange={this.handleChange} name="city" placeholder="Required" type="text" defaultValue={this.props.siteToUpdate.city} required/>
                                <br />
                                <Label htmlFor="state">State</Label>
                                <Input onChange={this.handleChange} name="state" placeholder="Required" type="text" defaultValue={this.props.siteToUpdate.state} required/>
                                <br />
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input onChange={this.handleChange} name="zipCode" placeholder="Required" type="text" defaultValue={this.props.siteToUpdate.zipCode} required/>
                                <br />
                                <Button type="submit">Save</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    </main>
                    <Button onClick={() => {this.showModal(); this.props.editSite(site)}}>Update</Button>
                </div>
            )
        })
    }

    render() { 
        return ( 
            <div>
                {this.siteMapper()}
            </div>
         );
    }
}
 
export default SiteSearch;