import React from 'react';
import { Switch } from 'antd';

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publish: true,
    };

    this.handlePublishChange = this.handlePublishChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.doSubmit) {
      this.setState({
        publish: nextProps.publish,
      });
    } else {
      this.props.syncData({ publish: this.state.publish ? 1 : 0 });
    }
  }

  /**
   * 处理 是否发布 switch change
   *
   * @param {any} checked
   * @memberof Publish
   */
  handlePublishChange(checked) {
    if (this.props.userType === 1) {
      this.setState({
        publish: checked,
      });
    }
  }

  render() {
    return (
      <section>
        <span style={{ marginRight: '10px' }}>发布状态</span>
        <Switch
          checkedChildren="保存并发布"
          unCheckedChildren="仅保存"
          onChange={this.handlePublishChange}
          checked={this.state.publish}
        />
      </section>
    );
  }
}

export default Publish;
