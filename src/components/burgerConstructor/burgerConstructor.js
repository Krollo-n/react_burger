import {useNavigate} from 'react-router-dom';
import {getCurrentBun} from '../../services/selectors/currentIngredients';
import {getCurrentIngredients} from '../../services/selectors/currentIngredients';
import {useState} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css'; 
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';  
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'; 
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import {useDispatch, useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';
import {v4 as uuidv4} from 'uuid';
import {addOrder} from '../../services/reducers/orderDetails';
import {getStatus} from '../../services/selectors/orderDetails'; 
import {isFailed} from '../../services/selectors/orderDetails'; 
import {isRequested} from '../../services/selectors/orderDetails';
import {isSuccess} from '../../services/selectors/orderDetails';
import {ADD_INGREDIENT} from '../../services/reducers/currentIngredients';
import {DELETE_INGREDIENT} from '../../services/reducers/currentIngredients';
import {RESET} from '../../services/reducers/currentIngredients';
import CurrentBurgerIngredient from '../currentBurgerIngredient/currentBurgerIngredient';
let prevBunId = '';

function BurgerConstructor({ingredientCounter, onIngredientCounter}) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [prevBunPrice, setPrevBunPrice] = useState(0);
  const status = useSelector(getStatus);
  const failed = useSelector(isFailed);
  const requested = useSelector(isRequested);
  const success = useSelector(isSuccess);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user.user);

  const handleClose = () => {
    setIsOpen(false);
    onIngredientCounter(new Map());
    setTotalPrice(0);
    dispatch(RESET());
  };

  const handleOrder = (evt) => {
    evt.preventDefault();

    if (!user) {
      navigate('/login');
    } else
    {
      dispatch(addOrder({bun: currentBun, ingredients: currentIngredients}));
      setIsOpen(true);
    }
  };

  const deleteIngredient = ({key, _id, price}) => {
    dispatch(DELETE_INGREDIENT({key}));
    const value = ingredientCounter.get(_id) - 1;
    onIngredientCounter(new Map(ingredientCounter.set(_id, value)));
    onDecreaseTotalPrice(price);
  };

  const currentBun = useSelector(getCurrentBun);
  const currentIngredients = useSelector(getCurrentIngredients);

  const increaseIngredientCounter = ({_id, type}) => {
    let value = ingredientCounter.get(_id);
    if (type === 'bun' && value) return 2;
    if (type === 'bun') {
      ingredientCounter.set(prevBunId, 0);
      prevBunId = _id;
      return 2;
    }
    value = value ? (value += 1) : 1;
    return value;
  };

  const onIncreaseTotalPrice = ({type, price}) => {
    if (type === 'bun') {
      const bunPrice = price * 2;
      if (prevBunPrice) {
        setTotalPrice(totalPrice - prevBunPrice + bunPrice);
        setPrevBunPrice(bunPrice);
      } else {
        setTotalPrice(totalPrice + bunPrice);
        setPrevBunPrice(bunPrice);
      }
    } else {
      setTotalPrice(totalPrice + price);
    }
  };

  const onDecreaseTotalPrice = (price) => {
    setTotalPrice(totalPrice - price);
  };

  const [{isOver, ingredientTypeDrop}, drop] = useDrop(
    () => ({
      accept: 'ingredient',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        ingredientTypeDrop: monitor.getItem()?.type,
      }),
      drop: (ingredient) => {
        dispatch(ADD_INGREDIENT({ingredient, key: uuidv4()}));
        onIngredientCounter(
          new Map(
            ingredientCounter.set(
              ingredient._id,
              increaseIngredientCounter(ingredient)
            )
          )
        );
        onIncreaseTotalPrice(ingredient);
      },
    }),
    [ingredientCounter]
  );

  return (
     <> 
      <section>
        <form className={burgerConstructorStyles.order} ref={drop} onSubmit={handleOrder}>
            {((currentBun && (
                <ConstructorElement
                  extraClass={burgerConstructorStyles.fix}
                  type="top"
                  isLocked={true}
                  text={`${currentBun?.name} (${'верх'})`}
                  price={currentBun?.price}
                  thumbnail={currentBun?.image}
                />
              )) || (
                <div
                  className={`${burgerConstructorStyles.emptyBun} ${burgerConstructorStyles.elementTop}${
                    (isOver && ingredientTypeDrop === 'bun' && ` ${burgerConstructorStyles.drop}`) || ''}`}>
                  <span className={burgerConstructorStyles.neon}>Выберите булку</span>
                </div>
              )
            )}
            {(currentIngredients.length && (
                <div className={burgerConstructorStyles.components}>
                  {currentIngredients.map((ingredient, index) => (
                    <CurrentBurgerIngredient
                      key={`component-${ingredient.key}`}
                      ingredient={ingredient}
                      index={index}
                      deleteIngredient={() => deleteIngredient(ingredient)}
                    />
                  ))}
                </div>
              )) || (
                <div className={`${burgerConstructorStyles.empty}${(isOver &&  ingredientTypeDrop !== 'bun' && ` ${burgerConstructorStyles.drop}`) || ''}`}>
              <span className={burgerConstructorStyles.neon}>Выберите начинку</span>
            </div>
          )}
            {((currentBun && (
                <ConstructorElement
                  extraClass={burgerConstructorStyles.fix}
                  type="bottom"
                  isLocked={true}
                  text={`${currentBun?.name} (${'низ'})`}
                  price={currentBun?.price}
                  thumbnail={currentBun?.image}
                />
              )) || (
                <div
                  className={`${burgerConstructorStyles.emptyBun} ${burgerConstructorStyles.elementBottom}${
                    (isOver && ingredientTypeDrop === 'bun' && ` ${burgerConstructorStyles.drop}`) || '' }`}>
                  <span className={burgerConstructorStyles.neon}>Выберите булку</span>
                </div>
              )
            )}
        <div className={burgerConstructorStyles.final}>
            <div className={burgerConstructorStyles.total}>
                <span className="text text_type_digits-medium">{totalPrice}</span>
                <CurrencyIcon/>
            </div>
            <Button htmlType="submit" type="primary" size="large">
                {requested ? 'Загрузка...' : 'Оформить заказ'}
            </Button>
        </div>
        {failed && <p className={'text text_color_error text_type_main-default'}>Ошибка в заказе</p>}
       </form> 
      </section>

      {success &&
        <Modal id="orderDetails" isOpen={isOpen} onClose={handleClose} onLoading={status} >
          <OrderDetails/>
        </Modal>}
     </> 
    );
}

BurgerConstructor.propTypes = {
  ingredientCounter: PropTypes.instanceOf(Map).isRequired,
  onIngredientCounter: PropTypes.func.isRequired,
}

export default BurgerConstructor;