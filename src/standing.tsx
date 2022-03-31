import { Action, ActionPanel, List, Icon, Image, Color } from "@raycast/api";
import { useEffect, useState } from "react";
import CompetitionDropdown, {
  competitions,
} from "./components/competition_dropdown";
import ClubDetails from "./components/club";
import { getStandings } from "./api";
import { Standing } from "./types";

export default function GetTables() {
  const [standing, setStandings] = useState<Standing[]>([]);
  const [competition, setCompetition] = useState<string>(competitions[0].value);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setStandings([]);
    setLoading(true);

    getStandings(competition).then((data) => {
      setStandings(data);
      setLoading(false);
    });
  }, [competition]);

  return (
    <List
      throttle
      searchBarAccessory={<CompetitionDropdown onSelect={setCompetition} />}
      isLoading={loading}
    >
      {standing.map((table) => {
        let icon: Image.ImageLike = {
          source: Icon.Dot,
          tintColor: Color.SecondaryText,
        };

        if (table.position < table.previous_position) {
          icon = {
            source: Icon.ChevronUp,
            tintColor: Color.Green,
          };
        } else if (table.position > table.previous_position) {
          icon = {
            source: Icon.ChevronDown,
            tintColor: Color.Red,
          };
        }

        return (
          <List.Item
            key={table.team.id}
            title={`${table.position}. ${table.team.nickname}`}
            subtitle={table.team.shortname}
            accessories={[
              { text: `Played: ${table.played}` },
              { text: `Points: ${table.points}` },
              { icon },
            ]}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Show Club Details"
                  icon={Icon.Sidebar}
                  target={<ClubDetails slug={table.team.slug} />}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
