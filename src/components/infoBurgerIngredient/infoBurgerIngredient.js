import PropTypes from 'prop-types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import infoBurgerIngredientStyles from './infoBurgerIngredient.module.css';

function InfoBurgerIngredient({name, price, image}) {
  return (
    <div className={infoBurgerIngredientStyles.info}>
      <Counter count={0} size="default" />
      <img src={image} alt={name}/>
      <div className={infoBurgerIngredientStyles.price}>
        <span>{price}</span>
        <CurrencyIcon />
      </div>
      <span className={infoBurgerIngredientStyles.header}>{name}</span>
    </div>
  );
}

InfoBurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};

export default InfoBurgerIngredient;
