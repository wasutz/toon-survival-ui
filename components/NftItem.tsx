import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Contract } from '@ethersproject/contracts';
import useCallMethod from '../hooks/useCallMethod';
import Metadata from '../definitions/Metadata';

interface NftItemProps {
    tokenId: number;
    contract: Contract
}

const IPFS_BASE_URL = 'https://gateway.pinata.cloud/ipfs/';

const NftItem = ({tokenId, contract}: NftItemProps) => {
    const ipfsURI = useCallMethod(contract, "tokenURI", [tokenId]) || '';
    const [data, setData] = useState<Metadata|undefined>(undefined);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (ipfsURI) {
            setLoading(true)
            const path = ipfsURI.replace('ipfs://', '');

            fetch(`${IPFS_BASE_URL}/${path}`)
                .then(res => res.json())
                .then((result: Metadata) => {
                    setData(result)
                    setLoading(false)
                }).catch(ex => {
                    console.error(ex);
                    setLoading(false)
                });
        }
    }, [ipfsURI]);

    return (
        <Card sx={{margin: '0.5rem'}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="300"
                image={isLoading || !data
                    ? `/images/blur.png`
                    :`${IPFS_BASE_URL}/${data?.image.replace('ipfs://', '')}`} />
            <CardContent sx={{textAlign:'left'}}>
                <Typography gutterBottom variant="h5" component="h2">
                    Token ID: {tokenId}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default NftItem;