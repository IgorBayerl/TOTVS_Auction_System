import styled from 'styled-components'


export const ContentContainer = styled.div`
    height: 100%;
    word-wrap: break-word;
    h1{
        color: #64748C
    }
    input{
        background-color: #FFFFFF;
        border-radius: 10px;
        border-style: solid;
        border-color: #F3F4F6;
        border-width: 2px;
        font-size: 1em;
        padding: 15px 10px;
        min-width: 280px;
        width: 40%;
        margin: 0 0.2em;
        
    }
    button{
        background-color: #EEF7FF;
        border-radius: 7px;
        border-style: solid;
        border-color: #EEF7FF;
        border-width: 2px;
        font-weight: bold;
        font-size: 1em;
        padding: 15px 10px;
        width: 50%;
        transition: all 0.2s;
        border-color: #F3F4F6;
        :hover{
            border-color: #5E768C;
            background-color: #5E768C;
            color: white;
            cursor: pointer;
        }
    }
    hr{
        opacity: 0.5;
    }
    div{
        display: flex;
        justify-content: space-between;
    }
`

export const ErrorMessage = styled.p`
    color: red;
    margin-top: 1em;
`

export const InputContainer = styled.div`
    //font-size: 2em;
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
    input{
        width: auto;
    }
`

export const ButtonUpdate = styled.button`
    background-color: #EEF7FF;
    border-radius: 7px;
    border-style: solid;
    border-color: #EEF7FF;
    border-width: 2px;
    font-weight: bold;
    font-size: 0.7em !important;
    padding: 5px 3px !important;
    width: 50%;
    transition: all 0.2s;
    border-color: #F3F4F6;
    :hover{
        border-color: #5E768C;
        background-color: #5E768C;
        color: white;
        cursor: pointer;
    }
    
`
export const ContainerResp = styled.div`
    @media (max-width: 1300px) {
        display: flex;
        flex-direction: column;
        button{
            width: 100%;
        }
    }
    
`

