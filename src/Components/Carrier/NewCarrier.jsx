import React, { Component } from 'react';
import { Form, Label, Input, Button } from 'reactstrap';

import URL from '../../Helpers/Environment';

class NewCarrier extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }
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
                <Form onSubmit={this.handleFetch}>
                    <Label htmlFor="name">Carrier Name</Label>
                    <Input onChange={(e) => this.setState({name: e.target.value})} name="name" value={this.state.name.toLowerCase()} placeholder="Carrier Name" type="text"/>
                    <Button type="submit">Save</Button>
                </Form>
            </div>
         );
    }
}
 
export default NewCarrier;