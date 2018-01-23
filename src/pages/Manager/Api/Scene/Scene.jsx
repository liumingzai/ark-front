import React from 'react';
import { Button, Modal, message } from 'antd';
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

    const account = JSON.parse(localStorage.getItem('account'));
    this.accountId = account.id;
    this.userType = account.userType;
    this.service = new SceneService();
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.deleteAppWhiteList = this.deleteAppWhiteList.bind(this);
    this.onAddNewScene = this.onAddNewScene.bind(this);
    this.handleUserToken = this.handleUserToken.bind(this);
  }

  componentDidMount() {
    this.getAppWhiteList();
  }

  onSubmit(data) {
    const formatData = { accountId: this.accountId };
    Object.keys(data).forEach((key) => {
      formatData[key] = data[key].value;
    });
    formatData.active = formatData.active === true ? 'Y' : 'N';
    console.warn(formatData.appMd5);
    if (formatData.appMd5) {
      // update
      if (this.userType === 1) {
        this.adminupdateAppWhiteList(formatData);
      } else {
        this.updateAppWhiteList(formatData);
      }
    } else if (this.userType === 1) {
      // admin new add
      this.adminAddAppWhiteList(formatData);
    } else {
      // common user add
      this.addAppWhiteList(formatData);
    }
  }

  onDelete(appMd5, accountId) {
    Modal.confirm({
      title: '您确定要删除吗？',
      content: '此操作将彻底删除，并且不能恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteAppWhiteList(appMd5, accountId);
      },
      onCancel: () => {
        message.success('Cancel success');
      },
    });
  }

  onAddNewScene() {
    this.setState({
      sceneItem: {},
    });
  }

  getAppWhiteList() {
    this.service.getAppWhiteList(this.accountId).then((data) => {
      if (data.code === '2000') {
        data.data.map(e => ({
          ...e,
          active: e.active === 'Y',
        }));
        this.setState({
          data: data.data,
        });

        this.setState({
          sceneItem: data.data[0],
        });
      }
    });
  }

  updateAppWhiteList(p) {
    this.service.updateAppWhiteList(p).then((data) => {
      if (data.code === '2000') {
        message.success('Update success');
      }
    });
  }

  adminupdateAppWhiteList(p) {
    this.service.adminUpdateAppWhiteList(p).then((data) => {
      if (data.code === '2000') {
        message.success('Update success');
      }
    });
  }

  addAppWhiteList(p) {
    this.service.addAppWhiteList(p).then((data) => {
      if (data.code === '2000') {
        message.success('Add success');
        this.getAppWhiteList();
      }
    });
  }

  adminAddAppWhiteList(p) {
    this.service.adminAddAppWhiteList(p).then((data) => {
      if (data.code === '2000') {
        message.success('Add success');
        this.getAppWhiteList();
      }
    });
  }

  deleteAppWhiteList(appMd5, accountId) {
    this.service.deleteAppWhiteList(appMd5, accountId).then((data) => {
      if (data.code === '2000') {
        message.success('Delete success!');
        this.getAppWhiteList();
      }
    });
  }

  handleChange(e) {
    const index = e.target.getAttribute('name');
    this.setState({
      sceneItem: this.state.data[index],
    });
  }

  handleUserToken(appMd5) {
    this.service.getUserToken().then((data) => {
      if (data.code === '2000') {
        const userToken = data.data;
        const dataArray = this.state.data.map((e) => {
          if (e.appMd5 === appMd5) {
            return {
              ...e,
              userToken,
            };
          }
          return e;
        });

        const sceneItem = dataArray.filter(item => item.appMd5 === appMd5)[0];

        this.setState({
          data: dataArray,
          sceneItem: { ...sceneItem },
        });
      }
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
          <Button type="primary" onClick={this.onAddNewScene}>
            Add new
          </Button>
        </div>

        {this.state.sceneItem && (
          <SceneForm
            onSubmit={this.onSubmit}
            onDelete={this.onDelete}
            data={this.state.sceneItem}
            generateUserToken={this.handleUserToken}
          />
        )}
      </section>
    );
  }
}

export default Scene;
