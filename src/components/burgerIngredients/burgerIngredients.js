import {useState} from 'react';
import {useCallback} from 'react';
import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'; 
import InfoBurgerIngredient from '../infoBurgerIngredient/infoBurgerIngredient';
import {IngredientType} from '../../utils/types'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import {useGetIngredientsQuery} from '../../services/reducers/ingredients';
import {SHOW_INGREDIENT_DETAILS} from '../../services/reducers/currentIngredient';

function BurgerIngredients({ingredientCounter}) {
  const [current, setCurrent] = useState('one');
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch(); 

  const {data} = useGetIngredientsQuery();
  const ingredients = data?.data || []; 

  const handleOpen = useCallback(
    (e, ingredient) => {
      if (e.type === 'click' || e?.key === 'Enter') {
        dispatch(SHOW_INGREDIENT_DETAILS(ingredient));
        setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
  <>
    <section>
      <div className={burgerIngredientsStyles.main}>
        <div className={burgerIngredientsStyles.tabMain}>
          <a key='linkBun' href='#one'>
            <Tab key='tabBun' value="one" active={current === 'one'} onClick={setCurrent} href='#one'>
                Булки
            </Tab>
          </a>
          <a key='linkSauce' href='#two'>
            <Tab key='tabSauce' value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
          </a>
          <a key='linkMain' href='#three'>
            <Tab key='tabMain' value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
          </a>
        </div>
        <div className={burgerIngredientsStyles.container}>
          <section key='bun' className={burgerIngredientsStyles.section}>
            <h2 id='one' className={burgerIngredientsStyles.header}>
              Булки
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                ingredients.filter(({type}) => type==='bun')
                .map((d) => (<InfoBurgerIngredient ingredient={d} key={d._id}
                                                    onOpen={handleOpen}
                                                    ingredientCounter={ingredientCounter}/>))
              }
            </div>
          </section>
          <section key='sauce' className={burgerIngredientsStyles.section}>
            <h2 id='two' className={burgerIngredientsStyles.header}>
              Соусы
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                ingredients.filter(({type}) => type==='sauce')
                .map((d) => (<InfoBurgerIngredient ingredient={d} key={d._id}
                                                    onOpen={handleOpen} ingredientCounter={ingredientCounter}/>))
              }
            </div>
          </section>
          <section key='main' className={burgerIngredientsStyles.section}>
            <h2 id='three' className={burgerIngredientsStyles.header}>
              Начинки
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                ingredients.filter(({type}) => type==='main')
                .map((d) => (<InfoBurgerIngredient ingredient={d} key={d._id}/* _id={d._id}  key={d._id} name={d.name} price={d.price} image={d.image} */
                                                    onOpen={handleOpen}
                                                    ingredientCounter={ingredientCounter}/>))
              }
            </div>
          </section>
        </div>
      </div>
    </section>
   
    {
      isOpen &&
      <Modal id="ingredient-details" isOpen={isOpen} onClose={handleClose}>
          <IngredientDetails/>
      </Modal>
    }
  </> 
  );
}

BurgerIngredients.propTypes = {
  ingredientCounter: PropTypes.instanceOf(Map).isRequired,
}

export default BurgerIngredients;