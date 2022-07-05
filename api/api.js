import axios from "axios";

// const url = "http://192.168.31.70:8000/api"; //office
// const url = "http://10.245.3.224:8000/api"; //lab/
// const url = "http://127.0.0.1:8000/api"; //local
const url = "https://plusapi.herokuapp.com/api"; //heroku

export default class FormsApi {
  //post requests
  async post(i, data) {
    try {
      const res = await axios.post(`${url}${i}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
  async postFormData(i, data) {
    try {
      const res = await axios.post(`${url}${i}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  //get methods
  async get(i) {
    try {
      const res = await axios.get(`${url}${i}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
  async put(i, data) {
    try {
      const res = await axios.put(`${url}${i}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  //delete requests
  async deleteItem(i) {
    try {
      const res = await axios.delete(`${url}${i}`);
      if (res.data.data === "deleted") {
        return "success";
      } else {
        return "failed";
      }
    } catch (error) {
      return "Error";
    }
  }
}
