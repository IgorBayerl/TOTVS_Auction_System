import React,{useState} from 'react'

import LayoutHeader from '../LayoutHeader'
import ListAuctions from '../ListAuctions'
import ListMyAuctions from '../ListMyAuctions'
import SelectedAuction from '../SelectedAuction'
import {Body, MainContainer, SideCards, CenterCard} from './style'

export default function BaseLayout({children}){
    
    const [selectedAuctionObj, setSelectedAuctionObj] = useState({})

    function logTeste(pteste){
        console.log(pteste)
    }
    
    return(
        <Body>
            <LayoutHeader/>
            <MainContainer>
                <SideCards>
                    <ListAuctions selectAction={setSelectedAuctionObj}/>
                </SideCards>
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