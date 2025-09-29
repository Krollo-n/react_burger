import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'; 
import InfoBurgerIngredient from '../infoBurgerIngredient/infoBurgerIngredient';

class  BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:'one'
    };

    this.tabClick = this.tabClick.bind(this);
  } 
  tabClick(e) {
    this.setState({
      current: e
    });
  }

render() {
  return (
    <section>
      <div className={burgerIngredientsStyles.main}>
        <div style={{display: 'flex'}}>
          <a key='linkBun' href='#one'>
            <Tab key='tabBun' value="one" active={this.state.current === 'one'} onClick={this.tabClick} href='#one'>
                Булки
            </Tab>
          </a>
          <a key='linkSauce' href='#two'>
            <Tab key='tabSauce' value="two" active={this.state.current === 'two'} onClick={this.tabClick}>
                Соусы
            </Tab>
          </a>
          <a key='linkMain' href='#three'>
            <Tab key='tabMain' value="three" active={this.state.current === 'three'} onClick={this.tabClick}>
                Начинки
            </Tab>
          </a>
        </div>
        <div className={burgerIngredientsStyles.container}>
          <section key='bun' className={burgerIngredientsStyles.section}>
            <h2 id='one' className={burgerIngredientsStyles.header}>
              Булки
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                this.props.data.filter(({type}) => type==='bun')
                .map((d) => (<InfoBurgerIngredient  key={d._id} name={d.name} price={d.price} image={d.image}/>))
              }
            </div>
          </section>
          <section key='sauce' className={burgerIngredientsStyles.section}>
            <h2 id='two' className={burgerIngredientsStyles.header}>
              Соусы
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                this.props.data.filter(({type}) => type==='sauce')
                .map((d) => (<InfoBurgerIngredient  key={d._id} name={d.name} price={d.price} image={d.image}/>))
              }
            </div>
          </section>
          <section key='main' className={burgerIngredientsStyles.section}>
            <h2 id='three' className={burgerIngredientsStyles.header}>
              Начинки
            </h2>
            <div className={burgerIngredientsStyles.ingredient}>
              {
                this.props.data.filter(({type}) => type==='main')
                .map((d) => (<InfoBurgerIngredient  key={d._id} name={d.name} price={d.price} image={d.image}/>))
              }
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
}

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;