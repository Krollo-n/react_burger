import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import infoBurgerIngredientStyles from './infoBurgerIngredient.module.css';
import {useDrag} from "react-dnd";
import {Link, useLocation} from 'react-router-dom';
import {IIngredient} from '../../utils/types';
import {FC} from 'react';

interface IInfoBurgerIngredientProps {
  ingredient: IIngredient;
  onOpen: (e: any, ingredient: IIngredient) => void;
  ingredientCounter: Map<string, number>;
}

const InfoBurgerIngredient: FC<IInfoBurgerIngredientProps> = ({ingredient, onOpen, ingredientCounter}) => {
  const counter = ingredientCounter.get(ingredient._id);
  const location = useLocation();

  const [{isDrag}, drag, dragPreview] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  }));  

  return (
    <Link to={`/ingredients/${ingredient._id}`}  state={{ background: location }}>
      <div ref={dragPreview} role="button" tabIndex={0} onClick={(e) => onOpen(e, ingredient)}>
        <div ref={drag} className={`${infoBurgerIngredientStyles.info} ${isDrag && infoBurgerIngredientStyles.drag}`} >
          {(counter && <Counter count={counter} size="default" />) ||null}
          <img src={ingredient?.image} alt={ingredient?.name}/>
          <div className={infoBurgerIngredientStyles.price}>
            <span>{ingredient?.price}</span>
            <CurrencyIcon type="primary"/>
          </div>
          <span className={infoBurgerIngredientStyles.header}>{ingredient?.name}</span>
        </div>
      </div>  
    </Link> 
  );
};

export default InfoBurgerIngredient;
