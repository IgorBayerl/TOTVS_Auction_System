import React from 'react'
import {Header} from './style'
import {useHistory} from 'react-router-dom';
import {logout} from '../../services/auth'

export default function LayoutHeader(){
    
    const history = useHistory();

    function logOut(){
        logout()
        history.push('/')
    }
    return(
        <Header>
            <div>
                <h1>Logo</h1>
                <h5>titulo da pagina</h5>
            </div>

            <button onClick={() => logOut()}>LogOut</button>
        </Header>
    )
}