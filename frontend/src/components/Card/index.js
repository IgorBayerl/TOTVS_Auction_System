import React from 'react'
import {CardBody, CardTitle} from './style'

export default function Card({children, title}){
    return(
        <CardBody>
            <CardTitle>{title}</CardTitle>
            {children}
        </CardBody>
    )
}