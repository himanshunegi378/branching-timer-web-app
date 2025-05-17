import NavbarModule from './NavbarModule';

const navbarModule = {
  __init__: ['navbar'],
  __depends__: ['eventBus', 'componentRegistry', 'actions'],
  navbar: ['type', NavbarModule],
};

export default navbarModule;
