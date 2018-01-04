# Ark-front

## Installation And Usage

```bash
git clone git@192.168.1.180:ark-group/ark-front.git

cd ark-front
yarn install

yarn start # start a dev server
yarn start-browser # start a dev server and open default browser
yarn build # build for production
yarn build-analyse # build and generate a stats.json
yarn dll # generate DllPlugin
yarn test # run test
yarn lint # run lint jsx
yarn format # format code: .jsx?, .md, .s?css

yarn server # test build folder, here is dist folder.
```

## Configuration

* npm init & gitignore
* File structure
* commitlint
* eslint
* format(prettier)
* webpack
* Test
* Router
* Common http request and interceptor
* webpack dll

## Commitlint

> The most common commit conventions follow this pattern:

```md
type: subject(lower-case)

<!-- add one space line -->

body?

<!-- add one space line -->

footer?
```

type includes:

```json
["add", "update", "delete", "feat", "fix", "docs", "style", "refactor", "test", "rever"]
```

You could config vim as default editor for git commit, just do:

```bash
git config --global core.editor "vim"
```

## Code styles

* [React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

## Theme

* [antd](https://ant.design/)

## Problems

* [x] Fonts can't load # Make webpack css-loader module: false, [More about css-modules](https://github.com/css-modules/css-modules)
* [x] Jest test conf # Make ReactDom to ReactDOM, word error.
* [ ] redux
* [x] react-router@^4 # [More about dynamic-import](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md)
* [ ] cssnext

## Support Plans

* [ ] GraphQL
* [ ] Apollo + Relay Modern
* [ ] SSH
* [ ] PWA(Service worker)

## More from Ark front end standard product

> Use React@16 to build ProudArk front end standard.

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

[More information about React&TypeScript](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)

## Pre need to konw

* [A re-introduction to JavaScript (JS tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Product Instruction

* [typescript](http://www.typescriptlang.org/) & [typescript chinese](https://www.tslang.cn/index.html)
* [react 16](https://reactjs.org/) & [React 16 Chinese](https://doc.react-china.org/)
* [react-router-dom](https://reacttraining.com/react-router/)
* [react-redux](http://cn.redux.js.org/docs/react-redux/) & [react-redux English](https://redux.js.org/docs/basics/UsageWithReact.html)
* [redux](https://redux.js.org/)
* [material-ui](https://material-ui-next.com/)
* [styled-components](https://www.styled-components.com/)
* font-awesome
* [webpack 3](https://webpack.js.org/)
* [Jest](https://facebook.github.io/jest/)
* [Yarn](https://yarnpkg.com/zh-Hans/)

## Important

* styles [Four ways to style react components](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822)
* 在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。
* 如果你不在 render() 中使用某些东西，它就不应该在状态中。
* 2 type component: function,class
* Lifecircle

```jsx
componentDidMount() {
...
}

componentWillUnmount() {
...
}

componentWillUpdate 和 componentDidUpdate 依然可以被调用
```

* super
  > 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this 的属性之前，我们 一定要调用 super()。 这个是 TypeScript 强制执行的一条重要规则。

```ts
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}
```

super 实际上用在两种语法中:

constructor 内的 super(): 执行父类的构造函数。必须至少执行一次。

一般方法内的 super.method(): 执行父类的 (未必同名的) 方法。不是必需。

* state

不要直接更新状态例如，此代码不会重新渲染组件：

// Wrong

```jsx
this.state.comment = 'Hello';
```

应当使用 setState():

// Correct

```jsx
this.setState({ comment: 'Hello' });
```

构造函数是唯一能够初始化 this.state 的地方。

状态更新可能是异步的
React 可以将多个 setState() 调用合并成一个调用来提高性能。

因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

```jsx
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment,
}));
```

Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识
