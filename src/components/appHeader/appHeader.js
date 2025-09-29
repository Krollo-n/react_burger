import React from 'react';
import headerStyles from './appHeader.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header} >
        <nav className={headerStyles.container} >
          <button className={headerStyles.buttonFirst}>
            <BurgerIcon type="primary"/>
            Конструктор               
          </button>
          <button className={headerStyles.buttonSecond}>
            <ListIcon type="secondary"/>
            Лента заказов
          </button>     
          <div className={headerStyles.logo} >
            <Logo/>
          </div>
          <button className={headerStyles.buttonSecond}>
            <ProfileIcon type="secondary"/>
            Личный кабинет               
          </button>
        </nav>
      </header>
    );
  }
}

export default AppHeader;