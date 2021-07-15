import styled from 'styled-components'


export const ContentContainer = styled.div`
    height: 100%;
    word-wrap: break-word;
    overflow-y: scroll;

    button{
        width: 100%;
        background-color: #dedede;
        border: none;
        height: 2em;
        transition: all 0.3s;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        font-size: 1em;
        font-weight: bold;
        :hover {
            background-color: #d2d2d2;
        }
        
    }
`

export const DeleteButton = styled.button`
    cursor: pointer;
    :hover {
        background-color: red !important;
        color: white !important;
    }
`

export const ListItem = styled.div`
    /* background-color: red; */
    width: 100%;
    /* margin-top: 10px; */
    padding: 1em;
    border-bottom: 1px solid #dedede;
    transition: all 0.2s;
    color: #575757;
    :hover{
        background-color: #edeff2;
        color: #000000;
    }
`
export const Form = styled.div`
    display: ${props => props.display || "none"};
    flex-direction: column;
    width: 100%;
    
`
