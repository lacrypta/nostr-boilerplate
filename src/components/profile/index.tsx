import Image from "next/image";
import TipButton from "./tip";
import useProfile from "~/hooks/relay/useProfile";
import BadgesList from "../badges";

interface ProfileProps {
  pubKey: string;
}

export const Profile = ({ pubKey }: ProfileProps) => {
  const { data: userData } = useProfile(pubKey);

  if (!userData) {
    return <div>Cargando perfil...</div>;
  }
  return (
    <div className="text-md mb-5 flex flex-col justify-center md:flex-row">
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
        <div className="text-3xl">{userData?.display_name}</div>
        {userData.about && <div>{userData.about}</div>}
        {userData.nip05 && <div>{userData.nip05}</div>}
        {userData.website && (
          <div>
            Sitio web:{" "}
            <a href={userData.website} target="_blank">
              {userData.website}
            </a>
          </div>
        )}
        <div className="text-xs">{userData?.npub}</div>
        {userData.lud16 && (
          <div className="mt-3 flex flex-row justify-center">
            <TipButton lnURLw={userData?.lud16} />
          </div>
        )}
        <div>
          <h2>Badges</h2>
          <BadgesList pubKey={pubKey} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
