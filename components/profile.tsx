'use client'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { logout } from "@/action/auth/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { getProfile } from "@/action/profile/getProfile";

const Profile = () => {
  const session = useSession()
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)

  const handleLogout = async() => {
    setLoading(true)
    try {
      const res = await logout()
      console.log(res)
      if (res.success) {
        toast('Successfully logged out!')
        router.push('/')
      } else {
        toast(res.message)
      }
    }catch(err) {
      toast('Something went wrong',{
        description: 'Check console for more details'
      })
      console.log(err)
    } finally{
      setLoading(false)
    }
  }

  const getProfileData = async() => {
    try{
      const res = await getProfile()

      if(res.success) {
        console.info(res.message)
      } else {
        console.warn(res.message)
      }
    }catch(err) {
      console.error(err)
    }
  }

  return (
    <div className="desktop:max-w-[300px] desktop:min-w-[300px] w-full max-h-[92vh] min-h-[400px] h-full bg-white shadow-sm rounded-lg flex flex-col justify-between items-center p-4">
      <Card className="shadow-none border-none flex flex-col justify-center items-center">
        <Image
          src="/profile-pfp.png"
          alt="profile-pfp"
          width={0}
          height={0}
          className="w-40 h-40 md:w-60 md:h-60 p-10 border border-black rounded-full"
        />
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-3xl font-semibold">
            {session.data?.user.username ? (session.data.user.username): 'Full Name'}
          </CardTitle>
          <CardDescription className="text-muted-foreground/50">
            Student
          </CardDescription>
        </CardHeader>
      </Card>
      <Button variant="secondary" className="w-full" onClick={() => handleLogout()}>
        <ExitIcon />
        <span>{loading ? 'Loading...' : 'Log Out'}</span>
      </Button>
      <Button onClick={getProfileData}>
        Get Profile Data
      </Button>
    </div>
  );
};

export default Profile;
