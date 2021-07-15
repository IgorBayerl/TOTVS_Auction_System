import React, { useState } from 'react'
import Card from '../Card'
import SubmitButton from '../SubmitButton'
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api'
import {login} from '../../services/auth'

import {Info, LinkText, Input, ErrorMessage} from './style'

export default function FormLogin(){

    const history = useHistory();

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [message, setMessage] = useState('')

    async function submitLogin(){

        const data =  {
            'email': email,
            'password': password
        }

        try {
            const response = await api.post('user/login',data)
            login(response.data)
            if(response.data){
                history.push('/home')   
            }
        } catch (error) {
            alert(error)
            if (error.response.data){setMessage(error.response.data)}else{alert(error)}
        }

    }


    return(
        <Card title='Access your acount !'>
            <Info>Dont have an acount? <Link to='/register'><LinkText>Register</LinkText></Link></Info>
            <Input type='text'      placeholder={'Email'}     value={email}    onChange={e => setEmail(e.target.value)}/>
            <Input type='password'  placeholder={'Password'}  value={password} onChange={e => setPassword(e.target.value)}/>
            <ErrorMessage>{message}</ErrorMessage>
            <SubmitButton onClick={() => submitLogin()} >Login</SubmitButton>
        </Card>
    )
}