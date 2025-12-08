import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {IOrderFeed, IIngredient} from '../../utils/types';
import {useAppSelector} from '../../utils/hooks/useAppDispatch';
import styles from './orderFeedInfo.module.css';
import {FC} from 'react';

interface IOrderFeedProps {
  order: IOrderFeed;
  isShowStatus?: boolean;
}
const OrderFeedInfo: FC<IOrderFeedProps> = ({order, isShowStatus = false}) => {
  const ingredients = useAppSelector(state => state.ingredients)
  const ingredientsByIds = ingredients.ingredients.filter(ingredient => {return order.ingredients.includes(ingredient._id)})
    .map(x => ({
        ingredient: x, count: x.type !== 'bun'?order.ingredients.filter(y => {return y === x._id}).length: 2})
        ) as {ingredient: IIngredient; count: number;}[];
     
  const orderIngredients = order?.ingredients.map((orderIngredient) => ingredients.ingredients.find((ingredient: {_id: string}) => ingredient._id === orderIngredient)) as IIngredient[]; 

  const totalPrice = (ingredients: IIngredient[]) =>
	ingredients.reduce((sum, current) => sum + current?.price, 0); 

  return (
    <div className={styles.main} >
       <div className={styles.header}>
         <span className={'text text_type_digits-default mb-6'}>#{order.number}</span>
         <span className={'text text_type_main-default text_color_inactive mb-6'}>
            <FormattedDate date={new Date(order.createdAt)}/>
         </span>
       </div>
       <span className={'text text_type_main-medium pt-6 mb-2'}>{order.name}</span>
       {isShowStatus && <>
         <p className={`text text_type_main-default text_color_${order?.status==="done"?"success":"primary"} mb-6`}>{order?.status==="done"?"Выполнен":"В работе"}</p>
        </>}
       <div className={styles.info}>
         <div className={styles.images}>
            {ingredientsByIds && ingredientsByIds.slice(0, 6).map((data, i) => {
                return (
                  <div key={data.ingredient._id} className={styles.rest} style={{left: 48*i}} >
                    <div className={styles.imageBox} style={{zIndex: 20-i, left: `${6*i}px`}}>
                        {(i===5 && ingredientsByIds.length>5) && (ingredientsByIds.length-i) > 0 
                          && <span className={styles.rest}>+{ingredientsByIds.length-i}</span>}
                        <img className={styles.image} src={data.ingredient.image_mobile} alt={data.ingredient.name} style={{opacity: `${((i===5 && ingredientsByIds.length>5) && (ingredientsByIds.length-i)>0)?0.5:1}`}}/>
                    </div> 
                  </div>
                 )}
                )}
         </div>
         <div className={styles.total}>
           <span className={'text text_type_digits-default'}>{totalPrice(orderIngredients)}</span>
           <CurrencyIcon type="primary"/>
          </div>
       </div>
    </div>
  )
}

export default OrderFeedInfo;
