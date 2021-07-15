import styled from 'styled-components'

export const Body = styled.div`
    justify-content: space-evenly;
    height: 100vh;
    @media (max-width: 980px){
        align-items: center;
    }
`

export const MainContainer = styled.div`
    display: flex;
    height: 100%;
    max-height: calc(100vh - 80px);
    justify-content: space-between;
`

export const CenterCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 7px;
  padding: 2rem 3rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 4px 7px -3px rgba(0,0,0,0.16); 
  box-shadow: 0px 4px 7px -3px rgba(0,0,0,0.16);
  color: #C6C8CB;
  width: 100%;
  max-width: 50vw;
  height: calc(100% - 3rem);
`

export const SideCards = styled.div`
  background-color: #FFFFFF;
  border-radius: 7px;
  /* padding: 2rem 3rem; */
  margin: 1rem;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 4px 7px -3px rgba(0,0,0,0.16); 
  box-shadow: 0px 4px 7px -3px rgba(0,0,0,0.16);
  color: #C6C8CB;
  height: calc(100% - 3rem);
  min-width: 350px;
`

