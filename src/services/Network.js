import axios from "axios";
import { BASE_URL_DEV } from "../constants/constants";

axios.defaults.withCredentials = true;

class Network {
  constructor(headers, data, baseUrl = BASE_URL_DEV) {
    this.data = data;
    // this.baseURL=  process.env.NODE_ENV === "development" ? `${LOCAL_HOST}:${PORT}`: `${PROD_API}`;
    this.baseURL = baseUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
      headers: headers,
    });
  }

  // create a function to get data

  // create a get request
  get(path) {
    return axios.get(
      this.baseURL + path,
      {
        headers: this.client.headers,
      }
      // return this.client.get(path);
    );
  }

  // create a post request
  async post(path, data) {
    // console.log("making a post request");
    // console.log("data", data, path);
    // return this.client.post(path, data);
    const resp = await axios.post(
      this.baseURL + path,
      data,
      {
        headers: this.client.headers,
      }, { withCredentials: true }
      // return this.client.get(path);
    );
    console.log(resp.headers)
    return resp;
  }

  // create a put request
  put(path, data) {
    return this.client.put(path, data);
  }

  // create a delete request
  delete(path) {
    return this.client.delete(path);
  }
}

export default Network;