import OrderFeedInfo from '../orderFeedInfo/orderFeedInfo';
import {IOrderFeed} from "../../utils/types";
import {Link, useLocation} from 'react-router-dom';
import orderFeedStyles from './orderFeed.module.css';
import {FC} from 'react';

interface IOrderFeedProps {
		orders: IOrderFeed[];
		isShowStatus?: boolean;
}
const OrderFeed: FC<IOrderFeedProps> = ({orders, isShowStatus = false}) => {
  const location = useLocation();
	return (
    <div className={orderFeedStyles.main}>
      <ul className={orderFeedStyles.orderList}>
        {orders && orders.map(data => (
          <li key={data._id} className={orderFeedStyles.order}>
            <Link className={orderFeedStyles.decor} key={data._id} to={`${data.number}`} state={{ background: location }}>
              <OrderFeedInfo isShowStatus={isShowStatus} order={data}/>
            </Link> 
          </li>
        ))}
      </ul>
    </div>
		)
}

export default OrderFeed;