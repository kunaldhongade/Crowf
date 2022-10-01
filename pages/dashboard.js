import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
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
import NoSsr from "@mui/base/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useNewsInfoStyles } from "@mui-treasury/styles/info/news";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 320,
        position: "relative",
        boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)",
        overflow: "visible",
        borderRadius: "1.5rem",
        transition: "0.4s",
        "&:hover": {
            transform: "translateY(-2px)",
            "& $shadow": {
                bottom: "-1.5rem"
            },
            "& $shadow2": {
                bottom: "-2.5rem"
            }
        },
        "&:before": {
            content: '""',
            position: "absolute",
            zIndex: 0,
            display: "block",
            width: "100%",
            bottom: -1,
            height: "100%",
            borderRadius: "1.5rem",
            backgroundColor: "rgba(0,0,0,0.08)"
        }
    },
    main: {
        overflow: "hidden",
        borderTopLeftRadius: "1.5rem",
        borderTopRightRadius: "1.5rem",
        zIndex: 1,
        "&:after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            display: "block",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, #014a7d, rgba(0,0,0,0))"
        }
    },
    content: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 1,
        padding: "1.5rem 1.5rem 1rem"
    },
    avatar: {
        width: 48,
        height: 48
    },
    tag: {
        display: "inline-block",
        fontFamily: "'Sen', sans-serif",
        backgroundColor: "#ff5dac",
        borderRadius: "0.5rem",
        padding: "2px 0.5rem",
        color: "#fff",
        marginBottom: "0.5rem"
    },
    title: {
        fontFamily: "'Sen', sans-serif",
        fontSize: "2rem",
        fontWeight: 800,
        color: "#fff"
    },
    author: {
        zIndex: 1,
        position: "relative",
        borderBottomLeftRadius: "1.5rem",
        borderBottomRightRadius: "1.5rem"
    },
    shadow: {
        transition: "0.2s",
        position: "absolute",
        zIndex: 0,
        width: "88%",
        height: "100%",
        bottom: 0,
        borderRadius: "1.5rem",
        backgroundColor: "rgba(0,0,0,0.06)",
        left: "50%",
        transform: "translateX(-50%)"
    },
    shadow2: {
        bottom: 0,
        width: "72%",
        backgroundColor: "rgba(0,0,0,0.04)"
    }
}));


export default function Dashboard() {
    const [campaignsData, setCampaignsData] = useState([]);
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();

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
                                                <Button size="small">Check</Button>
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
    )
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
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
  border-radius: 10px;

`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`