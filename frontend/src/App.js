// @flow

import * as React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import SkillList from "./components/SkillList";
import Environment from "./relay/Environment";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./App.css";

function App(): React.Node {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql`
        query AppQuery {
          backEnd {
            id
            name
            skills {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
          frontEnd {
            id
            name
            skills {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <Alert variant="danger">Server Error</Alert>;
        }
        if (!props) {
          return (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
        }
        const { frontEnd, backEnd } = props;

        return (
          <Container>
            <h1 className="mb-4">Skill List App</h1>
            <Row>
              <SkillList query={frontEnd} />
              <SkillList query={backEnd} />
            </Row>
          </Container>
        );
      }}
    />
  );
}

export default App;
