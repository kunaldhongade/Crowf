import styled from 'styled-components';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from "next/head";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


export default function Dashboard() {
    const [campaignsData, setCampaignsData] = useState([]);

    useEffect(() => {
        const Request = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = Web3provider.getSigner();
            const Address = await signer.getAddress();

            const provider = new ethers.providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL
            );

            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_ADDRESS,
                CampaignFactory.abi,
                provider
            );

            const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
            const AllCampaigns = await contract.queryFilter(getAllCampaigns);
            const AllData = AllCampaigns.map((e) => {
                return {
                    title: e.args.title,
                    image: e.args.imgURI,
                    owner: e.args.owner,
                    timeStamp: parseInt(e.args.timestamp),
                    amount: ethers.utils.formatEther(e.args.requiredAmount),
                    address: e.args.campaignAddress
                }
            })
            setCampaignsData(AllData)
        }
        Request();
    }, [])

    return (
        <>
            <HomeWrapper>
                <Head>
                    <title>Dashboard</title>
                    <meta name="description" content="User Dashboard" />
                    <link rel="icon" href="/logo.png" />
                </Head>
                <TitleC>
                    <h1>Your Dashboard..😉🚀</h1>
                </TitleC>
                {/* Cards Container */}
                <CardsWrapper>
                    {
                        campaignsData.map((e) => {
                            return (
                                <>
                                    <Grid item spacing={2}>
                                        <Card xd={4} md={2} sd={1} key={e.title} sx={{ maxWidth: 345, minWidth: 345, marginBottom: 10 }} >
                                            <CardMedia
                                                component="img"
                                                alt="CampImage"
                                                height="180"
                                                width="50"
                                                layout='fill'
                                                src={"https://crowf.infura-ipfs.io/ipfs/" + e.image}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {e.title.slice(0, 22)}...
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Owner: {e.owner.slice(0, 6)}...{e.owner.slice(39)}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Amount: {e.amount} Matic
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Date: {new Date(e.timeStamp * 1000).toLocaleString()}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Link passHref href={'/' + e.address}>
                                                    <Button size="small" sx={{
                                                        color: "#9c27b0"
                                                    }}>Check</Button>
                                                </Link>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </>
                            );
                        }
                        )
                    }

                </CardsWrapper>
            </HomeWrapper >
        </>
    );
}

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    padding-top: 5%;
`

const TitleC = styled.h1`
    font-size: larger;
    color: "yellow";
    font-family: 'Rubik', sans-serif;
`

const CardsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 80%;
    border-radius: 10px;
    margin-top: 25px;
`
