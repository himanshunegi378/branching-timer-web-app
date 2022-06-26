import { TimerCard } from "../../contexts/TimerCards/TimerCards.types";
import { userType } from "../../types/user.types";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});
export const storageApi = {
  save: async (userData: userType, timerCard: TimerCard) => {
    return axiosInstance
      .post("/api/timercard/save", {
        userData,
        timerCardData: timerCard,
      })
      .then(console.log);
  },
  load: async (userData: userType, timerCardId: String) => {
    return axiosInstance
      .post("/api/timercard/load", {
        userData,
        timerCardId: timerCardId,
      })
      .then((res) => res.data);
  },
  delete: async (userData: userType, timerCardId: string) => {
    return axiosInstance
      .post("/api/timercard/delete", {
        userData,
        timerCardId: timerCardId,
      })
      .then((res) => res.data);
  },
};
