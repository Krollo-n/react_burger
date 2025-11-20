import {useNavigate} from 'react-router-dom';
import {getCurrentBun} from '../../services/selectors/currentIngredients';
import {getCurrentIngredients} from '../../services/selectors/currentIngredients';
import {useState} from 'react';
import burgerConstructorStyles from './burgerConstructor.module.css'; 
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';  
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'; 
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/useAppDispatch";
import {useDrop} from 'react-dnd';
import {v4 as uuidv4} from 'uuid';
import {addOrder} from '../../services/reducers/orderDetails';
import {isFailed} from '../../services/selectors/orderDetails'; 
import {isRequested} from '../../services/selectors/orderDetails';
import {isSuccess} from '../../services/selectors/orderDetails';
import {addIngeredient, deleteCurrentIngredient, reset} from '../../services/reducers/currentIngredients';
import CurrentBurgerIngredient from '../currentBurgerIngredient/currentBurgerIngredient';
import {FC, FormEvent} from 'react';
import {IIngredientKey, IIngredient} from "../../utils/types";
let prevBunId = '';

interface IBurgerConstructorProps {
  ingredientCounter: Map<string, number>;
  onIngredientCounter: (c: Map<string, number>) => void
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ingredientCounter, onIngredientCounter}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [prevBunPrice, setPrevBunPrice] = useState(0);
  const failed = useAppSelector(isFailed);
  const requested = useAppSelector(isRequested);
  const success = useAppSelector(isSuccess);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(store => store.user.user); 

  const handleClose = () => {
    setIsOpen(false);
    onIngredientCounter(new Map());
    setTotalPrice(0);
    dispatch(reset());
  };

  const handleOrder = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!user) {
      navigate('/login');
    } else
    {
      dispatch(addOrder({bun: currentBun, ingredients: currentIngredients}));
      setIsOpen(true);
    }
  };

  const deleteIngredient = (ingredient:IIngredientKey) => {
    dispatch(deleteCurrentIngredient(ingredient.key));
    const value = ingredientCounter.get(ingredient._id) - 1;
    onIngredientCounter(new Map(ingredientCounter.set(ingredient._id, value)));
    onDecreaseTotalPrice(ingredient.price);
  };

  const currentBun = useAppSelector(getCurrentBun);
  const currentIngredients = useAppSelector(getCurrentIngredients);

  const increaseIngredientCounter = (ingredient:IIngredient) => {
    let value = ingredientCounter.get(ingredient._id);
    if (ingredient.type === 'bun' && value) return 2;
    if (ingredient.type === 'bun') {
      ingredientCounter.set(prevBunId, 0);
      prevBunId = ingredient._id;
      return 2;
    }
    value = value ? (value += 1) : 1;
    return value;
  };

  const onIncreaseTotalPrice = (ingredient: IIngredient) => {
    if (ingredient.type === 'bun') {
      const bunPrice = ingredient.price * 2;
      if (prevBunPrice) {
        setTotalPrice(totalPrice - prevBunPrice + bunPrice);
        setPrevBunPrice(bunPrice);
      } else {
        setTotalPrice(totalPrice + bunPrice);
        setPrevBunPrice(bunPrice);
      }
    } else {
      setTotalPrice(totalPrice + ingredient.price);
    }
  };

  const onDecreaseTotalPrice = (price:number) => {
    setTotalPrice(totalPrice - price);
  };

  const [{isOver, ingredientTypeDrop}, drop] = useDrop(
    () => ({
      accept: 'ingredient',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        ingredientTypeDrop: monitor.getItem()?.type,
      }),
      drop: (ingredient: IIngredient) => {
        dispatch(addIngeredient({ingredient, key: uuidv4()}));
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
                  {currentIngredients.map((ingredient: IIngredientKey, index: number) => (
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
                <CurrencyIcon type="primary"/>
            </div>
            <Button htmlType="submit" type="primary" size="large">
                {requested ? 'Загрузка...' : 'Оформить заказ'}
            </Button>
        </div>
        {failed && <p className={'text text_color_error text_type_main-default'}>Ошибка в заказе</p>}
       </form> 
      </section>

      {success &&
        <Modal id="orderDetails" isOpen={isOpen} onClose={handleClose}>
          <OrderDetails/>
        </Modal>}
     </> 
    );
}

export default BurgerConstructor;