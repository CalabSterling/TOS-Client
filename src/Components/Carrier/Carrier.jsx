import React, { Component } from 'react'
import NewCarrier from './NewCarrier';
import CarrierSearch from './CarrierSearch';
import CarrierUpdate from './CarrierUpdate';

class Carrier extends Component {
    constructor(props) {
        super(props);
        this.state = { updateCarrier: false, carrierToUpdate: [] }
    }

    updateOn = () => {
        this.setState({ updateCarrier: true })
    }

    updateOff = () => {
        this.setState({ updateCarrier: false })
    }

    editCarrier = (carrier) => {
        this.setState({ carrierToUpdate: carrier })
        console.log(this.state.carrierToUpdate)
    }

    render() { 
        return ( 
            <div>
                <NewCarrier token={this.props.token} />
                <CarrierSearch token={this.props.token} updateOn={this.updateOn} editCarrier={this.editCarrier} />
                {this.state.updateCarrier ? <CarrierUpdate token={this.props.token} updateOff={this.updateOff} carrierToUpdate={this.state.carrierToUpdate} />: <></>}
            </div>
         );
    }
}
 
export default Carrier;