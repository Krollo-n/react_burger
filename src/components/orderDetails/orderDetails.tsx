import doneIcon from '../../images/done.jpg';
import orderDetailsStyles from './orderDetails.module.css';
import {getOrderNumber} from '../../services/selectors/orderDetails';
import {useSelector} from "react-redux";

function OrderDetails() {
  const orderNumber = useSelector(getOrderNumber);

  return (
    <div className={orderDetailsStyles.main}>
      <span className={orderDetailsStyles.orderNumber}>{orderNumber}</span>
      <h3 className={orderDetailsStyles.header}>идентификатор заказа</h3>
      <img className={orderDetailsStyles.image} src={doneIcon} alt="Заказ принят"/> 
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
