import React from 'react';
import { Button } from 'antd';
import SceneService from './SceneService';
import SceneForm from './SceneForm';

const ButtonGroup = Button.Group;

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sceneItem: null,
    };

    this.accountId = JSON.parse(localStorage.getItem('account')).id;
    this.service = new SceneService();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
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

  handleChange(e) {
    const index = e.target.getAttribute('name');
    this.setState({
      sceneItem: this.state.data[index],
    });
  }

  render() {
    return (
      <section>
        <div className="flex flex-h-between">
          <ButtonGroup>
            {this.state.data.map((item, index) => (
              <Button key={item.id} name={index} onClick={this.handleChange}>
                {item.applicationName}
              </Button>
            ))}
          </ButtonGroup>
          <Button type="primary">Add new</Button>
        </div>

        {this.state.sceneItem && <SceneForm data={this.state.sceneItem} />}
      </section>
    );
  }
}

export default Scene;
