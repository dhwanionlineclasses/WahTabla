import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";

const Profile = () => {
  return (
    <div className="max-w-[600px] w-[500px] max-h-[92vh] min-h-[400px] h-full bg-white shadow-sm rounded-lg flex flex-col justify-between items-center p-4">
      <Card className="shadow-none border-none flex flex-col justify-center items-center">
        <Image
          src="/profile-pfp.png"
          alt="profile-pfp"
          width={0}
          height={0}
          className="w-60 h-60 p-10 border border-black rounded-full"
        />
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-3xl font-semibold">Anjishnu</CardTitle>
          <CardDescription className="text-muted-foreground/50">
            Student
          </CardDescription>
        </CardHeader>
      </Card>
      <Button variant="secondary" className="w-full">
        <ExitIcon />
        <span>Log Out</span>
      </Button>
    </div>
  );
};

export default Profile;
