import PropTypes from 'prop-types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import infoBurgerIngredientStyles from './infoBurgerIngredient.module.css';
import {useDrag} from "react-dnd";
import {IngredientType} from '../../utils/types'

function InfoBurgerIngredient({ingredient, onOpen, ingredientCounter}) {
  const counter = ingredientCounter.get(ingredient._id); 

  const [{isDrag}, drag, dragPreview] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  }));  

  return (
    <div ref={dragPreview} role="button" tabIndex="0" onClick={(e) => onOpen(e, ingredient)}>
      <div ref={drag} className={`${infoBurgerIngredientStyles.info} ${isDrag && infoBurgerIngredientStyles.drag}`} >
        {(counter && <Counter count={counter} size="default" />) ||null}
        <img src={ingredient?.image} alt={ingredient?.name}/>
        <div className={infoBurgerIngredientStyles.price}>
          <span>{ingredient?.price}</span>
          <CurrencyIcon />
        </div>
        <span className={infoBurgerIngredientStyles.header}>{ingredient?.name}</span>
      </div>
    </div>  
  );
}

InfoBurgerIngredient.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  ingredientCounter: PropTypes.instanceOf(Map).isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default InfoBurgerIngredient;
