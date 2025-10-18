import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
/* import {useGetIngredientsQuery} from "../../services/reducers/ingredients";  */
import {getIngredients} from "../../services/reducers/ingredients"; 
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  const [ingredientCounter, setIngredientCounter] = useState(new Map());
  const dispatch = useDispatch()
  const {requested} = useSelector(state => state.ingredients)
  useEffect(() => {
      dispatch(getIngredients())
  }, [dispatch])

  if (requested) {
    return <div>Loading data...</div>;
  }  

  /*if (error) {
    return <div>Error: {error.message}</div>;
  }  */ 

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