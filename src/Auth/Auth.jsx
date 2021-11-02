import React from 'react';
import Signup from './Signup';
import Login from './Login';
import styled from 'styled-components';

const LogoContainer = styled.div`
    font-size: 22px;
    font-family: 'Garamond';
    color: white;
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
const BackDrop = styled.div`
    width: 150%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -385px;
    left: -60px;
    background: #677487;
    
    @media (max-width: 1024px) {
        background: black;
    }
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
const Row = styled.div`
    height: 100%;

`;
const Column = styled.div `
    float: right;

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

    switchToLogin = (e) => {
        e.preventDefault();
        this.setState({active: "login"});
    }

    hour = new Date().getHours();

    render() {
        return(
            <div>
                <Row>
                    <Column span="3">
                    <Container>
                        <TopContainer>
                            <BackDrop />
                            <HeaderContainer>
                                <HeaderText>
                                    <LogoContainer>Transportation Ordering System</LogoContainer>
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
                </Row>
            </div>
        )
    }
}
 
export default Auth;