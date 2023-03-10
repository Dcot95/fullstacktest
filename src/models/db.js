import { userMemStore } from "./mem/user-mem-store.js";
import { countryMemStore } from "./mem/country-mem-store.js";
import { pointofinterestMemStore } from "./mem/pointofinterest-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { countryJsonStore } from "./json/country-json-store.js";
import { pointofinterestJsonStore } from "./json/pointofinterest-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { countryMongoStore } from "./mongo/country-mongo-store.js";
import { pointofinterestMongoStore } from "./mongo/pointofinterest-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  countryStore: null,
  pointofinterestStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.countryStore = countryJsonStore;
        this.pointofinterestStore = pointofinterestJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.countryStore = countryMongoStore;
        this.pointofinterestStore = pointofinterestMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.countryStore = countryMemStore;
        this.pointofinterestStore = pointofinterestMemStore;
    }
  },
};
