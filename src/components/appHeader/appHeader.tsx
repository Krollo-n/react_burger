import headerStyles from './appHeader.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, NavLink, useMatch} from 'react-router-dom';

function AppHeader() {
  const homeRoute = useMatch("/");
  const feedOrderRoute = useMatch("/orders");
  const profileRoute = useMatch("/profile");
  return (
    <header className={headerStyles.header} >
      <nav className={headerStyles.container} >       
        <button className={headerStyles.buttonFirst}>
          <NavLink to={'/'} className={({isActive}) => {return `${isActive ? headerStyles.buttonFirst : headerStyles.buttonSecond}`}}>
            <BurgerIcon type={homeRoute ? "primary" : "secondary"}/>
            Конструктор  
          </NavLink>             
        </button>
        <button className={headerStyles.buttonSecond}>
          <NavLink to={'feed'} className={({isActive}) => {return `${isActive ? headerStyles.buttonFirst : headerStyles.buttonSecond}`}}>
            <ListIcon type={feedOrderRoute ? "primary" : "secondary"}/>
            Лента заказов
          </NavLink>
        </button>     
        <div className={headerStyles.logo} >
          <Link to={'/'}>
             <Logo/>
          </Link>
        </div>
        <button className={headerStyles.buttonSecond}>
          <NavLink to={'/profile'} className={({isActive}) => {return `${isActive ? headerStyles.buttonFirst : headerStyles.buttonSecond}`}}>
            <ProfileIcon type={profileRoute ? "primary" : "secondary"}/>
            Личный кабинет 
          </NavLink>             
        </button>
      </nav>
    </header>
    );
}

export default AppHeader;