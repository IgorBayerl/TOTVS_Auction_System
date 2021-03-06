import React,{useState, useEffect} from 'react'

import LayoutHeader from '../LayoutHeader'
import ListAuctions from '../ListAuctions'
import ListMyAuctions from '../ListMyAuctions'
import SelectedAuction from '../SelectedAuction'
import {Body, MainContainer, SideCards, CenterCard, SideCardLeft} from './style'

import api from '../../services/api'

export default function BaseLayout({children}){
    
    const [selectedAuctionObj, setSelectedAuctionObj] = useState({})

//    useEffect(() => {
//         const timer = setInterval(() => updateValue(), 2000);
//         return () => clearInterval(timer)
//    })

//     async function updateValue() {
//         try {
//             if(Object.keys(selectedAuctionObj).length !== 0) {
//                 const response = await api.get(`auction/room/${selectedAuctionObj.id}`)
//                 if(response.data.id === selectedAuctionObj.id){
//                     setSelectedAuctionObj(response.data)
//                 }
//             }
//         } catch (error) {
//             alert(error) 
//         }
//     }


    // Todo
    // Fazer responsividade
    // esconder campos nas laterais e revelalos ao deslizar para os lados estilo Discord
    return(
        <Body>
            <LayoutHeader/>
            <MainContainer>
                <SideCardLeft>
                    <ListAuctions selectAction={setSelectedAuctionObj}/>
                </SideCardLeft>
                <CenterCard>
                    <SelectedAuction auctionObj={selectedAuctionObj}/>
                </CenterCard>
                <SideCards>
                    <ListMyAuctions selectAction={setSelectedAuctionObj}/>
                </SideCards>
            </MainContainer>
        </Body>
    )
}