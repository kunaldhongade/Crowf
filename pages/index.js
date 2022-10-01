import styled from 'styled-components';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import Head from "next/head";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Index({ AllData, ArtData, FilmData, IdeationData, StartupData, TechData, OthersData }) {

  const [filter, setFilter] = useState(AllData);

  return (
    <HomeWrapper>
      <Head>
        <title>Crowf</title>
        <meta name="description" content="Campaign's" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <TitleC>
        <h1>Open Campaigns..🎉🎊</h1>
      </TitleC>
      <Box sx={{ minWidth: 120, borderColor: '#FEDB39' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={AllData}
            label="AllData"
          >
            <MenuItem onClick={() => setFilter(AllData)}>All</MenuItem>
            <MenuItem onClick={() => setFilter(ArtData)}>Art</MenuItem>
            <MenuItem onClick={() => setFilter(FilmData)}>Film</MenuItem>
            <MenuItem onClick={() => setFilter(IdeationData)}>Ideation</MenuItem>
            <MenuItem onClick={() => setFilter(StartupData)}>Startup</MenuItem>
            <MenuItem onClick={() => setFilter(TechData)}>Tech</MenuItem>
            <MenuItem onClick={() => setFilter(OthersData)}>Others</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Cards Container */}
      <CardsWrapper>

        {/* Card */}
        {filter.map((e) => {
          return (
            <>

              <Grid item spacing={2} xs={12} md={4} sm={6}>
                <Card xs={12} md={4} sm={6} key={e.title} sx={{ maxWidth: 345, minWidth: 345, marginBottom: 10, borderColor: '#FEDB39' }} >
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
          )
        }).reverse()}
      </CardsWrapper>
    </HomeWrapper>
  )
}



export async function getStaticProps() {
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
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getArtCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Art');
  const ArtCampaigns = await contract.queryFilter(getArtCampaigns);
  const ArtData = ArtCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getFilmCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Film');
  const FilmCampaigns = await contract.queryFilter(getFilmCampaigns);
  const FilmData = FilmCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getIdeationCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Ideation');
  const IdeationCampaigns = await contract.queryFilter(getIdeationCampaigns);
  const IdeationData = IdeationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getStartupCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Startup');
  const StartupCampaigns = await contract.queryFilter(getStartupCampaigns);
  const StartupData = StartupCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getTechCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Tech');
  const TechCampaigns = await contract.queryFilter(getTechCampaigns);
  const TechData = TechCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getOthersCampaigns = contract.filters.campaignCreated(null, null, null, null, null, null, 'Others');
  const OthersCampaigns = await contract.queryFilter(getOthersCampaigns);
  const OthersData = OthersCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });
  return {
    props: {
      AllData,
      ArtData,
      FilmData,
      IdeationData,
      StartupData,
      TechData,
      OthersData
    },
    revalidate: 10
  }
}

const TitleC = styled.h1`
  font-size: larger;
  color: "yellow";
  font-family: 'Rubik', sans-serif;
`

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 5%;
`

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 85%;
  margin-top: 25px;
 `
