export interface PreBadge {
  award: {
    id: string;
    dTag: string;
  };
  definition: { id: string };
  awardedPubKey: string;
  isLoading: boolean;
}

export interface Badge extends PreBadge {
  award: {
    id: string;
    dTag: string;
    created_at: Date;
  };

  definition: {
    id: string;
    owner: string;
    image: string;
    description: string;
  };
  // awardedPubKey: string;
  isLoading: false;
  valid: boolean;
}
