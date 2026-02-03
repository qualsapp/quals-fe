import { ReactElement } from "react";

export type Participant = {
  id: string | number;

  isWinner?: boolean;

  name?: string;

  status?: "PLAYED" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | string | null;

  resultText?: string | null;

  [key: string]: any;
};

export type Match = {
  id: number | string;

  /** Link to this match. While onClick() can be used, providing an href
      better supports opening a new tab, or copying a link. * */
  href?: string;

  name?: string;

  nextMatchId: number | string | null;

  nextLooserMatchId?: number | string | null;

  tournamentRoundText?: string;

  startTime: string | null;

  state: "PLAYED" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | string;

  participants: Participant[];

  [key: string]: any;
};

export type Options = {
  width?: number;

  boxHeight?: number;

  canvasPadding?: number;

  spaceBetweenColumns?: number;

  spaceBetweenRows?: number;

  connectorColor?: string;

  connectorColorHighlight?: string;

  roundHeader?: {
    isShown?: boolean;
    height?: number;
    marginBottom?: number;
    fontSize?: number;
    fontColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
    roundTextGenerator?: (
      currentRoundNumber: number,
      roundsTotalNumber: number,
    ) => string | undefined;
  };

  roundSeparatorWidth?: number;

  lineInfo?: {
    separation?: number;
    homeVisitorSpread?: number;
  };

  horizontalOffset?: number;

  wonBywalkOverText?: string;

  lostByNoShowText?: string;
};

export type ComputedOptions = Options & {
  rowHeight?: number;

  columnWidth?: number;
};

export type SvgViewerProps = {
  height: number;

  width: number;

  bracketWidth: number;

  bracketHeight: number;

  children: ReactElement;

  startAt: number[];

  scaleFactor: number;
};

export type MatchComponentProps = {
  match: Match;

  onMatchClick: (args: {
    match: Match;
    topWon: boolean;
    bottomWon: boolean;
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  }) => void;

  onPartyClick: (party: Participant, partyWon: boolean) => void;

  onMouseEnter: (partyId: string | number) => void;

  onMouseLeave: () => void;

  topParty: Participant;

  bottomParty: Participant;

  topWon: boolean;

  bottomWon: boolean;

  topHovered: boolean;

  bottomHovered: boolean;

  topText: string;

  bottomText: string;

  connectorColor?: string;

  computedStyles?: ComputedOptions;

  teamNameFallback: string;

  resultFallback: (participant: Participant) => string;
};

export type ParticipantParams = {
  id: number;
  name: string;
  type: string;
};

export type MatchParams = {
  id: number;
  tournament_bracket_id: number;
  tournament_group_id: number;
  match_rule_id: number;
  participant_a: ParticipantParams;
  participant_b: ParticipantParams;
  status: string;
  court_number: number;
  match_sets: string | null;
};

export type MatchesResponse = {
  matches: MatchParams[];
  page: number;
  page_size: number;
  total: number;
};
