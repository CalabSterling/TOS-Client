import React from 'react';
import './App.css';
import Auth from './Auth/Auth';
//import styled from 'styled-components';
import Sitebar from './Components/Navbar';


// const SiteContainer = styled.div`
//   font-family: 'Times New Roman';
//   height: 100%;
//   display: grid;
// `;
// const UserContainer = styled.div`
//   padding-top: 0%;
//   padding-right: 1%;

//   @media (max-width: 1024px) {
//     margin: auto;
//   }
// `;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sessionToken: '', ID: '', role: ''}
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

  componentDidUpdate = () => {
    console.log(
     'ID=', localStorage.getItem('ID'),
      'sessionToken=', localStorage.getItem('token'),
      this.state.sessionToken,
      )
  }

  protectedViews = () => {
    return (this.state.sessionToken === localStorage.getItem('token') ? <></> : <Auth updateToken={this.updateToken} updateID={this.updateID} updateRole={this.updateRole} />);
  };

  render() {
    return (
      <div >
        <div>
          {this.state.sessionToken === localStorage.getItem('token') ? <Sitebar token={this.state.sessionToken} clickLogout={this.clearToken} role={this.state.role} /> : <></> }
          <div>
            {this.protectedViews()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
