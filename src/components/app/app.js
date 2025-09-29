import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import data from '../../utils/data.json';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main>
          <div className={appStyles.main}>
            <h1 className={appStyles.header}>Соберите бургер</h1>
            <div className={appStyles['order-selection']}>
              <BurgerIngredients data={data}/>
              <BurgerConstructor data={data}/> 
            </div>
         </div>
        </main>
      </div>
    );
  }
}
/* test commit sprint-1 */
export default App;