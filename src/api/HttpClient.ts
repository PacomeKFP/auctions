import axios, { AxiosRequestTransformer } from "axios";
import { AuctionInterface } from "../interfaces/auction";
import { LotInterface } from "../interfaces/lot";
import { ConfirmParticipationInterface } from "../interfaces/RequestsInterfaces";

export default class HttpClient {
  static serverURL = "http://localhost:3000/api";
  static headers = {};

  static axiosInstance = axios.create({
    baseURL: this.serverURL,
    headers: {},
  });

  constructor(public userMail: string) {}

  static getCurrentLotForAuction(auctionCode: string) {
    return HttpClient.axiosInstance
      .get(`/lots/current/${auctionCode}`)
      .then((response) => {
        console.log(" response", response);
        if (response.status === 200) return response.data;
        else {
          console.warn("Error on HTTPClient Request", response.data);
          return null;
        }
      })
      .catch((error) => {
        console.warn(error);
        return null;
      });
  }
  static getAuctionRetro(auctionCode: string) {
    return HttpClient.axiosInstance
      .get(`/auctions/retro/`, { params: { auctionCode } })
      .then((response) => {
        if (response.status === 200) return response.data;
        else {
          console.log(response.data);
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static getUserWithMail(userMail: string) {
    return HttpClient.axiosInstance
      .get(`/users`, {
        params: { userMail },
      })
      .then((response) => {
        if (response.status === 200) return response.data;
        else {
          console.log(response.data);
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static getAllAuctionsForUser(userMail: string) {
    return HttpClient.axiosInstance
      .get(`/auctions/user`, {
        params: { userMail, role: "all" },
      })
      .then((response) => {
        if (response.status === 200) return response.data;
        else {
          console.log(response.data);
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static confirmParticipation(data: ConfirmParticipationInterface) {
    return HttpClient.axiosInstance
      .post(`/auctions/confirm-participation`, data)
      .then((response) => {
        if (response.status === 200) return response.data;
        else {
          console.log(response.data);
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static getAuctionWithCode(auctionCode: string) {
    return HttpClient.axiosInstance
      .get(`/auctions/${auctionCode}`)
      .then((response) => {
        if (response.status === 200) return response.data;
        else {
          console.log(response.data);
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  static createAuction(auctionData: AuctionInterface<string[]>) {
    return HttpClient.axiosInstance
      .post(`/auctions`, auctionData, {
        transformRequest: [
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          (data: AuctionInterface<string[]>, headers) => {
            if (!data.lotWithoutRanks) return;
            data.lots = data.lotWithoutRanks.map((lot: LotInterface, index) => {
              lot.rank = index + 1;
              delete lot.chosen;
              delete lot.id;

              return lot;
            });

            delete data.lotWithoutRanks;

            // S'assurer que le nom de l'admin commence par une majuscule
            data.admin.name =
              data.admin.name.substring(0, 1).toUpperCase() +
              data.admin.name.substring(1);

            //S'assurer que l'admin ne soit pas ajouté comme participant
            data.participants = (data.participants as Array<string>).filter(
              (element) => element !== data.admin.email
            );
            return data;
          },
          ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
        ],
      })
      .then((response) => {
        if (response.status === 201) return response.data;
        else {
          console.log(response.data);
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
