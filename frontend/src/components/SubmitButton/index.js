import React from 'react'
import {Button} from './style'

export default function SubmitButton(props){

    return(
        <Button onClick={props.onClick}>
            {props.children}
        </Button>
    )
}