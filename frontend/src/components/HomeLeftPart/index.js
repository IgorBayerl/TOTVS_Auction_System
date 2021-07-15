import React from 'react'
import {LeftContainer} from './style'

export default function HomeLeftPart({src}){

    
    return (
        <LeftContainer>
            <img src={src} alt='leftImage'/>
        </LeftContainer>
    )   
}