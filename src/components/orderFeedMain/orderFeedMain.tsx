import orderFeedMainStyles from './orderFeedMain.module.css';
import OrderFeed from '../orderFeed/orderFeed';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/useAppDispatch';
import {useEffect} from "react";
import API from '../../utils/api';
import {wsOrdersConnect, wsOrdersDisconnect} from '../../services/actions/orders';

const OrderFeedMain = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(store => (store.orders));
  const total = useAppSelector(store => (store.orders.total));
  const totalToday = useAppSelector(store => (store.orders.totalToday));
  const doneOrders = orders.orders.filter(x=>x.status==='done')
  const progressOrders = orders.orders.filter(x=>x.status==='pending')

  useEffect(()=>{
    dispatch(wsOrdersConnect(`${API.wsBaseUrl}${API.endpoints.orders}/all` ))
    return () => {
      dispatch(wsOrdersDisconnect())
    }
  },[dispatch])

  return (
    <div className={orderFeedMainStyles.main}>
       <div className={orderFeedMainStyles.components}>
         <h1 className={'text text_type_main-large mb-5 pt-10'}>Лента заказов</h1>
         <OrderFeed orders={orders.orders} />
       </div>
       <div className={orderFeedMainStyles.info}>
          <div className={orderFeedMainStyles.statuses}>
            <div className={orderFeedMainStyles.status}>
               <h1 className={'text text_type_main-medium mb-6'}>Готовы:</h1>
               <ul className={`${orderFeedMainStyles.numbers} text text_type_digits-default text_color_success`}>
                  {doneOrders && doneOrders.map(data => (
                      <li key={data._id+data.number} >{data.number}</li>
                 ))}
               </ul>
            </div>
            <div className={orderFeedMainStyles.status}>
               <p className={'text text_type_main-medium mb-6'}>В работе:</p>
               <ul className={`${orderFeedMainStyles.numbers} text text_type_digits-default text_color_primary`}>
                  {progressOrders && progressOrders.map(data => (
                      <li key={data._id+data.number} >{data.number}</li>
                    ))}
               </ul>
            </div>
          </div>
          <div>
             <p className={'text text_type_main-medium'}>Выполнено за все время:</p>
             <p className={`${orderFeedMainStyles.shadow} text text_type_digits-large`}>{total}</p>
          </div>
          <div>
             <p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
             <p className={`${orderFeedMainStyles.shadow} text text_type_digits-large`}>{totalToday}</p>
          </div>
       </div>
    </div>
)
}

export default OrderFeedMain;