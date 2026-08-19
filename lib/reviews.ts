export type Review = {
  name: string;
  date: string;
  text: string;
  /** avatar colour pairing */
  tone: string;
};

/** Podmień na link do profilu Google Twojej firmy */
export const GOOGLE_URL = "https://www.google.com/maps/search/?api=1&query=Primero+Studio+Łódź";
export const RATING = "5,0";
export const REVIEW_COUNT = 48;

export const REVIEWS: Review[] = [
  {
    name: "Marek K.",
    date: "2 tygodnie temu",
    text: "Auto wygląda lepiej niż w dniu odbioru z salonu. Lakier jak lustro, wnętrze dopracowane w każdym detalu. Profesjonalizm najwyższej klasy.",
    tone: "bg-wine text-cream",
  },
  {
    name: "Anna W.",
    date: "miesiąc temu",
    text: "Powłoka ceramiczna zrobiła ogromną różnicę — woda spływa sama, a auto łatwiej utrzymać w czystości. Serdecznie polecam!",
    tone: "bg-champagne text-wine-deep",
  },
  {
    name: "Tomasz L.",
    date: "miesiąc temu",
    text: "Świetny kontakt i pełen profesjonalizm. Korekta lakieru usunęła wszystkie rysy. Widać pasję do detali.",
    tone: "bg-ink text-cream",
  },
  {
    name: "Kamil R.",
    date: "2 miesiące temu",
    text: "Detailing wnętrza na najwyższym poziomie — skóra jak nowa. Terminowo i z dbałością o każdy element. Na pewno wrócę.",
    tone: "bg-gold text-wine-deep",
  },
];
