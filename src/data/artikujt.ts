export type Artikull = {
  id: string;
  titulli: string;
  pershkrimi: string;
};

export const artikujt: Artikull[] = [
  {
    id: "1",
    titulli: "Komponentët në React Native",
    pershkrimi: "Komponentët janë pjesë të vogla që ndërtojnë ekranin e aplikacionit.",
  },
  {
    id: "2",
    titulli: "Variablat me let",
    pershkrimi: "Ndryshimi i një variabli let nuk e rifreskon vetë ekranin.",
  },
  {
    id: "3",
    titulli: "Gjendja me useState",
    pershkrimi: "useState ruan një vlerë dhe rifreskon ekranin kur ajo ndryshon.",
  },
  {
    id: "4",
    titulli: "FlatList",
    pershkrimi: "FlatList shfaq lista në mënyrë efikase në telefon.",
  },
  {
    id: "5",
    titulli: "Expo Router",
    pershkrimi: "Expo Router hap ekrane të ndryshme përmes adresave të aplikacionit.",
  },
];

export function gjeArtikullin(id: string | string[] | undefined) {
  const artikullId = Array.isArray(id) ? id[0] : id;
  return artikujt.find((artikull) => artikull.id === artikullId);
}
