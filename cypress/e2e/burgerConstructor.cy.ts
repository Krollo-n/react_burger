/// <reference types="cypress" />

describe('burger construcor tests', function () {
  const url = 'http://localhost:3000/'; 

  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('ingredients');
    cy.visit(url);
    cy.wait('@ingredients');
  });

  it('добавление/удаление ингредиентов, подсчет итоговой стоимости', () => {
    //итоговая стоимость=0
    cy.get('[data-test-id="constructor-total-price"]').as('constructorTotalPrice');
    cy.get('[data-test-id="constructor-drop_area"]').as('constructorDropArea');
    cy.get('@constructorTotalPrice').should('contain', '0');

    //добавим булку, итоговая стоимость увеличится
    cy.get('[data-test-id="ingredient-buns"]').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('[data-test-id="constructor-drop_area"]').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '2510');

    //добавим ингредиент, итоговая стоимость увеличится
    cy.get('[data-test-id="ingredient-main"]').contains('Говяжий метеорит (отбивная)').trigger('dragstart');
    cy.get('[data-test-id="constructor-drop_area"]').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '5510');

    //добавим ингредиент Соус, итоговая стоимость увеличится, счетчик увеличится
    cy.get('[data-test-id="ingredient-sauce"]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[data-test-id="constructor-drop_area"]').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '5600');
    cy.get('[data-test-id="info_burger_ingredient_counter-643d69a5c3f7b9001cfa0942"]').as('sauce');
    cy.get('@sauce').should('contain', '1');

    //добавим инредиент Соус, итоговая стоимость увеличится, счетчик увеличится
    cy.get('[data-test-id="ingredient-sauce"]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[data-test-id="constructor-drop_area"]').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '5690');
    cy.get('@sauce').should('contain', '2');

    //удалим из конструктора ингрединет Соус, итоговая стоимость уменьшится, счетчик уменьшится
    cy.get('[data-test-id="constructor_element-643d69a5c3f7b9001cfa0942"]').first().find('[class^=constructor-element__action]').as('sauseFirstDeleteButton');
    cy.get('@sauseFirstDeleteButton').click();
    cy.get('@sauce').should('contain', '1');
    cy.get('@constructorTotalPrice').should('contain', '5600');

    //нажмем Оформить заказ
    cy.get('[data-test-id="order_button"]').as('orderButton');
    cy.get('@orderButton').click();

    //авторизуемся
    cy.get('input[name=email]').as('emailInput');
    cy.get('@emailInput').type('pyh-pyh@m.ru');
    cy.get('input[name=password]').type('qwerty');
    cy.get('[data-test-id="login_button"]').should('have.text', 'Войти').click();

    //нажмем Оформить заказ, увидим окно с заказом
    cy.get('@orderButton').click();
    cy.get('[data-test-id="order_details"]', {timeout: 16000}).should('exist');
    cy.contains('Дождитесь готовности на орбитальной станции');
    cy.wait(2000);

    //закроем модальное окно
    cy.get('.modal_main__8I8H5 > svg').click()

    cy.location('href').should('equal', url+'#/');

  });

  it('работа карточки с детализацией ингрелиента', () => {
    cy.visit(url);
    cy.get('[data-test-id="ingredient-buns"] img[alt="Краторная булка N-200i"]').as('ingredientDetails');
    cy.get('@ingredientDetails').click();
    cy.location('href').should('equal', url+'#/ingredients/643d69a5c3f7b9001cfa093c');
    cy.get('.ingredientDetails_main__FtGVo').contains('Детали ингредиента').should('exist');
    cy.wait(2000);
    cy.get('.modal_image__FpvL9').click();
    cy.location('href').should('equal', url);
  });

});

 
