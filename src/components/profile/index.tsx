import Image from "next/image";
import { useProfile } from "nostr-react";
import TipButton from "./tip";

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
    <div className="text-md mb-5 flex flex-col md:flex-row">
      <div className="flex flex-row justify-center">
        {userData.picture ? (
          <Image
            className="h-52 min-h-fit w-52 min-w-fit rounded-full"
            alt=""
            src={userData.picture}
            width={400}
            height={400}
          />
        ) : (
          "No image"
        )}
      </div>
      <div className="flex flex-col p-4 text-lg">
        <div className="text-2xl">{userData?.display_name}</div>
        {userData.about && <div>{userData.about}</div>}
        {userData.nip05 && <div>{userData.nip05}</div>}
        {userData.website && <div>Sitio web: {userData.website}</div>}
        <div className="text-xs">{userData?.npub}</div>
        {userData.lud16 && (
          <div className="flex flex-col justify-end">
            <TipButton lnURLw={userData?.lud16} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
