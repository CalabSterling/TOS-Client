import React from 'react';
import Signup from './Signup';
import Login from './Login';
import styled from 'styled-components';

const LogoContainer = styled.div`
    font-size: 22px;
    font-family: 'Garamond';
    color: #32af12;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, .15);
    position: relative;
    overflow: hidden;
    padding-left: 2%;
    padding-right: 2%;
`;
const TopContainer = styled.div`
    width: 150%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 5%;
    padding-left: 5%;
    /* padding-bottom: 5em; */
`;
const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const HeaderText = styled.div`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.2;
    color: white;
    z-index: 10;
    overflow-wrap: break-word;
`;
const SmallText = styled.p`
    color: white;
    font-weight: 500;
    font-size: 14px;
    z-index: 10;
    margin: 0;
    margin-top: 10px;
`;
const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
const Column = styled.div `
    float: left;

    @media (max-width: 1024px) {
        float: center;
    }
`;

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {active: "login"}
    }

    switchToSignup = (e) => {
        e.preventDefault();
        this.setState({active: "signup"});
    }

    switchToLogin = () => {
        this.setState({active: "login"});
    }

    hour = new Date().getHours();

    render() {
        return(
            <div>
                <div>
                    <Column span="3">
                    <Container>
                        <TopContainer>
                            <HeaderContainer>
                                <HeaderText>
                                    <LogoContainer>Transportation <br />Ordering System</LogoContainer>
                                    {this.hour >= 4 && this.hour < 12 ? "Good Morning" : this.hour >= 12 && this.hour < 18 ? "Good Afternoon" : "Good Evening"}!
                                </HeaderText> 
                                <SmallText>
                                    {this.state.active === "login" ? 'Please Login' : 'Please Signup' }
                                </SmallText>
                            </HeaderContainer>
                        </TopContainer>
                        <InnerContainer>
                            {this.state.active === 'login' ? <Login switchToSignup={this.switchToSignup} updateToken={this.props.updateToken} updateID={this.props.updateID} updateRole={this.props.updateRole} /> : <Signup switchToLogin={this.switchToLogin} updateToken={this.props.updateToken} updateID={this.props.updateID} updateRole={this.props.updateRole} />}
                        </InnerContainer>
                    </Container>
                    </Column>
                </div>
            </div>
        )
    }
}
 
export default Auth;