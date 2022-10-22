/* eslint-disable prettier/prettier */
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://todoa-6e60d-default-rtdb.firebaseio.com/todos/",
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
