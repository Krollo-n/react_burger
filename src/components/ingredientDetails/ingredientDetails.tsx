import ingredientDetailsStyles from './ingredientDetails.module.css';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getIngredients} from '../../services/selectors/ingredients'; 
import {FC} from 'react';

interface IIngredientDetailsProps {
  isRoutePage?: boolean;
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({isRoutePage = false}) => {
  const {id} = useParams();
  const ingredients = useSelector(getIngredients)
  if (!ingredients) {
    return null;
  }  
  const data = ingredients.find((ingredient) => ingredient._id === id)

  return (
    <div className={`${isRoutePage ? ingredientDetailsStyles.mainPage : ingredientDetailsStyles.main}`}>
      <h3 className={ingredientDetailsStyles.mainHeader}>Детали ингредиента</h3>
      <div className={ingredientDetailsStyles.boxMain}>
        <img className={ingredientDetailsStyles.image} src={data?.image} alt={data?.name} />
        <h4 className={ingredientDetailsStyles.headerIngredient}>{data?.name}</h4>
        <ul className={`${isRoutePage ? ingredientDetailsStyles.infoPage : ingredientDetailsStyles.info}`}>
          <li key='caloriesKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Калории,ккал</h5>
            <span>{data?.calories}</span>
          </li>
          <li key='proteinsKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Белки, г</h5>
            <span>{data?.proteins}</span>
          </li>
          <li key='fatKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Жиры, г</h5>
            <span>{data?.fat}</span>
          </li>
          <li key='carbohydratesKey' className={ingredientDetailsStyles.boxInfo}>
            <h5 className={ingredientDetailsStyles.boxHeader}>Углеводы, г</h5>
            <span>{data?.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetails;
