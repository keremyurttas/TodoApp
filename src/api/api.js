/* eslint-disable prettier/prettier */
import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    "https://vuejs-vue-resource-6f650-default-rtdb.firebaseio.com/discussions",
});

export async function api(params) {
  try {
    const { data } = await axiosClient[params.method](
      params.URL,
      params.body || null
    );
    return [null, data];
  } catch (error) {
    return [error];
  }
}
