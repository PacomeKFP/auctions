export type DateString = string | Date;

export interface ActionButton {
  label: string;
  path: string;
  color: string;
}

export const actionButtons = {
  dashboard: {
    label: "Tableau de bord",
    path: "/",
    color: "primary",
  },

  history: (auctionCode: string) => {
    return { label: "Retrospective", path: `/history/${auctionCode}`, color: "info" };
  },
};
