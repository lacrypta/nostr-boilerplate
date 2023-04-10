import useWebLN from "~/hooks/useWebLN";

export interface TipButtonProps {
  lnURLw: string;
}

export const TipButton = ({ lnURLw }: TipButtonProps) => {
  const { webln } = useWebLN();
  const sendTip = async () => {
    try {
      await webln?.enable();
      await webln?.lnurl(lnURLw);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      className="h-10 w-10 rounded-full bg-white/10 p-2 hover:bg-white/20 active:scale-95 active:bg-white/5"
      onClick={() => void sendTip()}
    >
      <svg fill={"#eeeeee"} viewBox="0 0 32 32">
        <path d="M23.5 13.187h-7.5v-12.187l-7.5 17.813h7.5v12.187l7.5-17.813z"></path>
      </svg>
    </button>
  );
};

export default TipButton;
