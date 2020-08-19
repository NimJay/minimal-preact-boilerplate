/*
This file is loaded by the index.html file.
In here, we take care of defining the Preact app and its pages.
*/

import { h, Component, render } from 'https://cdn.skypack.dev/preact@^10.4.4';
import { Router } from 'https://cdn.skypack.dev/preact-router@^3.2.1';

// Configure this to add new pages.
const PAGES = [
  {
    path: '/',
    componentName: 'HomePage',
    imports: [
      '/js/home-page.js'
    ]
  },
  {
    path: '/some',
    componentName: 'SomePage',
    imports: [
      '/js/some/some-page.js',
      '/js/some/some-tool.js'
    ]
  }
];

const LoadingPage = () => {
  return h('main', null,
    h('p', null, 'Loading...')
  );
};

// This AsyncPage Component is used to lazy-load pages asynchronously.
class AsyncPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      mainComponent: null,
    };
  }

  componentDidMount() {
    this.reloadMainComponent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.reloadMainComponent();
    }
  }

  reloadMainComponent() {
    const { imports, componentName } = this.props;
    this.setState({ mainComponent: null, hasLoaded: false });
    if (!imports) { return; }
    this.importModules(imports)
      .then(([ firstModule ]) => {
        const mainComponent = firstModule[componentName];
        this.setState({ mainComponent, hasLoaded: true });
      });
  }

  importModules(modules) {
    const importPromises = modules.map((modules) => { return import(modules); });
    return Promise.all(importPromises);
  }

  render() {
    if (!this.state.hasLoaded) {
      return h(LoadingPage);
    }
    return h(this.state.mainComponent);
  }

}

// The outer-most (root) Component.
class App extends Component {

  componentDidMount() {
    document.getElementById('app').removeChild(
      document.getElementById('app-loading')
    );
  }

  render() {
    const pages = PAGES.map((page) => h(AsyncPage, page));
    return h(Router, null, ...pages);
  }

}

render(h(App), document.getElementById('app'));
