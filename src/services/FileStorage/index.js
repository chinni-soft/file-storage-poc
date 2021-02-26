import { urls } from "../../constants";
import axios from "axios";

export const uploadFile = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("file", payload);
    const res = await axios.post(`${urls.uploadFile}`, formData);
    if (res.ok) {
      console.log(res.data);
      alert("File uploaded successfully.");
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllFiles = async () => {
  try {
    const response = await axios.get(`${urls.getAllFiles}`);
    return response.data;
  } catch {
    console.log("error");
  }
};

export const downloadFile = async (fileName) => {
  try {
    // const options = {
    //   url: `${urls.downloadFile}?fileName=${fileName}`,
    //   method: "GET",
    //   responseType: "blob",
    // };
    // const response = await axios.get(`${urls.downloadFile}?fileName=${fileName}`);
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", fileName); //or any other extension
    // document.body.appendChild(link);
    // link.click();

    axios({
      url: `${urls.downloadFile}?fileName=${fileName}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  } catch {
    console.log("error");
  }
};
