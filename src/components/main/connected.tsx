import useNOSTR from "~/hooks/useNOSTR";
import Button from "../button";
import { useRouter } from "next/router";
import { nip19 } from "nostr-tools";
import { useCallback } from "react";

export const Connected = () => {
  const { pubKey } = useNOSTR();
  const router = useRouter();

  const goToProfile = useCallback(() => {
    const npub = nip19.npubEncode(pubKey);
    void router.push(`/${npub}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pubKey]);

  if (!pubKey) {
    return <div>Nothing</div>;
  }

  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-col content-center justify-center">
        <Button onClick={() => void goToProfile()}>Ver Perfil</Button>
      </div>
    </div>
  );
};

export default Connected;
