import currentIngredientsSlice from './currentIngredients';
import {initialState} from './currentIngredients';
import {addIngredient, deleteCurrentIngredient, sortingIngredient, reset} from '../../services/reducers/currentIngredients';
import {IIngredientKey, ICurrentIngredientsSlice} from '../../utils/types';

const bun: IIngredientKey = {
  "_id":"60666c42cc7b410027a1a9b1",
  "name":"Краторная булка N-200i",
  "type":"bun",
  "proteins":80,
  "fat":24,
  "carbohydrates":53,
  "calories":420,
  "price":1255,
  "image":"https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v":0,
  key: '6661',
};
const ingredient1: IIngredientKey = {
  "_id":"60666c42cc7b410027a1a9b5",
  "name":"Говяжий метеорит (отбивная)",
  "type":"main",
  "proteins":800,
  "fat":800,
  "carbohydrates":300,
  "calories":2674,
  "price":3000,
  "image":"https://code.s3.yandex.net/react/code/meat-04.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
  "__v":0,
  key: '6662',
};
const ingredient2: IIngredientKey = {
  "_id":"60666c42cc7b410027a1a9b7",
  "name":"Соус Spicy-X",
  "type":"sauce",
  "proteins":30,
  "fat":20,
  "carbohydrates":40,
  "calories":30,
  "price":90,
  "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
  "__v":0,
  key: '6663',
};

describe('currentIngredients reducer', () => {
  it('should add bun', () => {
    const data = {ingredient: bun, key: '6661'};
    const newState = currentIngredientsSlice(initialState, addIngredient(data));
    expect(newState).toEqual({...initialState, bun: bun});
  });

  it('should add ingredient', () => {
    const data = {ingredient: ingredient1, key: '6662'};
    const newState = currentIngredientsSlice(initialState, addIngredient(data));
    expect(newState).toEqual({...newState, ingredients: [ingredient1]});
  });

  it('should delete ingredient', () => {
    const state = {bun: bun, ingredients: [ingredient1, ingredient2]};
    const newState = currentIngredientsSlice(state, deleteCurrentIngredient(ingredient1.key));
    expect(newState).toEqual({...state, ingredients: [ingredient2]});
  });

  it('should handle sort ingredients', () => {
    const dragIndex = 0;
    const hoverIndex = 1;
    const state = {bun: bun, ingredients: [ingredient1, ingredient2]};
    expect(currentIngredientsSlice(state, sortingIngredient({ hoverIndex, dragIndex })))
      .toEqual({...state, ingredients: [ingredient2, ingredient1]});
  });

  it('should handle reset', () => {
    const state = currentIngredientsSlice({bun: bun, ingredients: [ingredient1]}, reset());
    expect(state).toEqual(initialState);
  });
});
