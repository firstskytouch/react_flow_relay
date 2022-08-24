const request = require("supertest");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");

test("Area query", async () => {
  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
    })
  );

  const query = `
    query {
      frontEnd {
        name
        skills {
          edges {
            node {
              name
            }
          }
        }
      }
      backEnd {
        name
        skills {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  `;

  const response = await request(app)
    .post("/graphql")
    .type("json")
    .send(JSON.stringify({ query }));

  expect(response.statusCode).toEqual(200);

  expect(JSON.parse(response.text)).toEqual({
    data: {
      frontEnd: {
        name: "Front End",
        skills: {
          edges: ["React", "CSS", "HTML", "Enzyme"].map((name) => ({
            node: { name },
          })),
        },
      },
      backEnd: {
        name: "Back End",
        skills: {
          edges: ["Node.js", "Python", "MongoDB", "PostgreSQL"].map((name) => ({
            node: { name },
          })),
        },
      },
    },
  });
});
