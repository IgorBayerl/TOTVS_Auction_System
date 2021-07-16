import React,{useState, useEffect} from 'react'

import api from '../../services/api'

import {ContentContainer, ErrorMessage, InputContainer,ContainerResp, ButtonUpdate} from './style'


export default function SelectedAuction(props){

    const [OBJ, setOBJ] = useState({
        "id": 0,
        "title": "",
        "description": "",
        "is_new": true,
        "initial_value": "",
        "winner_value": "",
        "owner_user_id": "",
        "owner_user_name": "",
        "winner_user_id": "",
        "winner_user_name": "",
        "initial_date": "",
        "final_date": ""
    })
    const [message, setMessage] = useState('')
    const [bidValue, setBidValue] = useState('')
    const [situacaoString, setSituacaoString] = useState('')

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    useEffect(() => {
        if(!isEmpty(props.auctionObj) ){
            setOBJ(props.auctionObj)
            setSituacaoString(compareDates(OBJ.initial_date,OBJ.final_date))
        }
    }, [props.auctionObj]);

    useEffect(() => {
        if(!isEmpty(OBJ) ){
            setSituacaoString(compareDates(OBJ.initial_date,OBJ.final_date))
        }
    }, [OBJ]);


    async function makeABid(){
        try {
            const data = {
                "auction_id": OBJ.id,
                "value":bidValue
            }
            const response = await api.post('auction/bid',data)
            setOBJ(response.data)
        } catch (error) {
            if(error.response.data) {setMessage(error.response.data)} else { alert(error) }
        }
    }
    
    // todo 
    // limitar caracteres do campo lances
    // fazer atualizar automaticamente com web sockets
    // comparar datas

    async function updateThisAuctionInfo(){
        try {
            if(!isEmpty(OBJ)) {
                const response = await api.get(`auction/room/${OBJ.id}`)
                setOBJ(response.data)
                compareDates(OBJ.initial_date,OBJ.final_date)
            }
        } catch (error) {
            alert(error) 
        }
                 
    }

    function compareDates(pInitial, pFinal) {
        
        const dateNow = new Date().getTime();

        const initialDate = new Date(pInitial).getTime();
        const finalDate = new Date(pFinal).getTime();
        if (dateNow > finalDate) {
            return 'Leilão Acabou!';
        }
        if (dateNow < initialDate) {
            return 'Leilão ainda não iniciou!';
        }
        if ( initialDate < dateNow <= finalDate) {
            return('Leilão em andamento!');
        }
        return 'erro ao verificar o andamento do leilão'
        
    }

    if(OBJ.id){
        return(
        
            <ContentContainer>
                <ButtonUpdate onClick={() => updateThisAuctionInfo()}>Atualizar</ButtonUpdate>
                <h1>{OBJ.title.toUpperCase()}</h1>
                {OBJ.is_new? <h3>Novo</h3> : <h3>Usado</h3> }
                <br/>
                <h3>Dono do leilão : {OBJ.owner_user_name}</h3>
    
                <br/>
                <hr/>
                <br/>
                <p>{OBJ.description}</p>
                
                <br/>
                {/* <p>{JSON.stringify(OBJ)}</p> */}
                <h3>Valor Inicial : {OBJ.initial_value}</h3>
                <br/>
                <h3>{situacaoString}</h3>
                <h3>Data inicial : {OBJ.initial_date}</h3>
                <h3>Data final : {OBJ.final_date}</h3>
                <br/>
                <hr/>
                <br/>
                
                
                <h3>Lance atual: R${OBJ.winner_value?OBJ.winner_value: OBJ.initial_value},00 - feito por {OBJ.winner_user_name?OBJ.winner_user_name: OBJ.owner_user_name}</h3>
                
                <br/>
                <ContainerResp>
                    <InputContainer>
                        <label>R$ </label>
                        <input type='text'    value={bidValue}  onChange={e => setBidValue(e.target.value)}/>
                        <label> ,00</label>
                    </InputContainer>
                    <button onClick={() => makeABid()}>Fazer lance</button>
    
                </ContainerResp>
                <ErrorMessage>{message}</ErrorMessage>
    
            </ContentContainer>
        )
    }else{

        return(
        
            <ContentContainer>
                <h1>Selecione um Leilao</h1>
            </ContentContainer>
        )
        
    }
    
    
}