import PropTypes from 'prop-types';
import {IngredientType} from '../../utils/types'
import ingredientDetailsStyles from './ingredientDetails.module.css';

function IngredientDetails({data}) {

  return (
    <div className={ingredientDetailsStyles.main}>
      <h3 className={ingredientDetailsStyles.mainHeader}>Детали ингредиента</h3>
      <div className={ingredientDetailsStyles.boxMain}>
        <img className={ingredientDetailsStyles.image} src={data.image} alt={data.name} />
        <h4 className={ingredientDetailsStyles.headerIngredient}>{data.name}</h4>
        <ul className={ingredientDetailsStyles.info}>
          <li key='caloriesKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Калории,ккал</h5>
            <span>{data.calories}</span>
          </li>
          <li key='proteinsKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Белки, г</h5>
            <span>{data.proteins}</span>
          </li>
          <li key='fatKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Жиры, г</h5>
            <span>{data.fat}</span>
          </li>
          <li key='carbohydratesKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Углеводы, г</h5>
            <span>{data.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.shape(IngredientType).isRequired
}

export default IngredientDetails;
