import React from 'react';
import styled from 'styled-components'
const NavBar = () => {
  return (
    <Container>
    <PageTitle> Blizzard </PageTitle>
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
background-color:#2AA3EF;
border-bottom: .5vw solid #EAEAEB;
text-align:center;
width:100%;
min-height:20vh;
display:flex;
justify-content:center;
align-items:center; 
flex-direction:column;

`

const PageTitle = styled.h1`
font-size: 2.5rem;
text-decoration: underline;
font-family:'Shadows Into Light', cursive;
color:white;
`