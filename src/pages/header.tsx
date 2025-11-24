import headerStyles from './header.module.css'
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {Outlet} from 'react-router-dom';
import AppHeader from '../components/appHeader/appHeader';

function HeaderPage(){
  return (
    <div className={headerStyles.main}>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        {<Outlet/>}
      </DndProvider>
    </div>
  )
}

export default HeaderPage