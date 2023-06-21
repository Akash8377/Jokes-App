import React from 'react'
import loading from '../asset/loading.png';
import '../components/Loading.css';

export default function Loading() {
  return (
    <>
    <img src={loading} alt='loadingPic' className='loadingPic'/>
    </>
  )
}
