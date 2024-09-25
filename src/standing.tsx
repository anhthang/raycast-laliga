import { Color, Icon, Image, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useState } from "react";
import { getStandings } from "./api";
import CompetitionDropdown from "./components/competition_dropdown";

export default function GetTables() {
  const [competition, setCompetition] = useState<string>("");

  const { data: standing, isLoading } = usePromise(
    async (competition) => {
      return competition ? await getStandings(competition) : [];
    },
    [competition],
  );

  const isEnded = standing?.every((t) => t.played === 38);

  return (
    <List
      throttle
      isLoading={isLoading}
      searchBarAccessory={<CompetitionDropdown selected={competition} onSelect={setCompetition} />}
      isShowingDetail={true}
    >
      {standing?.map((team) => {
        let icon: Image.ImageLike | undefined;

        if (team.position < team.previous_position) {
          icon = {
            source: Icon.ChevronUpSmall,
            tintColor: Color.Green,
          };
        } else if (team.position > team.previous_position) {
          icon = {
            source: Icon.ChevronDownSmall,
            tintColor: Color.Red,
          };
        } else if (isEnded) {
          icon =
            team.position === 1
              ? {
                  source: Icon.Trophy,
                  tintColor: Color.Orange,
                }
              : undefined;
        } else {
          icon = {
            source: Icon.Dot,
          };
        }

        const accessories: List.Item.Accessory[] = isEnded
          ? [
              {
                text: {
                  color: Color.PrimaryText,
                  value: team.points.toString(),
                },
                icon,
              },
            ]
          : [
              {
                text: {
                  color: Color.PrimaryText,
                  value: team.points.toString(),
                },
              },
              {
                icon,
              },
            ];

        return (
          <List.Item
            key={team.team.id}
            icon={team.team.shield.url}
            title={team.position.toString()}
            subtitle={team.team.nickname}
            keywords={[team.team.nickname, team.team.shortname]}
            accessories={accessories}
            detail={
              <List.Item.Detail
                metadata={
                  <List.Item.Detail.Metadata>
                    {team.qualify && (
                      <List.Item.Detail.Metadata.TagList title="Qualify">
                        <List.Item.Detail.Metadata.TagList.Item text={team.qualify.name} color={team.qualify.color} />
                      </List.Item.Detail.Metadata.TagList>
                    )}
                    <List.Item.Detail.Metadata.Label
                      title="Previous Position"
                      text={team.previous_position.toString()}
                    />
                    <List.Item.Detail.Metadata.Label title="Played" text={team.played.toString()} />
                    <List.Item.Detail.Metadata.Label title="Won" text={team.won.toString()} />
                    <List.Item.Detail.Metadata.Label title="Drawn" text={team.drawn.toString()} />
                    <List.Item.Detail.Metadata.Label title="Lost" text={team.lost.toString()} />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label title="Goals For" text={team.goals_for.toString()} />
                    <List.Item.Detail.Metadata.Label title="Goals Against" text={team.goals_against.toString()} />
                    <List.Item.Detail.Metadata.Label title="Goal Difference" text={team.goal_difference.toString()} />
                  </List.Item.Detail.Metadata>
                }
              />
            }
          />
        );
      })}
    </List>
  );
}
