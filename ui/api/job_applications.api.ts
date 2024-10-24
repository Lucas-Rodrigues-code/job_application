import axios from "axios";

import { Application } from "@/app/page";

export async function getApplications(): Promise<Application[] | undefined> {
  try {
    const response = await axios.get("http://localhost:3000/job-application");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

type count = {
  month: string;
  count: number;
};

export async function getApplicationsCountByMonth(
  year: string
): Promise<count[] | undefined> {
  try {
    const response = await axios.get(
      `http://localhost:3000/job-application/count/by-month/${year}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
