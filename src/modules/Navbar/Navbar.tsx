import { useInjector } from '../../contexts/InjectorContext';
import useEvent from '../../hooks/useEvent';
import useForceUpdate from '../../hooks/useForceUpdate';
import { Event } from '../Event';
import NavbarModule from './NavbarModule';

const Navbar = () => {
  const injector = useInjector();
  const eventBus: Event = injector.get('eventBus');
  const navbarModule: NavbarModule = injector.get('navbar');
  const forceUpdate = useForceUpdate();
  useEvent(eventBus, 'navbar/itemAdded', () => {
    forceUpdate();
  });

  // visually pleasing navbar with navigation items to right using tailwindcss
  return (
    <nav
      className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono'
      role='navigation'
    >
      <div className='pl-4'>Timer App</div>
      <div className='pr-4'>
        <ul className='flex'>
          {navbarModule.items?.map((item, index) => (
            <li key={index} className='pr-4'>
              {/*  Button that looks like link using tailwind css */}
              <button
                className='text-blue-500 hover:text-blue-800'
                onClick={item.onClick}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
