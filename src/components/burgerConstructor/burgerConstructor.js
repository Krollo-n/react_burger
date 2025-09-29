import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css'; 
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'; 
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'; 

class BurgerConstructor extends React.Component {
  render() {
    return (
      <section>
        <div className={burgerConstructorStyles.order}>
            <ConstructorElement extraClass={burgerConstructorStyles.fix}
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
            />
            <div className={burgerConstructorStyles.components}> 
                {this.props.data.filter(({type}) => type !== 'bun')
                .map((d) => (
                    <div key={'burgerConstructor-${d._id}'} className={burgerConstructorStyles.ingredient}>
                        <DragIcon type={"primary"}/>
                        <ConstructorElement 
                          text={d.name} 
                          price={d.price} 
                          thumbnail={d.image_mobile} 
                        />
                    </div>
                ))}
            </div>
            <ConstructorElement
                    extraClass={burgerConstructorStyles.fix}
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
            />
        </div>
        <div className={burgerConstructorStyles.final}>
            <div className={burgerConstructorStyles.total}>
                <span className="text text_type_digits-medium">{13666}</span>
                <CurrencyIcon/>
            </div>
            <Button htmlType="submit" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
      </section>
    );
}
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(
   {
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired
  })).isRequired
}

export default BurgerConstructor;