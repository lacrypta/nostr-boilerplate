export interface PreBadge {
  definition: { author: string; dTag: string; kind: number };
  award: {
    id: string;
  };

  relayUrl: string | undefined;
  awardedPubKey: string;
}

export interface Badge {
  definition: BadgeDefinition;
  award: BadgeAward;
  relayUrl: string | undefined;
  valid?: boolean;
}

export interface BadgeDefinition {
  id: string;
  kind: number;
  dTag: string;
  image: string;
  author: string;
  description: string;
  name: string;
  thumb: string;
}

export interface BadgeAward {
  id: string;
  created_at: number;
  kind: number;
  awardedPubKeys: string[];
  dTag: string;
  definitionKind: number;
  definitionOwner: string;
}
