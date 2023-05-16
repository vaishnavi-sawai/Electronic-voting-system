import React, { useState, useEffect } from 'react';
import DoctorRegistration from './components/DoctorRegistration';
import DoctorDashboard from './components/DoctorDashboard';
// import Test from './components/test'
import './App.css';

const App = () => {
const [loading,SetLoading] = useState(false);

const getAccount = async () =>  await window.ethereum.request({method: 'eth_requestAccounts'}).then((val)=>{
   const len = val.length;
   if(len === 1){
      SetLoading(true);
      console.log('This site is connected to Meta Mask');
   }
});

useEffect(()=>{
getAccount();
},[])

 return(
  <>
  {loading? <DoctorDashboard/> : <DoctorRegistration/>}
 
  </>
 )
}

export default App;