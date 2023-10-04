import { Grid, List } from "@raycast/api";

const competitions = [
  {
    title: "LaLiga Santander",
    value: "laliga-santander",
  },
  {
    title: "LaLiga SmartBank",
    value: "laliga-smartbank",
  },
  {
    title: "Liga F",
    value: "primera-division-femenina",
  },
];

const startYear = 2013;
const today = new Date();
const endYear = today.getMonth() > 6 ? today.getFullYear() : today.getFullYear() - 1;

const seasons: { [key: number]: string } = {};
for (let year = startYear; year <= endYear; year++) {
  const seasonEnd = year + 1;
  seasons[year] = `${year}/${Number(seasonEnd.toString().substring(2))}`;
}

export default function CompetitionDropdown(props: {
  type?: string;
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}) {
  const DropdownComponent = props.type === "grid" ? Grid.Dropdown : List.Dropdown;

  return (
    <DropdownComponent tooltip="Filter by Competition" value={props.selected} onChange={props.onSelect}>
      {Object.entries(seasons)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, season]) => {
          return (
            <DropdownComponent.Section key={year} title={season}>
              {competitions.map((competition) => {
                return (
                  <DropdownComponent.Item
                    key={`${competition.value}-${year}`}
                    value={`${competition.value}-${year}`}
                    title={`${competition.title} ${season}`}
                  />
                );
              })}
            </DropdownComponent.Section>
          );
        })}
    </DropdownComponent>
  );
}
