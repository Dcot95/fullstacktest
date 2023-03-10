import { userApi } from "./api/user-api.js";
import { countryApi } from "./api/country-api.js";
import { pointofinterestApi } from "./api/pointofinterest-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/countrys", config: countryApi.create },
  { method: "DELETE", path: "/api/countrys", config: countryApi.deleteAll },
  { method: "GET", path: "/api/countrys", config: countryApi.find },
  { method: "GET", path: "/api/countrys/{id}", config: countryApi.findOne },
  { method: "DELETE", path: "/api/countrys/{id}", config: countryApi.deleteOne },

  { method: "GET", path: "/api/pointofinterests", config: pointofinterestApi.find },
  { method: "GET", path: "/api/pointofinterests/{id}", config: pointofinterestApi.findOne },
  { method: "POST", path: "/api/countrys/{id}/pointofinterests", config: pointofinterestApi.create },
  { method: "DELETE", path: "/api/pointofinterests", config: pointofinterestApi.deleteAll },
  { method: "DELETE", path: "/api/pointofinterests/{id}", config: pointofinterestApi.deleteOne },
];
