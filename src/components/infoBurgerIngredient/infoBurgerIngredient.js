import PropTypes from 'prop-types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import infoBurgerIngredientStyles from './infoBurgerIngredient.module.css';

function InfoBurgerIngredient({_id, name, price, image, onOpen}) {
  return (
    <div role="button" tabIndex="0" onClick={(e) => onOpen(e, _id)}>
      <div className={infoBurgerIngredientStyles.info}>
        <Counter count={0} size="default" />
        <img src={image} alt={name}/>
        <div className={infoBurgerIngredientStyles.price}>
          <span>{price}</span>
          <CurrencyIcon />
        </div>
        <span className={infoBurgerIngredientStyles.header}>{name}</span>
      </div>
    </div>  
  );
}

InfoBurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default InfoBurgerIngredient;
