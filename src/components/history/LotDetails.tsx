import { LotInterface } from "../../interfaces/lot"
import { getBestBid } from "../../screens/history/History.logic"
import Utils from "../../utils/utils"


export const LotDetails = ({ lot, currency }: { lot: LotInterface, currency: string }): React.JSX.Element => {
  const data: Record<string, string | number> = {
    "Name": lot.name,
    "Description": lot.description,
    "Mise à prix": Utils.formatNumber({
      number: lot.bounty,
      currency: currency,
    }),
    "Status": lot.status || "PENDING",
    "Montant Meilleure offre": getBestBid(lot.bids || [])
  };

  return <ul>
    {Object.keys(data).map((key) => <li key={key}>{key}: {String(data[key])}</li>)}
  </ul>
}
