import { MouseEvent, useState } from 'react';
import { TripleDashMenu } from '../../../component/atoms/TripleDashMenu';
import { Menu, MenuItem } from '../../../component/molecules/Menu';
import { useInjector } from '../../../contexts/InjectorContext';
import { TimerMenuModule } from '../TimerMenuModule';
import useDataStore from '../../../hooks/useDataStore';
import { ActionType } from '../../Actions/Actions';

const TimerMenu = (props: any) => {

  const injector = useInjector();
  const timerMenuModule = injector.get('timerMenu') as TimerMenuModule;
  const actions: ActionType = injector.get('actions');
  const menuItemList = useDataStore(
    timerMenuModule.dataStore,
    timerMenuModule.MENU_LIST_KEY
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTripleDashMenuClick = (event: MouseEvent<HTMLElement>): void => {
    // toggle the anchor element if it's not already set
    // otherwise, unset it
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <TripleDashMenu onClick={handleTripleDashMenuClick} />
      <Menu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        isOpen={Boolean(anchorEl)}
      >
        {Object.values<{
          id: string;
          label: string;
          action: string;
        }>(menuItemList).map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              actions.invoke(item.action, 0, {
                ...props
              });
              setAnchorEl(null);
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TimerMenu;
