import styled from 'styled-components'


export const ContentContainer = styled.div`
    height: 100%;
    word-wrap: break-word;
    overflow-y: scroll; 
`

export const ListItem = styled.div`
    width: 100%;
    padding: 1em;
    border-bottom: 1px solid #dedede;
    transition: all 0.2s;
    color: #575757;
    :hover{
        background-color: #edeff2;
        color: #000000;
    }
`