import React from 'react';
import Form from '../components/Form/Form.js'
import Head from "next/head";


const createcampaign = () => {
    return (
        <div>
            <Head>
                <title>New Campaign</title>
                <meta name="description" content="Create New Campaign" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <Form />
        </div>
    )
}

export default createcampaign
