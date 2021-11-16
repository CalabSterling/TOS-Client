import React, { Component } from 'react';
import { Button, Form, Label, Input, ModalHeader, ModalBody, Modal, Card, CardTitle, CardBody } from 'reactstrap';
import SiteSearch from './SiteSearch';

import URL from '../../Helpers/Environment';

class Site extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            siteData: [],
            siteToUpdate: [], 
            createActive: false,
            updateActive: false,
            name: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
         }
         this.baseState = this.state
    }

    createOn = () => {this.setState({ createActive : true })}
    createOff = () => {this.setState({ createActive: false })}
    updateOn = () => {this.setState({ updateActive: true })}
    updateOff = () => {this.setState({ updateActive: false })}

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
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(this.createOff())
        .then(this.fetchSite())
        .then(this.setState(this.baseState))
        .catch((err) => console.log(err))
    }

    deleteSite = (site) => {
        fetch(`${URL}/site/${site.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token
            })
        }).then(res => console.log(res))
        .then(this.fetchSite())
    }

    componentDidMount() {
        this.fetchSite()
    }

    siteMapper() {
        return(this.state.siteData.map((site, index) => {
            return(
                <Card key={index}>
                    <CardTitle>{site.name}</CardTitle>
                    <CardBody>
                        <Button type="button" onClick={() => {this.updateOn(); this.setState({ siteToUpdate: site }) }}>Update</Button>
                        <Button type="button" color="danger" onClick={() => {this.deleteSite(site)}}>Delete</Button>
                    </CardBody>
                </Card>
            )
        }))
    }

    render() { 
        return ( 
            <div>
                <Button onClick={this.createOn}>New Site</Button>
                <Modal isOpen={this.state.createActive}>
                    <ModalHeader>Enter New Site</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleFetch}>
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
                                <Input onChange={(e) => this.setState({city: e.target.value.toUpperCase()})} name="city" placeholder="Optional" type="text" value={this.state.city} required/>
                                <br />
                                <Label htmlFor="state">State</Label>
                                <Input onChange={(e) => this.setState({state: e.target.value.toUpperCase()})} name="state" placeholder="Required" type="text" value={this.state.state} required/>
                                <br />
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input onChange={(e) => this.setState({zipCode: e.target.value.toUpperCase()})} name="zipCode" placeholder="Required" type="text" value={this.state.zipCode} required/>
                                <br />
                                <Button type="submit">Save</Button>
                                <Button type="button" onClick={() => this.createOff()}>Cancel</Button>
                        </Form>
                    </ModalBody>
                 </Modal>
                {this.siteMapper()}
                {this.state.updateActive ? <SiteSearch token={this.props.token} siteToUpdate={this.state.siteToUpdate} customerId={this.props.customerId} updateOff={this.updateOff} fetchSite={this.fetchSite} /> : null }
            </div>
         );
    }
}
 
export default Site;