import Image from "next/image";
import { useProfile } from "nostr-react";

interface ProfileProps {
  pubKey: string;
}

export const Profile = ({ pubKey }: ProfileProps) => {
  const { data: userData } = useProfile({
    pubkey: pubKey,
  });

  console.dir(userData);

  if (!userData) {
    return <div>Cargando perfil...</div>;
  }
  return (
    <div className="text-md flex">
      <div>
        {userData.picture ? (
          <Image alt="" src={userData.picture} width={400} height={400} />
        ) : (
          "No image"
        )}
      </div>
      <div className="flex flex-col">
        <div>Name: {userData?.name}</div>
        <div>Public key: {userData?.npub}</div>
      </div>
    </div>
  );
};

export default Profile;
