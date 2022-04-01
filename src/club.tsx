import { useEffect, useState } from "react";
import { Team } from "./types";
import { getTeams } from "./api";
import CompetitionDropdown, {
  competitions,
} from "./components/competition_dropdown";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import ClubDetails from "./components/club";

export default function Club() {
  const [clubs, setClubs] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [competition, setCompetition] = useState<string>(competitions[0].value);

  useEffect(() => {
    setLoading(true);

    getTeams(competition).then((data) => {
      setClubs(data);
      setLoading(false);
    });
  }, [competition]);

  return (
    <List
      navigationTitle="Clubs | LaLiga"
      throttle
      isLoading={loading}
      searchBarAccessory={<CompetitionDropdown onSelect={setCompetition} />}
    >
      {clubs.map((club) => {
        return (
          <List.Item
            key={club.id}
            title={club.nickname}
            subtitle={club.shortname}
            icon={club.shield.url}
            accessories={[
              { text: club.venue.name },
              { icon: club.venue.image?.url },
            ]}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Show Club Details"
                  icon={Icon.Sidebar}
                  target={<ClubDetails slug={club.slug} />}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}