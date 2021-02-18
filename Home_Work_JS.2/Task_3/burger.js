class Menu {
        container = null;
        burgerSize = {
            big:{cost:100,calories:40},
            small:{cost:50, calories:20}
        };
        burgerFilling = {
            cheese:{cost:10,calories:20},
            salad:{cost:20, calories:5},
            potato:{cost:15, calories:10}
        };
        topping = {
            seasoning:{cost:15,calories:0},
            mayonnaise:{cost:20, calories:5}
        }

        constructor(selector) {
            this.container = document.querySelector(selector);
            this._getMenuTemplate();
            this.renderMenu();
        }
        _getMenuTemplate(){
            return `
                 <div class="burger-menu">
                    <h1>Форма заказа бургера</h1>
                    <form class="burger-form" action="#">
                        <lable for="burgerSize"> Размер бургера
                            <select name="burgerSize" class="burgerSize">
                                <option>Большой: ${this.burgerSize.big.cost}руб, ${this.burgerSize.big.calories}Калорий</option>
                                <option>Маленький: ${this.burgerSize.small.cost}руб, ${this.burgerSize.small.calories}Калорий</option>
                            </select>
                        </lable>
                        <lable for="burgerFilling"> Начинка бургера
                            <select name="burgerFilling" class="burgerFilling">
                                <option>С Сыром: ${this.burgerFilling.cheese.cost}руб, ${this.burgerFilling.cheese.calories}Калорий</option>
                                <option>С Салатом: ${this.burgerFilling.salad.cost}руб, ${this.burgerFilling.salad.calories}Калорий</option>
                                <option>С Картофелем: ${this.burgerFilling.potato.cost}руб, ${this.burgerFilling.potato.calories}Калорий</option>
                            </select>
                        </lable>
                    <h3>Выберете топинги для вашего бургера</h3>
                        <lable>Посыпать приправой: ${this.topping.seasoning.cost}руб, ${this.topping.seasoning.calories} калорий<input class="seasoning" type="checkbox"></lable>
                        <lable>Полить майонезом: ${this.topping.mayonnaise.cost}руб, ${this.topping.mayonnaise.calories} калорий<input class="mayonnaise" type="checkbox"></lable>
                        <input type="submit" value="РАССЧИТАТЬ" class="burger-btn">
                    </form>
                    <h3>Ваш бургер: <span class="burger-output"></span></h3>
                </div>
            `
        }
        renderMenu(){
            this.container.insertAdjacentHTML('afterbegin', this._getMenuTemplate())
        }
}
const menu = new Menu('.wrapper')


class Burger{
    values = {};
    constructor(selector) {
            this.form = document.querySelector(selector);
            this._saveCustomerValues();

    }
    _destructuringCustomerValues(){
        let {size,burgerFilling,seasoning,mayonnaise} = this.values;
        let sizeArr = size.trim().split(' ')
        let [cost, calories] = sizeArr;
        cost = parseInt(cost);
        calories = parseInt(calories);
        let burgerFillingArr = burgerFilling.trim().split(' ')
        let [fillingCost, fillingCalories] = burgerFillingArr;
        fillingCost = parseInt(fillingCost);
        fillingCalories = parseInt(fillingCalories);
        let totalCost = this.calculatePrice(cost,fillingCost,seasoning,mayonnaise);
        let totalCalories = this.calculateCalories(calories,fillingCalories,seasoning,mayonnaise);
        this._renderResult(totalCost,totalCalories);
    }

    _renderResult(totalCost,totalCalories){
        document.querySelector('.burger-output').innerHTML= this._getResultTemplate(totalCost,totalCalories);
    }

    _getResultTemplate(totalCost, totalCalories){
        return `Стоимость: ${totalCost} рублей, Каллорийность: ${totalCalories}`
    }

    _saveCustomerValues(){
        this._readCustomerOptions();
        this._destructuringCustomerValues();
    }

    _readCustomerOptions(){
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            let form = document.querySelector('.burger-form');
            let size = form.querySelector('.burgerSize').value;
            let burgerFilling = form.querySelector('.burgerFilling').value;
            let seasoning = form.querySelector('.seasoning');
            let mayonnaise = form.querySelector('.mayonnaise');
              this.values ={
                size: size.replace(/\D+/g," "),
                burgerFilling: burgerFilling.replace(/\D+/g," "),
                seasoning: seasoning.checked,
                mayonnaise: mayonnaise.checked
            }
            this._saveCustomerValues();
        })
    }

    calculatePrice(cost,fillingCost,seasoning,mayonnaise){
       if(seasoning === true){
           seasoning = 15;
       }else {
           seasoning = 0;
       }
        if(mayonnaise === true){
            seasoning = 20;
        }else {
            mayonnaise = 0;
        }
        return cost + fillingCost + seasoning + mayonnaise;
    }
    calculateCalories(calories,fillingCalories,seasoning,mayonnaise){
        if(seasoning === true){
            seasoning = 0;
        }else {
            seasoning = 0;
        }
        if(mayonnaise === true){
            seasoning = 5;
        }else {
            mayonnaise = 0;
        }
        return calories + fillingCalories + seasoning + mayonnaise
    }
}

const burger1 = new Burger('.burger-form');
