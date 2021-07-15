import React from 'react';

import BodyLayout from '../../components/BodyLayout'
import FormLogin from '../../components/FormLogin'
import HomeLeftPart from '../../components/HomeLeftPart'


export default function Login(){

    return(

        <BodyLayout>
            <HomeLeftPart src='undraw_Mobile_payments_re_7udl.svg'/>
            <FormLogin/>
        </BodyLayout>
    )
}