import useNOSTR from "~/hooks/useNOSTR";
import Button from "../button";

export const NotConnected = () => {
  const { login } = useNOSTR();
  return (
    <div className="space-y-4 text-center">
      <div>Primero necesitas la extensión en el Explorador</div>
      <div className="flex justify-center">
        <Button onClick={() => window.open("https://getalby.com/", "_blank")}>
          Descargar Alby
        </Button>
      </div>

      <div>Conectá la wallet al sitio</div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            void login();
          }}
        >
          Conectar con Alby
        </Button>
      </div>
    </div>
  );
};

export default NotConnected;
