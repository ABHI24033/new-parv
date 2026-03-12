// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useUserState } from '../store';
// import { getProfile } from '@/lib/actions/common';
// import Profile from '@/components/common/Profile';

// const FieldStaff = () => {

//    const [fieldStaffData, setFieldStaffData] = useState();
  
//     const userState = useUserState();
  
//     let token;
//     userState.user.getIdToken().then((res) => {
//       token = res;
//     }).catch((err) => {
//       console.error("Failed to get token:", err);
//     });
  
//     const fetchFieldStaff = async () => {
//       try {
//         const res = await getProfile(token, userState?.profile?.username);

//         if (res) {
//           setFieldStaffData(res?.data);
//         }
  
//       } catch (error) {
//         console.log("ERRor", error);
//       }
//     }
  
//     useEffect(() => {
//       fetchFieldStaff();
//     }, []);


//   return (
//     <div>
//         <Profile data={fieldStaffData}/>
//     </div>
//   )
// }

// export default FieldStaff












'use client';
import React, { useEffect, useState } from 'react';
import { approveDSAForm, GetDSADataById } from '@/lib/actions/dsa';
import { useUserState } from '../../store';
import Profile from '@/components/common/Profile';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Spinners from '@/components/common/Spinners';

const ProfilePage = () => {
  const [DSAData, setDSAData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userState = useUserState();

  const searchParam = useSearchParams();
  const username = searchParam.get("username") || userState?.profile?.username;
  const role = searchParam.get("role") || userState?.profile?.role;

  useEffect(() => {
    const fetchDSAREcord = async () => {
      try {
        const token = await userState.user.getIdToken();
        const res = await GetDSADataById(token, username);
        console.log(res);
        if (res?.success) {
          setDSAData(res.data);
        } else {
          console.error("No data found:", res?.message);
        }
      } catch (error) {
        console.error("Error fetching DSA data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userState?.user && userState?.profile?.username) {
      fetchDSAREcord();
    }
  }, [userState?.user, userState?.profile?.username]);

  const ApproveDSA = async () => {
    try {
      const token = await userState.user.getIdToken();
      const res = await approveDSAForm(username, "approved");
      console.log("Approve Response:", res);

      if (res.success) {
        toast.success("DSA approved successfully");
      }
    } catch (error) {
      toast.error("Error approving DSA");
      console.error("Error approving DSA:", error);
    }
  };

  const rejectDSA = async () => {
    try {
      const token = await userState.user.getIdToken();
      const res = await approveDSAForm(username, "rejected");
      console.log("Reject Response:", res);

      if (res.success) {
        toast.success("DSA rejected successfully");
      }
    } catch (error) {
      toast.error("Error rejecting DSA");
      console.error("Error rejecting DSA:", error);
    }
  };

  if (loading) {
    return <div className="p-4">
      <Spinners />
    </div>;
  }

  if (!DSAData) {
    return <div className="p-4 text-red-500">No data found.</div>;
  }

  return (
    <div className='relative p-4'>
      {/* {
        userState?.profile?.role === 'Admin' && (
          <div className='flex absolute gap-3 right-5 top-5 justify-end mx-4 my-2'>
            <Button
              variant={'outline'}
              onClick={rejectDSA}
              disabled={DSAData?.status === 'rejected'}
            >
              Reject
            </Button>
            <Button
              onClick={ApproveDSA}
              disabled={DSAData?.status === 'approved'}
            >
              Approve
            </Button>
          </div>
        )
      } */}

      <Profile data={DSAData} role={role} />
      <Toaster />
    </div>
  );
};

export default ProfilePage;
