import useNOSTR from "~/hooks/useNOSTR";
import Button from "../button";
import Profile from "../profile";

export const Connected = () => {
  const { pubKey } = useNOSTR();
  if (!pubKey) {
    return <div>Nothing</div>;
  }
  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-col content-center justify-center">
        <Profile pubKey={pubKey} />
        <Button onClick={() => alert("Estamos laburando. No seas ansiosa")}>
          Ohh yeahhh
        </Button>
      </div>
    </div>
  );
};

export default Connected;
