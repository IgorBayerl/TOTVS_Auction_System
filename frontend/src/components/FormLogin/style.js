import styled from 'styled-components'

export const LinkText = styled.a`
  font-size: 1em;
  font-weight: bold;
  color: #71AEFE;
  text-decoration: none;
`

export const Info = styled.p`
  font-size: 1em;
  margin: 0.5rem 1rem;
  color: #000000;
`

export const ErrorMessage = styled.p`
  font-size: 1em;
  margin: 0.5rem 1rem;
  font-weight: 500;
  color: #DE2424;
`

export const Input = styled.input`
  background-color: #FFFFFF;
  border-radius: 10px;
  border-style: solid;
  border-color: #F3F4F6;
  border-width: 2px;
  font-size: 1em;
  padding: 15px 10px;
  margin: 1rem;
  min-width: 400px;
  
  ::placeholder {
    color: #BDBFC3;
  }
`
