import {useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import {useGetIngredientsQuery} from "../../services/reducers/ingredients"; 
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  const { data, status, isFetching, isLoading, error } = useGetIngredientsQuery();  
  const [ingredientCounter, setIngredientCounter] = useState(new Map());

  if (isLoading ) {
    return <div>Loading data...</div>;
  }  

  if (error) {
    return <div>Error: {error.message}</div>;
  }  

  return (
    <div>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main>
          <div className={appStyles.main}>
            <h1 className={appStyles.header}>Соберите бургер</h1>
            <div className={appStyles['order-selection']}>
              <BurgerIngredients ingredientCounter={ingredientCounter}/>
              <BurgerConstructor ingredientCounter={ingredientCounter}  onIngredientCounter={setIngredientCounter} /> 
            </div>
        </div>
        </main>
      </DndProvider>
    </div>
  );
}

export default App;