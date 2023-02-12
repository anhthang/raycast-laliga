import {
  Action,
  ActionPanel,
  Color,
  Icon,
  Image,
  List,
  showToast,
  Toast,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import groupBy from "lodash.groupby";
import CompetitionDropdown from "./components/competition_dropdown";
import { Match } from "./types";
import { getCurrentGameWeek, getMatches } from "./api";

interface Fixtures {
  [key: string]: Match[];
}

export default function Fixture() {
  const [fixtures, setFixtures] = useState<Fixtures>();
  const [competition, setCompetition] = useState<string>("");
  const [matchday, setMatchday] = useState<number>(0);

  useEffect(() => {
    if (competition) {
      setMatchday(0);
      setFixtures(undefined);

      getCurrentGameWeek(competition).then((gameweek) => {
        setMatchday(gameweek.week);
      });
    }
  }, [competition]);

  useEffect(() => {
    if (matchday) {
      showToast({
        title: `Getting Matchday ${matchday}`,
        style: Toast.Style.Animated,
      });
      getMatches(competition, matchday).then((data) => {
        setFixtures({
          ...fixtures,
          [`Matchday ${matchday}`]: data,
        });
        showToast({
          title: `Matchday ${matchday} Added`,
          style: Toast.Style.Success,
        });
      });
    }
  }, [matchday]);

  return (
    <List
      throttle
      isLoading={!fixtures}
      searchBarAccessory={
        <CompetitionDropdown selected={competition} onSelect={setCompetition} />
      }
    >
      {Object.entries(fixtures || {}).map(([date, results]) => {
        const days: Fixtures = groupBy(results, (m) => {
          return format(new Date(m.date), "eee dd.MM.yyyy");
        });

        return Object.entries(days).map(([day, matches]) => {
          return (
            <List.Section key={`${date} - ${day}`} title={`${date} - ${day}`}>
              {matches.map((match) => {
                let icon: Image.ImageLike;
                if (match.status.toLowerCase().includes("half")) {
                  icon = { source: Icon.Livestream, tintColor: Color.Red };
                } else if (match.status === "FullTime") {
                  icon = { source: Icon.CheckCircle, tintColor: Color.Green };
                } else {
                  icon = Icon.Clock;
                }

                const accessories: List.Item.Accessory[] = [
                  { text: match.venue.name },
                  { icon: "stadium.svg" },
                ];

                return (
                  <List.Item
                    key={match.id}
                    title={format(new Date(match.date), "HH:mm")}
                    subtitle={
                      match.status === "PreMatch"
                        ? `${match.home_team.nickname} - ${match.away_team.nickname}`
                        : `${match.home_team.nickname} ${match.home_score} - ${match.away_score} ${match.away_team.nickname}`
                    }
                    icon={icon}
                    accessories={accessories}
                    actions={
                      <ActionPanel>
                        <Action.OpenInBrowser
                          url={`https://www.laliga.com/en-GB/match/${match.slug}`}
                        />
                        {matchday > 1 && (
                          <Action
                            title="Load Previous Matchday"
                            icon={Icon.MagnifyingGlass}
                            onAction={() => {
                              setMatchday(matchday - 1);
                            }}
                          />
                        )}
                      </ActionPanel>
                    }
                  />
                );
              })}
            </List.Section>
          );
        });
      })}
    </List>
  );
}
