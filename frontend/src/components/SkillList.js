// @flow

import * as React from "react";

import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

type Skill = {
  id: string,
  name: string,
};

type SkillEdges = $ReadOnlyArray<{
  node: Skill,
}>;

export type Area = {
  id: string,
  name: string,
  skills: {
    edges: SkillEdges,
  },
};

type Props = {
  area: Area,
  selected: boolean,
  onSelected: Function,
};

function SkillList({ area, onSelected, selected }: Props): React.Node {
  const [skills, setSkills] = React.useState<Skill[]>([]);

  React.useEffect(() => {
    const skills = area.skills.edges.map((edge) => edge.node);
    setSkills(skills);
  }, [area.skills]);

  return (
    <Alert onClick={onSelected} variant={selected ? "primary" : "light"}>
      <ListGroup>
        <ListGroup.Item key="title" variant="success">
          {area.name}
        </ListGroup.Item>
        {skills.map((skill) => (
          <ListGroup.Item key={skill.id}>{skill.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Alert>
  );
}

export default SkillList;
