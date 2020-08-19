import { h, Component } from 'https://cdn.skypack.dev/preact@^10.4.4';
import { Router } from 'https://cdn.skypack.dev/preact-router@^3.2.1';
import { useSomeTool } from './some-tool.js';

class SomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return h('div', null,
      h(Router.Link, { href: '/' }, 'Home'),
      ' ',
      h(Router.Link, { href: '/some' }, 'Some Page'),
      h('h1', null, 'Some Page'),
      h('p', null, useSomeTool())
    );
  }
}

export { SomePage };
