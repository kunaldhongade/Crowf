import React from 'react'
import { FormState } from '../Form';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { create as IPFSHTTPClient } from 'ipfs-http-client';
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fontSize } from '@mui/system';
import { PaddingSharp } from '@mui/icons-material';

const projectId = process.env.NEXT_PUBLIC_IPFS_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY;
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64');

const client = IPFSHTTPClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
})



const FormInput = () => {

    const Handler = useContext(FormState);

    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const uploadFiles = async (e) => {
        e.preventDefault();
        setUploadLoading(true);

        if (Handler.form.story !== "") {
            try {
                const added = await client.add(Handler.form.story);
                Handler.setStoryUrl(added.path)
            } catch (error) {
                toast.warn(`Error uploading Story`);
            }
        }

        if (Handler.image !== null) {
            try {
                const added = await client.add(Handler.image);
                Handler.setImageUrl(added.path)
            } catch (error) {
                toast.warn('Error uploading Image');
            }
        }

        setUploadLoading(false);
        setUploaded(true);
        Handler.setUploaded(true);
        toast.success("Files Uploaded Successfully")
    }


    const card = (
        <React.Fragment>
            <CardContent >
                <TextField
                    id="outlined-required"
                    label="Campaign Title"
                    placeholder="Campaign Title 😁"
                    style={{ width: "100%" }}
                    onChange={Handler.FormHandler}
                    value={Handler.form.campaignTitle}
                    name='campaignTitle'
                />
                <br />
                <br />
                <TextareaAutosize
                    id="outlined-required"
                    label="Story"
                    placeholder="Describe your campaign....Add story 😊✨"
                    style={{
                        width: "99%",
                        minHeight: 250,
                        fontFamily: "Rubik",
                        fontSize: "medium",
                    }}
                    onChange={Handler.FormHandler}
                    value={Handler.form.story}
                    name="story"
                />
                <br />
                <br />
                <TextField
                    id="outlined-required"
                    label="Required Amount"
                    placeholder="....In MATIC"
                    onChange={Handler.FormHandler}
                    value={Handler.form.requiredAmount}
                    name="requiredAmount"
                    type={'number'}
                    style={{ width: "100%" }}
                />
                <br />
                <br />
                <Typography variant="body2">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select onChange={Handler.FormHandler}
                        value={Handler.form.category}
                        name="category"
                        labelId="demo-simple-select-label"
                        style={{ width: "100%" }}
                        id="demo-simple-select"
                        sx={{ width: "100%" }}
                        label="Category">
                        <option>Art</option>
                        <option>Film</option>
                        <option>Ideation</option>
                        <option>Startup</option>
                        <option>Tech</option>
                        <option>Others</option>
                    </Select>
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-evenly" }}>
                <Button component="label" onChange={Handler.ImageHandler} type={'file'} accept="image/*" alt='Image' sx={{ color: "#9c27b0" }}>
                    Select Img
                    <input type="file" hidden />
                </Button>
                {
                    uploadLoading == true ? <Button> <TailSpin color="#9c27b0" height={20} /> </Button> :
                        uploaded == false ?
                            <Button onClick={uploadFiles} sx={{ color: "#9c27b0" }}>
                                <CloudUploadIcon />
                            </Button> :
                            <Button size="small" style={{ cursor: "no-drop", color: "#9c27b0" }}>IPFS..👍</Button>
                }
                <Button size="small" sx={{ backgroundColor: "#9c27b0" }} variant="contained" onClick={Handler.startCampaign} endIcon={<SendIcon />}>
                    Create
                </Button>
            </CardActions>
        </React.Fragment>
    );


    return (
        <Box sx={{
            minWidth: 275,
            alignItems: "center",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
        }}>
            <Card variant="outlined">{card}</Card>
        </Box >
    )
}


const Select = styled.select`
  padding:15px;
  margin-top:4px;
  border: 0.3px solid grey ;
  border-radius:5px ;
  outline: 0.3px solid grey;
  font-size:medium;
  width: 100%;
`

export default FormInput;