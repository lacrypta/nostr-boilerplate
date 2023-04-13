export interface PreBadge {
  definition: { author: string; dTag: string; kind: number };
  award: {
    id: string;
  };

  relayUrl: string | undefined;
  awardedPubKey: string;
  isLoading: boolean;
}

export interface Badge extends PreBadge {
  definition: {
    id: string;
    kind: number;
    dTag: string;
    image: string;
    author: string;
    description: string;
  };

  award: {
    id: string;
    created_at: number;
    valid: boolean;
  };
  // awardedPubKey: string;
  isLoading: false;
  valid: boolean;
}
