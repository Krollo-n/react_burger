import OrderFeed from '../components/orderFeed/orderFeed';
import {useAppDispatch, useAppSelector} from '../utils/hooks/useAppDispatch';
import {useEffect} from "react";
import {wsProfileOrdersConnect, wsProfileOrdersDisconnect} from '../services/actions/userProfileOrders';
import API from '../utils/api';

export const OrdersHistoryPage = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(state => state.userProfileOrders.orders)

	useEffect(()=>{
    let token = localStorage.getItem('accessToken');
    dispatch(wsProfileOrdersConnect(`${API.wsBaseUrl}${API.endpoints.orders}?token=${token}`))
    return () => {
      dispatch(wsProfileOrdersDisconnect())
    }
  },[dispatch])

	return (
		<OrderFeed isShowStatus orders={orders} />
	)
}

export default OrdersHistoryPage;