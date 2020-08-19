import { h, Component } from 'https://cdn.skypack.dev/preact@^10.4.4';
import { Router } from 'https://cdn.skypack.dev/preact-router@^3.2.1';

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return h('div', null,
      h(Router.Link, { href: '/' }, 'Home'),
      ' ',
      h(Router.Link, { href: '/some' }, 'Some Page'),
      h('h1', null, 'Home Page')
    );
  }

}

export { HomePage };
