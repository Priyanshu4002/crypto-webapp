import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index';
import Loader from './Loader';
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import ErrorHandler from './ErrorHandler';
import CoinCart from './CoinCart';

const Coin = () => {
    
    const [coin,setCoin]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    const [page,setPage]=useState(1);
    const [currency,setCurrency]=useState('inr');

    const currencySymbol = currency==="inr"?"₹":currency==="eur"?'€':"$";

    const arr= new Array(132).fill(1);

    const changePage=(page)=>{
        setPage(page)
        setLoading(true)
    }

    useEffect(() => {
      
        const fetchCoin = async()=>{
           try {
            const {data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
            setCoin(data);
            setLoading(false);
            
           } catch (error) {
             setLoading(false)
             setError(true)
           }
        }
        fetchCoin();
      
    }, [currency,page])
    
    if (error) return <ErrorHandler  message={"can not load the data for coins"}/>
  return (
  <Container maxW={"container.lg"}>
     {
        loading ?( <Loader />) : (
        <>
            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                <HStack spacing={"4"}>
                    <Radio value={'inr'}>INR</Radio>
                    <Radio value={'usd'}>USD</Radio>
                    <Radio value={'eur'}>EUR</Radio>
                </HStack>
            </RadioGroup>

           <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
           {coin.map((i)=>(
                <CoinCart key={i.id} id={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} currencySymbol={currencySymbol}/>
            ))}
           </HStack>
           <HStack p={'8'} w={'full'} overflowX={'auto'} >
            {arr.map((item,index)=>(
                <Button key={index} onClick={()=>changePage(index+1)} color={'white'} bgColor={"blackAlpha.900"}>{index+1}</Button>
            ))}
           </HStack>
        </>)
    }
  </Container>
  )
}


export default Coin
