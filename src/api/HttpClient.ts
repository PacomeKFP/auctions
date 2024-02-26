import axios from "axios";
import { ConfirmParticipationInterface } from "../interfaces/RequestsInterfaces";
import { AuctionInterface } from "../interfaces/auction";

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

  static getUserWithMail<T extends { _id: string; auction: string }>({
    userMail,
  }: {
    userMail: string;
  }): Promise<Array<T>> {
    return HttpClient.axiosInstance
      .get(`/users/${userMail}`)
      .then((response) => {
        console.log("response ", response);
        if (response.status === 200) return Promise.resolve(response.data.data);
        else {
          console.log(response.data);
          return Promise.reject(response.data);
        }
      })
      .catch((error) => {
        console.error(error.response.data.errors[0]);
        return Promise.reject(error);
      });
  }

  static async getAllAuctionsForUser<
    T extends { data: Array<AuctionInterface<string[]> | null> }
  >({ userMail }: { userMail: string }): Promise<T> {
    return HttpClient.axiosInstance
      .get(`/auctions/user/${userMail}`)
      .then((response) => {
        if (response.status === 200) return Promise.resolve(response.data);
        else {
          console.log(response.data);
          return Promise.reject(response.data);
        }
      })
      .catch((error) => {
        console.error(error.response.data.errors[0]);
        return Promise.reject(error);
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
        if (response.status === 200) return Promise.resolve(response.data);
        else {
          console.log(response.data);
          return Promise.reject(response.data);
        }
      })
      .catch((error) => {
        console.error(error.response.data.errors[0]);
        return Promise.reject(error);
      });
  }

  static async createAuction<T extends { data: unknown }>(
    auctionData: AuctionInterface<string[]>
  ): Promise<T> {
    return HttpClient.axiosInstance
      .post(`/auctions`, auctionData)
      .then((response) => {
        if (response.status === 201) return Promise.resolve(response.data);
        else {
          console.log(response.data);
          return Promise.reject(response.data);
        }
      })
      .catch((error) => {
        console.error(error.response.data.errors[0]);
        return Promise.reject(error);
      });
  }
}
