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

const IPFS_BASE_URL = 'https://nftstorage.link/ipfs/';

const NftItem = ({tokenId, contract}: NftItemProps) => {
    const ipfsURI = useCallMethod(contract, "tokenURI", [tokenId]) || '';
    const [data, setData] = useState<Metadata|undefined>(undefined);
    const [isLoading, setLoading] = useState(false);
    const showBlurLoading = isLoading || !data;

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
        <Card sx={{margin: '0.75rem'}}>
            <CardMedia
                className={showBlurLoading
                    ? 'animate__animated animate__flash animate__slow' : ''}
                component="img"
                alt={`Toon survival token id: ${tokenId}`}
                width="350"
                image={showBlurLoading
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