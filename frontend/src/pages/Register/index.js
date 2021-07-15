import React from 'react';

import BodyLayout from '../../components/BodyLayout'
import FormRegister from '../../components/FormRegister'
import HomeLeftPart from '../../components/HomeLeftPart'

export default function Register(){

    return(
        <BodyLayout>
            <HomeLeftPart src='undraw_Done_re_oak4.svg'/>
            <FormRegister/>
        </BodyLayout>
    )
}