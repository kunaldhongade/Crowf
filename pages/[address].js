import * as React from "react";
import styled from "styled-components";
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Campaign from '../artifacts/contracts/Campaign.sol/Campaign.json'
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Head from "next/head";



export default function Detail({ Data, DonationsData }) {
    const [mydonations, setMydonations] = useState([]);
    const [story, setStory] = useState('');
    const [amount, setAmount] = useState();
    const [change, setChange] = useState(false);

    useEffect(() => {
        const Request = async () => {
            let storyData;

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = Web3provider.getSigner();
            const Address = await signer.getAddress();

            const provider = new ethers.providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL
            );

            const contract = new ethers.Contract(
                Data.address,
                Campaign.abi,
                provider
            );

            fetch('https://crowf.infura-ipfs.io/ipfs/' + Data.storyUrl)
                .then(res => res.text()).then(data => storyData = data);

            const MyDonations = contract.filters.donated(Address);
            const MyAllDonations = await contract.queryFilter(MyDonations);

            setMydonations(MyAllDonations.map((e) => {
                return {
                    donar: e.args.donar,
                    amount: ethers.utils.formatEther(e.args.amount),
                    timestamp: parseInt(e.args.timestamp)
                }
            }));

            setStory(storyData);
        }

        Request();
    }, [change])


    const DonateFunds = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(Data.address, Campaign.abi, signer);

            const transaction = await contract.donate({ value: ethers.utils.parseEther(amount) });
            await transaction.wait();

            setChange(true);
            setAmount('');

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Box sx={{ flexGrow: 1, margin: "10%" }}>
                <Head>
                    <meta name="description" content="Campaign's Detail" />
                    <link rel="icon" href="/logo.png" />
                </Head>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} sm={6}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    width="40vh"
                                    layout="fill"
                                    src={
                                        "https://crowf.infura-ipfs.io/ipfs/" + Data.image
                                    }
                                    alt="Campaign Image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", paddingTop: 1 }}>
                                        {Data.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <Card>
                            <CardActionArea>
                                <TextField
                                    id="outlined-basic"
                                    label="Donate please..🙏"
                                    variant="outlined"
                                    placeholder="...in Matic"
                                    fullWidth
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                /><br></br><br />
                                <Button sx={{
                                    backgroundColor: "#9c27b0", color: "#fff", fontFamily: 'Russo One', fontSize: "large",
                                    "&:hover": {
                                        backgroundColor: "#4a148c",
                                    }
                                }} onClick={DonateFunds} fullWidth >
                                    Donate
                                </Button>
                                <br />
                                <br />
                                <br />

                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: 20, textAlign: "center" }}
                                >
                                    Required Amount : {Data.requiredAmount} Matic
                                </Typography>
                                <Divider />
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: 20, textAlign: "center" }}
                                >
                                    Received Amount : {Data.receivedAmount} Matic
                                </Typography>
                                <br />
                                <Donated>
                                    <LiveDonation><Divider />
                                        <DonationTitle>Recent Donation</DonationTitle><Divider />
                                        {DonationsData.map((e) => {
                                            return (
                                                <Donation key={e.timestamp}>
                                                    <DonationData>{e.donar.slice(0, 6)}...{e.donar.slice(39)}</DonationData>
                                                    <DonationData>{e.amount} Matic</DonationData>
                                                    <DonationData>{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
                                                </Donation>
                                            )
                                        })
                                        }
                                    </LiveDonation>
                                    <MyDonation>
                                        <Divider />
                                        <DonationTitle>My Past Donation</DonationTitle>
                                        <Divider />
                                        {mydonations.map((e) => {
                                            return (
                                                <Donation key={e.timestamp}>
                                                    <DonationData>{e.donar.slice(0, 6)}...{e.donar.slice(39)}</DonationData>
                                                    <DonationData>{e.amount} Matic</DonationData>
                                                    <DonationData>{new Date(e.timestamp * 1000).toLocaleString()}</DonationData>
                                                </Donation>
                                            )
                                        })
                                        }
                                    </MyDonation>
                                </Donated>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8} sm={6}>
                        <Card sx={{ minHeight: "135px" }}>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: 21, textAlign: "center" }}
                            >
                                Story
                            </Typography>
                            <Divider /><br />
                            <Typography variant="body2" sx={{ justifyContent: "space-around", fontSize: 18 }}>
                                {story}
                            </Typography>
                        </Card>
                    </Grid>

                </Grid>
            </Box >
        </>
    );
}


export async function getStaticPaths() {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
    );

    const getAllCampaigns = contract.filters.campaignCreated();
    const AllCampaigns = await contract.queryFilter(getAllCampaigns);

    return {
        paths: AllCampaigns.map((e) => ({
            params: {
                address: e.args.campaignAddress.toString(),
            }
        })),
        fallback: "blocking"
    }
}

export async function getStaticProps(context) {
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
        context.params.address,
        Campaign.abi,
        provider
    );

    const title = await contract.title();
    const requiredAmount = await contract.requiredAmount();
    const image = await contract.image();
    const storyUrl = await contract.story();
    const owner = await contract.owner();
    const receivedAmount = await contract.receivedAmount();

    const Donations = contract.filters.donated();
    const AllDonations = await contract.queryFilter(Donations);


    const Data = {
        address: context.params.address,
        title,
        requiredAmount: ethers.utils.formatEther(requiredAmount),
        image,
        receivedAmount: ethers.utils.formatEther(receivedAmount),
        storyUrl,
        owner,
    }

    const DonationsData = AllDonations.map((e) => {
        return {
            donar: e.args.donar,
            amount: ethers.utils.formatEther(e.args.amount),
            timestamp: parseInt(e.args.timestamp)
        }
    });

    return {
        props: {
            Data,
            DonationsData
        },
        revalidate: 10
    }


}

const Donated = styled.div`
  height: 280px;
  margin-top: 15px;
`;
const LiveDonation = styled.div`
  height: 65%;
  overflow-y: auto;
`;
const MyDonation = styled.div`
  height: 35%;
  overflow-y: auto;
`;
const DonationTitle = styled.div`
  font-family: "Roboto";
  font-size: x-small;
  text-transform: uppercase;
  padding: 4px;
  text-align: center;
`;
const Donation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  padding: 4px 8px;
`;
const DonationData = styled.p`
 
  font-family: "Roboto";
  font-size: large;
  margin: 0;
  padding: 0;
`;
