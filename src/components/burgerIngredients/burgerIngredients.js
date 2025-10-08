import {useEffect} from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'; 
import InfoBurgerIngredient from '../infoBurgerIngredient/infoBurgerIngredient';
import {IngredientType} from '../../utils/types'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

function BurgerIngredients({data}) {
  const [current, setCurrent] = useState('one');
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(
    (e, id) => { 
      if (e.type === 'click') {
        setSelectedIngredient(data.find((ingredient) => ingredient._id === id));
        setIsOpen(true);
      }
    },
    [data]
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) return;
    setSelectedIngredient({});
  }, [isOpen]);

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
                data.filter(({type}) => type==='bun')
                .map((d) => (<InfoBurgerIngredient _id={d._id} key={d._id} name={d.name} price={d.price} image={d.image}
                                                    onOpen={handleOpen}/>))
              }
            </div>
          </section>
          <section key='sauce' className={burgerIngredientsStyles.section}>
            <h2 id='two' className={burgerIngredientsStyles.header}>
              Соусы
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                data.filter(({type}) => type==='sauce')
                .map((d) => (<InfoBurgerIngredient _id={d._id} key={d._id} name={d.name} price={d.price} image={d.image}
                                                    onOpen={handleOpen}/>))
              }
            </div>
          </section>
          <section key='main' className={burgerIngredientsStyles.section}>
            <h2 id='three' className={burgerIngredientsStyles.header}>
              Начинки
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                data.filter(({type}) => type==='main')
                .map((d) => (<InfoBurgerIngredient _id={d._id}  key={d._id} name={d.name} price={d.price} image={d.image}
                                                    onOpen={handleOpen}/>))
              }
            </div>
          </section>
        </div>
      </div>
    </section>
   
    {
      isOpen &&
      <Modal id="ingredientDetails" isOpen={isOpen} onClose={handleClose}>
          <IngredientDetails data={selectedIngredient} />
      </Modal>
    }
  </> 
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IngredientType)).isRequired
}

export default BurgerIngredients;