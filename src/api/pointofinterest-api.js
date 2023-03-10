import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const pointofinterestApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const pointofinterests = await db.pointofinterestStore.getAllPointofinterests();
        return pointofinterests;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const pointofinterest = await db.pointofinterestStore.getPointofinterestById(request.params.id);
        if (!pointofinterest) {
          return Boom.notFound("No pointofinterest with this id");
        }
        return pointofinterest;
      } catch (err) {
        return Boom.serverUnavailable("No pointofinterest with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const pointofinterest = await db.pointofinterestStore.addPointofinterest(request.params.id, request.payload);
        if (pointofinterest) {
          return h.response(pointofinterest).code(201);
        }
        return Boom.badImplementation("error creating pointofinterest");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.pointofinterestStore.deleteAllPointofinterests();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const pointofinterest = await db.pointofinterestStore.getPointofinterestById(request.params.id);
        if (!pointofinterest) {
          return Boom.notFound("No Pointofinterest with this id");
        }
        await db.pointofinterestStore.deletePointofinterest(pointofinterest._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Pointofinterest with this id");
      }
    },
  },
};
