import styled from 'styled-components';
import FormInput from './Components/FormInput';
import { createContext, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Link from 'next/link';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';



const FormState = createContext();

const Form = () => {
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "Art"
    });

    const [loading, setLoading] = useState(false); // start campaign 
    const [address, setAddress] = useState(""); // campaign address
    const [uploaded, setUploaded] = useState(false);

    const [storyUrl, setStoryUrl] = useState();
    const [imageUrl, setImageUrl] = useState();

    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [image, setImage] = useState(null);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const startCampaign = async (e) => {
        e.preventDefault();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (form.campaignTitle === "") {
            toast.warn("Title Field Is Empty");
        } else if (form.story === "") {
            toast.warn("Story Field is Empty");
        } else if (form.requiredAmount === "") {
            toast.warn("Required Amount Field is Empty");
        } else if (uploaded == false) {
            toast.warn("Files upload Required!")
        } else {
            setLoading(true);

            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_ADDRESS,
                CampaignFactory.abi,
                signer
            );


            const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);

            const campaignData = await contract.createCampaign(
                form.campaignTitle,
                CampaignAmount,
                imageUrl,
                form.category,
                storyUrl
            );

            await campaignData.wait();
            setAddress(campaignData.to);
        }

    }

    return (
        <FormState.Provider value={{ form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl, startCampaign, setUploaded }}>
            <FormWrapper>
                {
                    <FormMain>
                        {
                            loading == true ?
                                address == "" ?
                                    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                                        <Typography variant="h4" gutterBottom>
                                            Getting Things Ready...
                                        </Typography>
                                        <LinearProgress color="secondary" />
                                        <LinearProgress color="success" />
                                        <LinearProgress color="inherit" />
                                        <LinearProgress color="secondary" />
                                        <LinearProgress color="success" />
                                        <LinearProgress color="inherit" />
                                    </Stack> :
                                    <Address>
                                        <h1>Campaign Started Successfully..😎🥰✨</h1>
                                        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                                            <LinearProgress color="secondary" />
                                            <LinearProgress color="success" />
                                            <LinearProgress color="inherit" />
                                        </Stack>
                                        <Link passHref href={'/'}>
                                            <Button>
                                                Go to the Campaign..🚀
                                            </Button>
                                        </Link>
                                    </Address>
                                :
                                <FormInputsWrapper >
                                    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} sx={{ alignItems: "center" }}>
                                                <Typography variant="h4" gutterBottom>
                                                    Create New Campaign..✨👌
                                                </Typography>

                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Box sx={{ minWidth: 250 }}>
                                                    <FormInput />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormInputsWrapper>
                        }
                    </FormMain>
                }
            </FormWrapper>
        </FormState.Provider >
    );
};

const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
    padding-top: 10%;

`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:10px ;
`

const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    font-family: 'Rubik', sans-serif;
    text-align:center;
    flex-direction:column;
    align-items:center ;
    border-radius:8px;
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  padding:15px ;
  color:white ;
  background-color:#9c27b0;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
  border-radius: 10px;
`

export default Form;
export { FormState };