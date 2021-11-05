import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import styled from 'styled-components';
import Home from './Home'
import Carrier from './Carrier/Carrier'
import Customer from './Customer/Customer'
import Order from './Order/Order'
import Site from './Site/Site'

class Sitebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: ''}
    }

    toggle = () => {
        let newIsOpen = !this.state.isOpen;
        this.setState(newIsOpen)
    }

    render() {
        return (
            
            <div className="sidebar">
                <Router>
                <div className="sidebar-list-styling">
                    <ul className="sidebar-list list-unstyled">
                        <li><Link to="/Home">Home</Link></li>
                        {this.props.role === 'admin' ? <li><Link to="/Carrier">Carrier</Link></li> : <></>}
                        {this.props.role === 'admin' ? <li><Link to="/Customer">Customer</Link></li> : <></>}
                        <li><Link to="/Order">Order</Link></li>
                        <li><Link to="/Site">Site</Link></li>
                    </ul>
                </div>
                <div className="sidebar-route">
                    <Switch>
                        <Route exact path="/Home"><Home /></Route>
                        <Route exact path="/Carrier"><Carrier token={this.props.token}/></Route>
                        <Route exact path="/Customer"><Customer token={this.props.token}/></Route>
                        <Route exact path="/Order"><Order token={this.props.token}/></Route>
                        <Route exact path="/Site"><Site token={this.props.token} customerId={this.props.customerId} /></Route>
                    </Switch>
                </div>
                </Router>
            </div>
        );
    }
}

export default Sitebar;

