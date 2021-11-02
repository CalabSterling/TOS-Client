import React, { Component } from 'react';
import { Button } from 'reactstrap';

import URL from '../../Helpers/Environment';

class CarrierSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { carrierData: [] }
    }

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

    componentDidMount() {
        this.fetchCarrier()
    }

    carrierMapper() {
        return (this.state.carrierData).map((carrier, index) => {
            return(
                <div key={index}>
                    <h3>{carrier.name}</h3>
                    <Button onClick={() => {this.props.editCarrier(carrier); this.props.updateOn()}}>Update</Button>
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