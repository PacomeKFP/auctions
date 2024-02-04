import { LotInterface } from "../../interfaces/lot";

export const getRemainingTime = (lot: LotInterface) => {
  if (lot.bids && lot.bids[0].createdAt) {
    return (
      new Date(lot.bids[0].createdAt).getSeconds() +
      lot.awardDeadline -
      Math.floor(Date.now() / 1000)
    );
  } else return Number.MAX_VALUE;
};

export const getColor = (index: number) => {
  switch (index) {
    case 0:
      return "bg-warning";
    default:
      return "bg-danger";
  }
};

export const getCurrentLot = () => {
  return {
    name: "Lot 1",
    description: "Description du lot",
    bounty: 100,
    awardDeadline: 6000,
    currency: "EUR",
    bids: [
      // les 5 dernieres offres classées de la plus recente à la plus ancienne
      {
        _id: "aeae12025cd12",
        amount: 150,
        user: "PacomeK",
        lot: "sqsqdqsdqsd",
        date: new Date(),
        createdAt: "2023-12-27T02:21:20.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },

      {
        _id: "aeae12025c12d",
        amount: 1000,
        lot: "sqsqdqsdqsd",
        date: new Date(),
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:18.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },

      {
        _id: "aeae1452025cd",
        amount: 2050,
        lot: "sqsqdqsdqsd",
        date: new Date(),
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:16.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },

      {
        _id: "aea26e12025cd",
        amount: 10,
        lot: "sqsqdqsdqsd",
        date: new Date(),
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:14.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },
      {
        _id: "ae781ae12025cd",
        amount: 50,
        lot: "sqsqdqsdqsd",
        date: new Date(),
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:13.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },
    ],
  };
};
