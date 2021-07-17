import React,{useState, useEffect} from 'react'

import api from '../../services/api'

import {ContentContainer, ListItem, Form, DeleteButton} from './style'

export default function ListMyAuctions(props){

    const [auctionsList, setAuctionsList] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    
    const [warningMessage, setWarningMessage] = useState('');

    
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [initialValue, setInitialValue] = useState(0);
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');


    function newAuction(){
        setIsUpdate(false)
        setIsFormOpen(!isFormOpen)
        setTitle('')
        setDescription('')
        setIsNew(false)
        setInitialValue(0)
        setInitialDate('')
        setFinalDate('')
    }


    
    function loadAuction(pValue){
        setIsUpdate(true)
        setIsFormOpen(true)

        const [Iyyyy,Imm,Idd,Ihh,Imi] = pValue.initial_date.split(/[/:\-T]/)
        const [Fyyyy,Fmm,Fdd,Fhh,Fmi] = pValue.final_date.split(/[/:\-T]/)

        setId(pValue.id)
        setTitle(pValue.title)
        setDescription(pValue.description)
        setIsNew(!isNew)
        setInitialValue(pValue.initial_value)
        setInitialDate(`${Iyyyy}-${Imm}-${Idd}T${Ihh}:${Imi}`)
        setFinalDate(`${Fyyyy}-${Fmm}-${Fdd}T${Fhh}:${Fmi}`)
    }

    async function getInfo(){
        try {
            const response = await api.get('auction/list')
            setAuctionsList(response.data)
        } catch (error) {
            if(error.response.data === 'Invalid Token') {alert('error.response.data')} else alert(error)
        }
    }

    useEffect(() => {
        getInfo()
    },[])

    async function sendNewAuctionRequest(){
        try {
            const initialDateISO = new Date(initialDate)
            const finalDateISO = new Date(finalDate)
            
            
            if(isUpdate){
                const data = {
                    "id": id,
                    "title":title,
                    "description": description,
                    "is_new":!isNew,
                    "initial_value":String(initialValue),
                    "initial_date":initialDateISO.toISOString(),
                    "final_date":finalDateISO.toISOString()
                }
                const response = await api.post('auction/update_auction', data)
                if(response.data === 'Success') getInfo()
            }else{
                const data = {
                    "title":title,
                    "description": description,
                    "is_new":!isNew,
                    "initial_value":String(initialValue),
                    "initial_date":initialDateISO.toISOString(),
                    "final_date":finalDateISO.toISOString()
                }
                const response = await api.post('auction/create_auction', data)
                if(response.data === 'Success') getInfo()
            }
            
        } catch (error) {
            if(error.response.data) {setWarningMessage(error.response.data)}else{console.log(error)}
        }

    }

    async function deleteAuctionRequest(pId){
        try {
            const data = {
                "id":pId
            }

            const response = await api.post('auction/delete_auction', data)
            if(response.data === 'Success') getInfo()
        } catch (error) {
            if(error.response.data) {setWarningMessage(error.response.data)}else{console.log(error)}
        }

    }
    

    function onSelectAuction(pValue){
        props.selectAction(pValue)
        loadAuction(pValue)
    }

    function Lista(){
        return(
            <>
                {auctionsList.map((localState, index) => (
                    <ListItem key={index} onClick={() =>    onSelectAuction(localState)}>
                        <h3 >{localState.title}</h3>
                        <h5 >{localState.winner_value}</h5>
                        <h5 >{localState.description}</h5>
                        <DeleteButton onClick={() => deleteAuctionRequest(localState.id)} >Delete</DeleteButton>
                    </ListItem> 
                ))}
            </>
        )
    }

    
  

    return(
        <>

            <ContentContainer>
                <button onClick={() => newAuction()}>New Auction</button>
                <Form display={isFormOpen? 'flex': 'none'}>
                    <label>Title</label>
                    <input onChange={e => setTitle(e.target.value)} value={title} placeholder="Meu leilao" type="text"/>
                    <label>Description</label>
                    <input onChange={e => setDescription(e.target.value)} value={description} type="text"/>
                    <label>Used</label>
                    <input onChange={e => setIsNew(e.target.value)} value={isNew} type="checkbox"/>
                    <label>Initial value</label>
                    <input onChange={e => setInitialValue(e.target.value)} value={initialValue} type="text"/>
                    <label>Initial Date/Time</label>
                    <input onChange={e => setInitialDate(e.target.value)} value={initialDate} type="datetime-local" id="initialDate" name="initialDate"/>
                    <label>Final Date/Time</label>
                    <input onChange={e => setFinalDate(e.target.value)} value={finalDate} type="datetime-local" id="finalDate" name="finalDate"/>
                    <h3>{warningMessage}</h3>
                    <button onClick={() => sendNewAuctionRequest()}>Confirm</button>
                </Form>
                <Lista/>
            </ContentContainer>
        </>
    )
}