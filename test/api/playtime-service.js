import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async createCountry(country) {
    const res = await axios.post(`${this.playtimeUrl}/api/countrys`, country);
    return res.data;
  },

  async deleteAllCountrys() {
    const response = await axios.delete(`${this.playtimeUrl}/api/countrys`);
    return response.data;
  },

  async deleteCountry(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/countrys/${id}`);
    return response;
  },

  async getAllCountrys() {
    const res = await axios.get(`${this.playtimeUrl}/api/countrys`);
    return res.data;
  },

  async getCountry(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/countrys/${id}`);
    return res.data;
  },

  async getAllPointofinterests() {
    const res = await axios.get(`${this.playtimeUrl}/api/pointofinterests`);
    return res.data;
  },

  async createPointofinterest(id, pointofinterest) {
    const res = await axios.post(`${this.playtimeUrl}/api/countrys/${id}/pointofinterests`, pointofinterest);
    return res.data;
  },

  async deleteAllPointofinterests() {
    const res = await axios.delete(`${this.playtimeUrl}/api/pointofinterests`);
    return res.data;
  },

  async getPointofinterest(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/pointofinterests/${id}`);
    return res.data;
  },

  async deletePointofinterest(id) {
    const res = await axios.delete(`${this.playtimeUrl}/api/pointofinterests/${id}`);
    return res.data;
  },
};
