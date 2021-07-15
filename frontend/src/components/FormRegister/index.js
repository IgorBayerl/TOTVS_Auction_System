import React, { useState } from 'react'
import Card from '../Card'
import SubmitButton from '../SubmitButton'
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api'

import {Info, LinkText, Input, ErrorMessage} from './style'

export default function FormRegister(){

    const history = useHistory();

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [message, setMessage] = useState('')

    async function submitRegister(){

        const data =  {
            'name': name,
            'email': email,
            'password':password
        }

        try {
            await api.post('user/register',data)
            history.push('/')
        } catch (error) {
            setMessage(error.response.data);
        }

    }


    return(
        <Card title='Create a new Acount !'>
            <Info>Already have an acount? <Link to='/'><LinkText>LogIn</LinkText></Link></Info>
            <Input type='text'      placeholder={'Name'}                value={name}               onChange={e => setName(e.target.value)}/>
            <Input type='text'      placeholder={'Email'}               value={email}              onChange={e => setEmail(e.target.value)}/>
            <Input type='password'  placeholder={'Password'}            value={password}           onChange={e => setPassword(e.target.value)}/>
            <ErrorMessage>{message}</ErrorMessage>
            <SubmitButton  onClick={() => submitRegister()} >Register</SubmitButton>
        </Card>
    )
}