import {useState} from 'react';
import appStyles from './main.module.css';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';


function Main() {
  const [ingredientCounter, setIngredientCounter] = useState(new Map());

  return (
    <main>
      <div className={appStyles.main}>
        <h1 className={appStyles.header}>Соберите бургер</h1>
        <div className={appStyles["order-selection"]}>
          <BurgerIngredients ingredientCounter={ingredientCounter} />
          <BurgerConstructor
            ingredientCounter={ingredientCounter}
            onIngredientCounter={setIngredientCounter}
          />
        </div>
      </div>
    </main>
  );
}

export default Main;