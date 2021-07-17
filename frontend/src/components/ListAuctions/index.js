import React,{useState, useEffect} from 'react'

import api from '../../services/api'

import {ContentContainer, ListItem} from './style'

export default function ListAuctions(props){

    const [auctionsList, setAuctionsList] = useState([]);
    // const [token, setToken] = useState('');

    

    async function getInfo(){
        try {
            const response = await api.get('auction/list_all')
            setAuctionsList(response.data)
        } catch (error) {
            if(error.response.data) {alert('error.response.data')} else alert(error)
        }

    }

    useEffect(() => {
        getInfo()
    },[])

   
    function Lista(){
        return(
            <>
                {auctionsList.map((localState, index) => (
                    <ListItem key={index} onClick={() => props.selectAction(localState)}>
                        <h3 >{localState.title}</h3>
                        <h5 >{localState.winner_value}</h5>
                        <h5 >{localState.description}</h5>
                    </ListItem> 
                ))}
            </>
        )
    }
    
    return(
        <ContentContainer>
            <Lista/>

        </ContentContainer>
    )
}