import currentIngredientSlice from './currentIngredient';
import {initialState} from './currentIngredient';
import {getIndredientDetails, reset} from '../../services/reducers/currentIngredient';
import {IIngredient, ICurrentIngredientSlice} from '../../utils/types';

const ingredient1: IIngredient = {
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
  "__v":0
};

describe('currentIngredient reducer', () => {
  it('should get indredient details', () => {
    const data = {ingredient: ingredient1};
    const newState = currentIngredientSlice(initialState, getIndredientDetails(data.ingredient));
    expect(newState).toEqual({ingredient: ingredient1});
  });

  it('should handle reset', () => {
    const state = currentIngredientSlice({ingredient: ingredient1}, reset());
    expect(state).toEqual(initialState);
  });
});
