import { testServer } from "../../server.js";

export default {
  port: 3003,
  async fetch(request) {
    return await testServer(request);
  },
};
