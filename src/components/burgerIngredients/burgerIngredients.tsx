import {useState, RefObject} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/useAppDispatch";
import {useCallback} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'; 
import InfoBurgerIngredient from '../infoBurgerIngredient/infoBurgerIngredient';
import {getIngredients} from "../../services/selectors/ingredients";
import {getIndredientDetails} from '../../services/reducers/currentIngredient';
import {IIngredient} from "../../utils/types";
import {FC} from 'react';

interface IBurgerIngredientsProps {
  ingredientCounter: Map<string, number>;
}

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ingredientCounter}) => {
  const [current, setCurrent] = useState('one');

  const dispatch = useAppDispatch(); 
  const ingredients = useAppSelector(getIngredients)

  const handleOpen = useCallback(
    (e: any/*React.KeyboardEvent<HTMLInputElement>*/, ingredient: IIngredient) => {
      if (e.type === 'click' || e?.key === 'Enter') {
        dispatch(getIndredientDetails(ingredient));
    }
    
  }, [dispatch]);

  const bunRef = useRef(null);
  const mainsRef = useRef(null);
  const saucesRef = useRef(null);

  const handleTabClick = (value:string, ref: RefObject<HTMLDivElement>) => {
    setCurrent(value);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    let minInterval = Number.MAX_SAFE_INTEGER;
    let current = '';

    entries.forEach((entry) => {
      const target = entry.target;

      if (target instanceof Element) {
        const interval = Math.abs(entry.boundingClientRect.top);
        const tabRef = target.getAttribute('tab-ref');

        if (tabRef && interval < minInterval) {
          minInterval = interval;
          current = tabRef;
        }
      }
    });

    if (!current && entries.length > 0) {
      const defaultTabValue = entries[0].target.getAttribute('tab-ref');
      if (defaultTabValue) {
        current = defaultTabValue;
      }
    }

    setCurrent(current);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);

    if (bunRef.current) observer.observe(bunRef.current);
    if (saucesRef.current) observer.observe(saucesRef.current);
    if (mainsRef.current) observer.observe(mainsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
  <>
    <section>
      <div className={burgerIngredientsStyles.main}>
        <div className={burgerIngredientsStyles.tabMain}>
            <Tab key='tabBun' value="one"  active={current === 'one'} onClick={() => handleTabClick('one', bunRef)} tab-ref="one" >
                Булки
            </Tab>
            <Tab key='tabSauce' value="two"  active={current === 'two'} onClick={() => handleTabClick('two', saucesRef)} tab-ref="two">
                Соусы
            </Tab>
            <Tab key='tabMain' value="three" active={current === 'three'}  onClick={() => handleTabClick('three', mainsRef)} tab-ref="three">
                Начинки
            </Tab>
        </div>
        <div className={burgerIngredientsStyles.container} >
          <section key='bun' className={burgerIngredientsStyles.section}>
            <h2 id='one' ref={bunRef} tab-ref="one" className={burgerIngredientsStyles.header}>
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
            <h2 id='two' ref={saucesRef} tab-ref="two" className={burgerIngredientsStyles.header}>
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
            <h2 id='three' ref={mainsRef} tab-ref="three"  className={burgerIngredientsStyles.header}>
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
   
  </> 
  );
}

export default BurgerIngredients;