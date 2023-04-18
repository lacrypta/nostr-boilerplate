import useNOSTR from "~/hooks/useNOSTR";
import Button from "../button";
import { BsArrowRight } from "react-icons/bs";

export const NotConnected = () => {
  const { login } = useNOSTR();
  return (
    <div className="flex justify-evenly lg:w-4/5">
      <div className="text-center m-4">
        {/* <h4 className="text-lg mb-8">¿Es la primera vez por acá?</h4> */}
        <Button onClick={() => window.open("https://getalby.com/", "_blank")}>
          Descarga una wallet
        </Button>
      </div>
      <div className="text-center m-4">
        {/* <h4 className="text-lg mb-8">Si tienes un usuario y una wallet instalada</h4> */}
        <Button
          onClick={() => {
            void login();
          }}
        >
          Conectar a Nostr
        </Button>
      </div>
    </div>
  );
};

export default NotConnected;
