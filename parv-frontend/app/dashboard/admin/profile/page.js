'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUserState } from '../../store'
import { getProfile } from '@/lib/actions/common'
import Profile from '@/components/common/Profile'

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [DSAData,setDSAData]=useState();

  const userState = useUserState();

  let token;
  userState.user.getIdToken().then((res) => {
    token=res;
  }).catch((err) => {
    console.error("Failed to get token:", err);
  });



  const fetchDSAREcord = async() => {
    try {
      const res =await getProfile(token,username);
      console.log(res);
      if(res){
        setDSAData(res?.data);
      }
      
    } catch (error) {
      console.log("ERRor",error);
      
    }
  }

  useEffect(() => {
    fetchDSAREcord();
  }, []);

  return (
    <div>
      <Profile data={DSAData} />
    </div>
  )
}

export default ProfilePage