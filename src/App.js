import React from 'react';
import './App.css';
import Auth from './Auth/Auth';
import styled from 'styled-components';
import Sitebar from './Components/Navbar';


const SiteContainer = styled.div`
  font-family: 'Times New Roman';
  height: 100%;
  display: grid;
`;
const UserContainer = styled.div`
  padding-right: 10%;
  float: center;

  @media (max-width: 1024px) {
    margin: auto;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sessionToken: '', ID: '', role: '', customerId: ''}
  }

  updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken});
  }
  
  updateID = (newID) => {
    this.setState({ID: newID});
    localStorage.setItem('ID', newID);
  }

  updateRole = (newRole) => {
    this.setState({role: newRole})
    localStorage.setItem('role', newRole)
  }
  
  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ''});
  }

  protectedViews = () => {
    return (this.state.sessionToken === localStorage.getItem('token') ? <Sitebar token={this.state.sessionToken} clickLogout={this.clearToken} role={this.state.role} customerId={this.state.customerId} updateOrder={this.updateOrder} updateOrderAdmin={this.updateOrderAdmin} orderToUpdate={this.state.ordertoUpdate} orderAdminToUpdate={this.state.orderAdminToUpdate} clearToken={this.clearToken} /> : <Auth updateToken={this.updateToken} updateID={this.updateID} updateRole={this.updateRole} updateCustomerID={this.updateCustomerID} />);
  };

  render() {
    return (
      <div >
        <SiteContainer>
          <UserContainer>
            {this.protectedViews()}
          </UserContainer>
        </SiteContainer>
      </div>
    );
  }
}

export default App;
