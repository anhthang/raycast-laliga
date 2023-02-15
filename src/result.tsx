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

export default function Fixture() {
  const [fixtures, setFixtures] = useState<Match[]>();
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
        setFixtures(data);
        showToast({
          title: "Completed",
          style: Toast.Style.Success,
        });
      });
    }
  }, [matchday]);

  const days = groupBy(fixtures, (m) => {
    return format(new Date(m.date), "eee dd.MM.yyyy");
  });

  return (
    <List
      throttle
      isLoading={!fixtures}
      navigationTitle={
        fixtures
          ? `Matchday ${matchday} | Fixtures & Results`
          : "Fixtures & Results"
      }
      searchBarAccessory={
        <CompetitionDropdown selected={competition} onSelect={setCompetition} />
      }
    >
      {Object.entries(days).map(([day, matches]) => {
        return (
          <List.Section key={day} title={day}>
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
                {
                  icon: {
                    source: "stadium.svg",
                    tintColor: Color.SecondaryText,
                  },
                },
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
                      <ActionPanel.Section title="Matchday">
                        {matchday > 1 && (
                          <Action
                            title={`Matchday ${matchday - 1}`}
                            icon={Icon.ArrowLeftCircle}
                            onAction={() => {
                              setMatchday(matchday - 1);
                            }}
                          />
                        )}
                        {matchday < 38 && (
                          <Action
                            title={`Matchday ${matchday + 1}`}
                            icon={Icon.ArrowRightCircle}
                            onAction={() => {
                              setMatchday(matchday + 1);
                            }}
                          />
                        )}
                      </ActionPanel.Section>
                    </ActionPanel>
                  }
                />
              );
            })}
          </List.Section>
        );
      })}
    </List>
  );
}
