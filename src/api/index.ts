import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { showToast, Toast } from "@raycast/api";
import { LaLiga, Standing } from "../types/standing";

function showFailureToast() {
  showToast(
    Toast.Style.Failure,
    "Something went wrong",
    "Please try again later"
  );
}

export const getStandings = async (
  competition: string
): Promise<Standing[]> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://apim.laliga.com/webview/api/web/subscriptions/${competition}/standing`,
    headers: {
      "Ocp-Apim-Subscription-Key": "ee7fcd5c543f4485ba2a48856fc7ece9",
    },
  };

  try {
    const { data }: AxiosResponse<LaLiga> = await axios(config);

    return data.standings;
  } catch (e) {
    showFailureToast();

    return [];
  }
};
