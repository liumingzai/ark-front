import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import SceneService from './SceneService';

const ButtonGroup = Button.Group;

function SceneForm(props) {
  const { data } = props;
  return (
    <Form onSubmit={props.handleSubmit}>
      <Row>
        <Col span={8}>
          <span>{data.applicationName}</span>
        </Col>
      </Row>
    </Form>
  );
}

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sceneItem: null,
    };

    this.accountId = JSON.parse(localStorage.getItem('account')).id;
    this.service = new SceneService();
  }

  componentWillMount() {
    this.getAppWhiteList();
  }

  getAppWhiteList() {
    this.service.getAppWhiteList(this.accountId).then((data) => {
      if (data.code === '2000') {
        this.setState({
          data: data.data,
        });

        this.setState({
          sceneItem: data.data[0],
        });
      }
    });
  }

  handleSubmit() {
    console.warn(this.props);
  }

  render() {
    return (
      <section>
        <ButtonGroup>
          {this.state.data.map(item => <Button key={item.id}>{item.applicationName}</Button>)}
        </ButtonGroup>

        {this.state.sceneItem && <SceneForm data={this.state.sceneItem} />}
      </section>
    );
  }
}

export default Scene;
