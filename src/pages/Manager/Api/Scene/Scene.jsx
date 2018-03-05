import React from 'react';
import { Modal, message, Breadcrumb } from 'antd';
import SceneService from './SceneService';

// Components
// import Search from './Search';
import Nav from './Nav';
import SceneForm from './Form';
import Token from './Token';
import Operation from './Operation';

/**
 * 面包屑导航
 *
 * @returns
 */
function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>API管理</Breadcrumb.Item>
      <Breadcrumb.Item>场景管理</Breadcrumb.Item>
    </Breadcrumb>
  );
}

class Scene extends React.Component {
  constructor(props) {
    super(props);
    const account = JSON.parse(localStorage.getItem('account'));
    this.state = {
      data: null,
      sceneItem: null,
      userToken: null,
    };

    this.uid = this.props.uid || account.uid;
    this.userType = account.userType;
    this.service = new SceneService();

    // 绑定作用域
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.deleteAppWhiteList = this.deleteAppWhiteList.bind(this);
    this.handleUserToken = this.handleUserToken.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNavChange = this.handleNavChange.bind(this);
    this.handleAddNewScene = this.handleAddNewScene.bind(this);
    this.handleSyncData = this.handleSyncData.bind(this);
  }

  componentDidMount() {
    this.getAppWhiteList();
  }

  onSubmit() {
    this.putAppWhiteList({
      ...this.state.sceneItem,
      uid: this.uid,
      active: this.state.sceneItem.active ? 'Y' : 'N',
      userToken: this.state.userToken,
    });
  }

  onDelete() {
    Modal.confirm({
      title: '您确定要删除吗？',
      content: '此操作将彻底删除，并且不能恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteAppWhiteList(this.state.sceneItem.appMd5, this.uid);
      },
      onCancel: () => {
        message.success('已取消删除');
      },
    });
  }

  onCancel() {
    const { data } = this.state;
    this.setState({
      sceneItem: data[0],
      userToken: data[0].userToken,
    });
  }

  /**
   * 根据 UID 获取场景
   *
   * @param {string} uid
   * @memberof Scene
   */
  getAppWhiteList(uid) {
    uid = uid || this.uid;
    this.service.getAppWhiteList(uid).then((data) => {
      if (data.code === '2000') {
        data.data = data.data.map(e => ({
          ...e,
          active: e.active === 'Y',
        }));
        this.setState({
          data: data.data,
          sceneItem: data.data[0],
          userToken: data.data[0].userToken,
        });
      }
    });
  }

  /**
   * 新增或更新场景
   *
   * @param {any} data
   * @memberof Scene
   */
  putAppWhiteList(data) {
    let tmp;

    if (data.appMd5) {
      // 更新场景
      if (this.userType === 1) {
        tmp = this.service.adminUpdateAppWhiteList(data);
      } else {
        tmp = this.service.updateAppWhiteList(data);
      }

      tmp.then((res) => {
        if (res.code === '2000') {
          message.success('更新成功');
          // 更新场景list
          const dataTmp = this.state.data.map((e) => {
            if (e.id === this.state.sceneItem.id) {
              return this.state.sceneItem;
            }
            return e;
          });

          this.setState({
            data: dataTmp,
          });
        }
      });
      return;
    } else if (this.userType === 1) {
      // 管理员添加场景
      tmp = this.service.adminAddAppWhiteList(data);
    } else {
      // 注册用户添加场景
      tmp = this.service.addAppWhiteList(data);
    }

    tmp.then((res) => {
      if (res.code === '2000') {
        message.success('添加成功');
        this.getAppWhiteList(); // 新增后，更新所有场景
      }
    });
  }

  /**
   * 删除场景
   *
   * @param {string} appMd5
   * @param {string} uid
   * @memberof Scene
   */
  deleteAppWhiteList(appMd5, uid) {
    this.service.deleteAppWhiteList(appMd5, uid).then((data) => {
      if (data.code === '2000') {
        message.success('删除成功!');
        this.getAppWhiteList();
      }
    });
  }

  handleNavChange(e) {
    const index = e.target.value;
    // 更新 userToken & sceneItem
    this.setState({
      sceneItem: this.state.data[index],
      userToken: this.state.data[index].userToken,
    });
  }

  handleAddNewScene() {
    this.setState({
      sceneItem: {
        applicationName: null,
        description: null,
        wlContent: null,
        active: true,
      },
      userToken: null,
    });
  }

  handleSearch(values) {
    let uid;
    if (values.uid) {
      ({ uid } = values);
    } else {
      ({ uid } = JSON.parse(localStorage.getItem('account')));
    }

    // 设置uid
    this.uid = uid;

    // 根据UID进行场景搜索
    this.getAppWhiteList(uid);
  }

  handleUserToken() {
    this.service.getUserToken().then((data) => {
      if (data.code === '2000') {
        const userToken = data.data;

        this.setState({
          userToken,
        });
      }
    });
  }

  handleSyncData(data) {
    this.setState({
      sceneItem: { ...this.state.sceneItem, ...data },
    });
  }

  render() {
    return (
      <section>
        {/* 面包屑导航 */}
        <BreadNav />

        {/* Search */}
        {/* {this.userType === 1 ? <Search onSearch={this.handleSearch} /> : null} */}

        {/* Nav */}
        {this.state.data && (
          <Nav
            data={this.state.data}
            onNavChange={this.handleNavChange}
            onAddNewScene={this.handleAddNewScene}
          />
        )}

        {/* Form */}
        {this.state.sceneItem && (
          <SceneForm data={this.state.sceneItem} syncData={this.handleSyncData} />
        )}

        {/* Token */}
        <Token token={this.state.userToken} onClick={this.handleUserToken} />

        {/* Operation */}
        <Operation
          type={this.state.sceneItem}
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          onCancel={this.onCancel}
        />
      </section>
    );
  }
}

export default Scene;
