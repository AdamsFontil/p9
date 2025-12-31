import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";



const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );
  console.log('diagnoses obtained---', data);
  return data;
};

export default {
  getDiagnoses
};
