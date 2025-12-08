import styles from './orderFeedCard.module.css'
import {useEffect} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";
import {useAppSelector} from '../../utils/hooks/useAppDispatch';
import {useState} from "react";
import {IOrderFeed, IIngredient} from '../../utils/types';
import {getOrder} from '../../services/reducers/orders';

const OrderFeedCard = ({isRoutePage = false}) => {
  const {number} = useParams<{number: string}>();
  const ingredients = useAppSelector(state => state.ingredients)
  const [order, setOrder] = useState<IOrderFeed | null>(null);

  useEffect(() => {
	const getOrderData = async () => {
	try {
	  const orderData = await getOrder(number);
	  setOrder(orderData);
	} 
	catch (error) {
	  return (
		<p>Произошла ошибка при загрузке информации по заказу №{number}</p>
	  )}
	};
	getOrderData();
  }, [number]);

  const ingredientsByIds = () => {
	return ingredients.ingredients.filter(ingredient => {return order.ingredients.includes(ingredient._id)})
	   .map(x => ({
		 ingredient: x, count: x.type !== 'bun'?order.ingredients.filter(y => {return y === x._id}).length: 2})
		) as {ingredient: IIngredient; count: number;}[];
  }

  const orderIngredients = order?.ingredients.map((orderIngredient) =>
	ingredients.ingredients.find((ingredient: {_id: string}) => ingredient._id === orderIngredient)) as IIngredient[]; 

  const totalPrice = (ingredients: IIngredient[]) =>
	ingredients.reduce((sum, current) => sum + current?.price, 0); 

  return (
	<div className={`${isRoutePage ? styles.mainPage : styles.main}`}>
	  {order && 
	   <>
		 <h2 className={`text text_type_digits-default`}>#{order?.number}</h2>
		 <p className={'text text_type_main-medium mt-10'}>{order?.name}</p>
	     <p className={`text text_type_main-default pt-2 text_color_${order?.status === "done" ? "success" : "primary"} mb-15`}>{order?.status === "done" ? "Выполнен" : "В работе"}</p>	
		 <p className={'text text_type_main-medium mb-6'}>Состав:</p>
		 <ul className={`${isRoutePage ? styles.ingredientListPage : styles.ingredientList}`}> 
		    {ingredientsByIds().map((data) => (
			  <li key={data.ingredient._id} className={styles.ingredient}>					
				<div className={styles.ingredientItem}>
				  {data && 
				   <>
					 <div className={styles.ingredientBox}>
					   <div className={styles.imageBox}>
						 <img className={styles.image} src={data.ingredient.image} alt={data.ingredient.name}/>
					   </div>
					   <span className={'text text_type_main-default'}>{data.ingredient.name}</span>
					 </div>
					 <div className={styles.price}>
					   <span className={'text text_type_digits-default'}>{data.count} x {data.ingredient.price}</span>
					   <CurrencyIcon type="primary"/>
					</div>
				   </>}
				</div>
			   </li>
			))}
		</ul>
		<div className={`${isRoutePage ? styles.resumePage : styles.resume}`}>
		  <span className={'text text_type_main-default text_color_inactive'}>
			<FormattedDate date={new Date(order.updatedAt)}/>
		  </span>
		  <div className={styles.total}>
			<span className={'text text_type_digits-default'}>{totalPrice(orderIngredients)}</span>
			<CurrencyIcon type="primary"/>
		  </div>
		</div>
       </>}
	</div>
)
}

export default OrderFeedCard;