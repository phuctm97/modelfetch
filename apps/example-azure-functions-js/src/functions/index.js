import { app } from "@azure/functions";

app.http("index", {
  methods: ["GET", "POST", "DELETE"],
  route: "{*path}",
  authLevel: "anonymous",
  handler: async (request) => {
    const name = request.query.get("name") || (await request.text()) || "world";
    return { body: `Hello, ${name}!` };
  },
});
