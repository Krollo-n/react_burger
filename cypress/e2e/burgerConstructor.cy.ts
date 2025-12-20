/// <reference types="cypress" />

describe('burger construcor tests', function () {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('ingredients');
    cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
      fixture: 'orders.json',
    });
    cy.visit('/');
    cy.wait('@ingredients');
  });

  it('добавление/удаление ингредиентов, подсчет итоговой стоимости', () => {
    //итоговая стоимость=0
    cy.getByTestId("constructor-total-price").as('constructorTotalPrice');
    cy.getByTestId("constructor-drop_area").as('constructorDropArea');
    cy.getByTestId("ingredient-buns").as('buns');
    cy.getByTestId("ingredient-sauce").as('sauce');
    cy.getByTestId("ingredient-main").as('main');
    cy.get('@constructorTotalPrice').should('contain', '0');

    //добавим булку, итоговая стоимость увеличится
    cy.get('@buns').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '2510');

    //добавим ингредиент, итоговая стоимость увеличится
    cy.get('@main').contains('Говяжий метеорит (отбивная)').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '5510');

    //добавим ингредиент Соус, итоговая стоимость увеличится, счетчик увеличится
    cy.get('@sauce').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '5600');
    cy.getByTestId("info_burger_ingredient_counter-643d69a5c3f7b9001cfa0942").as('sauce');
    cy.get('@sauce').should('contain', '1');

    //добавим инредиент Соус, итоговая стоимость увеличится, счетчик увеличится
    cy.get('@sauce').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@constructorTotalPrice').should('contain', '5690');
    cy.get('@sauce').should('contain', '2');

    //удалим из конструктора ингрединет Соус, итоговая стоимость уменьшится, счетчик уменьшится
    cy.getByTestId("constructor_element-643d69a5c3f7b9001cfa0942").first().find('[class^=constructor-element__action]').as('sauseFirstDeleteButton');
    cy.get('@sauseFirstDeleteButton').click();
    cy.get('@sauce').should('contain', '1');
    cy.get('@constructorTotalPrice').should('contain', '5600');

    //нажмем Оформить заказ
    cy.getByTestId("order_button").as('orderButton');
    cy.get('@orderButton').click();

    //авторизуемся
    cy.get('input[name=email]').as('emailInput');
    cy.get('@emailInput').type('pyh-pyh@m.ru');
    cy.get('input[name=password]').type('qwerty');
    cy.getByTestId("login_button").should('have.text', 'Войти').click();

    //нажмем Оформить заказ, увидим окно с заказом
    cy.get('@orderButton').click();
    cy.getByTestId("order_details", {timeout: 10000}).should('exist');
    cy.contains('Дождитесь готовности на орбитальной станции');
    cy.wait(2000);

    //закроем модальное окно
    cy.getByTestId("close_button").click();

    cy.location('pathname').should('equal', '/');

  });

  it('работа карточки с детализацией ингрелиента', () => {
    cy.visit('/');
     cy.getByTestId("ingredient-buns").find('img')
        .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-02.png').first().as('ingredientDetails');
    cy.get('@ingredientDetails').click();
    cy.location('href').should('equal', Cypress.config('baseUrl') +'/#/ingredients/643d69a5c3f7b9001cfa093c');
    cy.get('.ingredientDetails_main__FtGVo').contains('Детали ингредиента').should('exist');
    cy.wait(2000);
    cy.get('.modal_image__FpvL9').click();
    cy.location('pathname').should('equal', '/');
  });

});