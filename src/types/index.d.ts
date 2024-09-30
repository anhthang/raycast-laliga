export interface Match {
  id: number;
  name: string;
  slug: string;
  date: Date;
  time: Date;
  home_score: number;
  away_score: number;
  status: string;
  home_team: Team;
  away_team: Team;
  venue: Venue;
  persons_role: PersonsRole[];
  subscription: Subscription;
  temperature: Temperature;
  ball: Ball;
  competitions?: Competition[];
  opta_id: string;
  lde_id: number;
}

export interface Standing {
  played: number;
  points: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: string;
  position: number;
  previous_position: number;
  difference_position: number;
  team: Team;
  qualify?: Qualify;
}

export interface Qualify {
  name: string;
  shortname: string;
  color: string;
}

export interface Team {
  id: number;
  slug: string;
  name: string;
  nickname: string;
  boundname: string;
  shortname: string;
  color: string;
  color_secondary: string;
  shirt_style?: string;
  foundation?: Date;
  address: string;
  web: string;
  twitter: string;
  facebook: string;
  instagram?: string;
  mail?: string;
  phone: string;
  fax?: string;
  sprite_status: string;
  club: Team;
  venue: Venue;
  shield: Shield;
  competitions: Competition[];
  last_main_competition: Competition;
  opta_id: string;
  lde_id: number;
  selector_name: string;
  president?: string;
}

export interface Competition {
  id: number;
  name: string;
  slug: string;
  main: boolean;
}

export interface Shield {
  id: number;
  name: string;
  caption?: string;
  url: string;
  resizes: Resizes;
}

export interface Resizes {
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

export interface Venue {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  capacity: number;
  address: string;
  country: Country;
  image?: Shield;
  timezone: string;
  city: string;
  slug: string;
  opta_id: string;
  lde_id: number;
}

export interface Country {
  id: string;
}

export interface Ball {
  id: number;
  name: string;
  image: string;
}

export interface PersonsRole {
  person: Person;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
}

export interface Squad {
  id: number;
  shirt_number?: number;
  current: boolean;
  loan: boolean;
  loan_to: boolean;
  position: Position;
  team: Team;
  person: Person;
  role: Role;
  photos: Record<string, Record<string, string>>;
  opta_id: string;
  lde_id?: number;
}

export interface Person {
  id: number;
  name: string;
  nickname: string;
  firstname: string;
  lastname: string;
  gender: string;
  date_of_birth: Date;
  place_of_birth?: string;
  weight?: number;
  height?: number;
  international: boolean;
  country?: Country;
  slug: string;
}

export interface Country {
  id: string;
}

export interface Position {
  id: number;
  name: string;
  slug: string;
  plural_name?: string;
  female_name?: string;
  female_plural_name?: string;
}

export interface Role {
  id: number;
  name: string;
  female_name: string;
  slug: string;
}

export interface Subscription {
  id: number;
  name: string;
  slug: string;
  season: string;
  season_name: string;
  year: number;
  teams: Team[];
  rounds: Round[];
  current_gameweek: CurrentGameweek;
  current_gameweek_standing: CurrentGameweek;
  competition: Competition;
}

export interface Round {
  id: number;
  name: string;
  slug: string;
  position: number;
  has_groups: boolean;
  type: string;
  status: string;
  gameweeks: CurrentGameweek[];
  groups: unknown;
  num_gameweeks?: number;
}

export interface CurrentGameweek {
  id: number;
  week: number;
  name: string;
  shortname: string;
  date: Date;
  round?: Round;
}

export interface MatchCommentary {
  id: number;
  content: string;
  time: number;
  minute: number;
  second: number;
  period: string;
  match_comment_kind: MatchCommentKind;
  match: Match;
  lineup?: Lineup;
  lineup_ref_second?: Lineup;
}

export interface Lineup {
  team: Match;
  person: Person;
  opta_id: string;
  lde_id: number;
}

export interface MatchCommentKind {
  id: number;
  name: string;
}
