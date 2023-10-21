import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index';
import Loader from './Loader';
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import ErrorHandler from './ErrorHandler';

const Exchange = () => {
    
    const [exchange,setExchange]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);

    useEffect(() => {
      
        const fetchExchanges = async()=>{
           try {
            const {data}= await axios.get(`${server}/exchanges`);
            setExchange(data);
            setLoading(false);
            
           } catch (error) {
             setLoading(false)
             setError(true)
           }
        }
        fetchExchanges();
      
    }, [])
    
    if (error) return <ErrorHandler  message={"can not load the data"}/>
  return (
  <Container maxW={"container.lg"}>
     {
        loading ?( <Loader />) : (
        <>
           <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
           {exchange.map((i)=>(
                <ExchangeCart key={i.id} name={i.name} img={i.image} url={i.url} rank={i.trust_score_rank}/>
            ))}
           </HStack>
        </>)
    }
  </Container>
  )
}

const ExchangeCart=({name,img,url,rank})=>(
    <a href={url} target='blank'>
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3'}
        m={'4'}
        css={{
            '&:hover':{
                transform:"scale(1.1)",
            }
        }} >
            <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='Exchange'/>
            <Heading size={'md'} noOfLines={1}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
)
export default Exchange
