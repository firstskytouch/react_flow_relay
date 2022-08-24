const request = require("supertest");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");

function generateMutation(areaId, skillName) {
  return `
    mutation {
      introduceSkill(input: {
        skillName: "${skillName}",
        areaId: "${areaId}"
      }) {
        area {
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
    }
  `;
}

test("Adding a Front End Skill", async () => {
  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
    })
  );

  let query = `
    query AreaQuery {
      frontEnd {
        id
      }
      backEnd {
        id
      }
    }
  `;

  let response = await request(app)
    .post("/graphql")
    .type("json")
    .send(JSON.stringify({ query }));

  expect(response.statusCode).toEqual(200);
  const frontEndAreaId = JSON.parse(response.text).data.frontEnd.id;
  const backEndAreaId = JSON.parse(response.text).data.backEnd.id;

  query = generateMutation(frontEndAreaId, "Javascript");

  response = await request(app)
    .post("/graphql")
    .type("json")
    .send(JSON.stringify({ query }));

  expect(JSON.parse(response.text)).toEqual({
    data: {
      introduceSkill: {
        area: {
          name: "Front End",
          skills: {
            edges: [
              "React",
              "CSS",
              "HTML",
              "Enzyme",
              "Javascript",
            ].map((name) => ({ node: { name } })),
          },
        },
      },
    },
  });

  query = generateMutation(backEndAreaId, "Django");

  response = await request(app)
    .post("/graphql")
    .type("json")
    .send(JSON.stringify({ query }));

  expect(JSON.parse(response.text)).toEqual({
    data: {
      introduceSkill: {
        area: {
          name: "Back End",
          skills: {
            edges: [
              "Node.js",
              "Python",
              "MongoDB",
              "PostgreSQL",
              "Django",
            ].map((name) => ({ node: { name } })),
          },
        },
      },
    },
  });
});
