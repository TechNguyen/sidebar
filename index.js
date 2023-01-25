const nextbtn = document.querySelector('.nextbtn');
const stepContent = document.querySelector('.step-content-title')
var curentPage = 1;
function Validator(options) {
    const form = document.querySelector(options.form);
    if(form) {
        options.rules.forEach(rule => {
            var inputSelector = document.querySelector(rule.selector);
            var errorMessage,errorElement;
            if(inputSelector) { 
                // when blur
                errorElement = inputSelector.parentElement.querySelector('.form-message')
                errorMessage = rule.test(inputSelector.value);
                inputSelector.onblur = function () {
                    if(errorMessage != undefined) {
                        errorElement.innerText = errorMessage;
                        inputSelector.classList.add('error')
                    } else {
                        errorElement.innerText = '';
                        inputSelector.classList.remove('error')
                    }
                }
                // when input
                inputSelector.oninput = function () {
                    errorElement.innerText = '';
                    inputSelector.classList.remove('error');
                    errorMessage = rule.test(inputSelector.value)
                }
            }

        })
        form.onsubmit = function(e) {
            e.preventDefault();
            var errorMessage, errorElement, inputSelector;
            var selectorRule = [];    
            var errorMessageAr = [];
            var isValidated = true;
            options.rules.forEach(rule => {
                inputSelector = document.querySelector(rule.selector);
                errorElement = inputSelector.parentElement.querySelector('.form-message')
                errorMessage = rule.test(inputSelector.value);
                selectorRule.push(errorMessage);
                errorMessageAr.push({selector: errorElement, errorMessage, inputSelector});
            })
            for(let i = 0 ; i < selectorRule.length; i++) {
                if(selectorRule[i] != undefined) {
                    isValidated = false;
                    break;
                }
            }
            
            var formValue = form.querySelectorAll('input');
            var input = Array.from(formValue).reduce((value, input) => {
                return (value[input.id] = input.value) && value
            }, {});
            if(isValidated) {
                errorMessageAr.forEach(e => {
                    e.selector.innerText =  '';
                    e.inputSelector.classList.remove('error')
                })
                nextPage(curentPage);
                localStorage.setItem('input', JSON.stringify(input))
            } else {
                errorMessageAr.forEach(e => {
                    if(e.errorMessage == undefined) {
                        e.selector.innerText = ''
                    } else {
                        e.selector.innerText = e.errorMessage;
                        e.inputSelector.classList.add('error')
                    }
                })
            }
            options.onsubmit(input);
        }
    }

}
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'This field is required'
        }
    }
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function(value) {
            var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            return regexEmail.test(value) ? undefined : 'This field must be email';
        }
    }
}
Validator.isNumber = function (selector) {
    return {
        selector: selector,
        test : function (value) {
            var regexNumber = /^[0-9]/g;
            return regexNumber.test(value) ? undefined : 'This field must be number';
        }
    }
}
Validator.isLength = function (selector, limitLength) {
    return {
        selector: selector,
        test: function (value) {
            return value.length == limitLength ? undefined : `This length phone number is required ${limitLength} char`
        }
    }
}
Validator({
    form: '#form-group',
    rules: [
        Validator.isRequired('#name'),
        Validator.isRequired('#email'),
        Validator.isRequired('#phone'),
        Validator.isEmail('#email'),
        Validator.isNumber('#phone'),
        Validator.isLength('#phone', 10),
    ],
    onsubmit: function (data) {
        return data
    }
    
})
function step2Fn() {
    function chooseItemcourse() {
        const chooseItems = Array.from(document.querySelectorAll('.form-choose_item'));

        chooseItems.forEach(item => {
            console.log(item);
            item.addEventListener('click', function () {
                if(item.classList.contains('choose-package')) {
                    return 
                } else {
                    var itemAgo = chooseItems.filter(item=> {
                        return item.classList.contains('choose-package')
                    })
                    if(itemAgo.length == 0) {
                        item.classList.add('choose-package');
                    } else {
                        itemAgo[0].classList.remove('choose-package');
                        item.classList.add('choose-package');
                    }
                }
            })
        })
    }
    // active
    const chooseBtn = document.querySelector('.choose-roller');
    const formChoose = document.querySelector('.form-choose-action');
    const year =  document.querySelector('.year');
    const month =  document.querySelector('.month');
    const step2 = document.querySelector('.step2');
    const goback = document.querySelector('.goback-btn');
    chooseItemcourse();
    chooseBtn.onclick = () =>
     {
        if(chooseBtn.classList.contains('left-btn')) {
            chooseBtn.classList.replace('left-btn', 'right-btn');
            month.classList.remove('choose');
            year.classList.add('choose');
            formChoose.innerHTML = `<div class="form-choose_item">
            <span class="icon-img">
                <img src="./img/images/icon-arcade.svg" alt="acard">
            </span>
            <span class="item-content">
                <h5>Arcade</h5>
                <p>$90/yr</p>
                <p class="months-free">2 months free</p>
            </span>
        </div>
        <div class="form-choose_item">
            <span class="icon-img">
                <img src="./img/images/icon-advanced.svg" alt="advanced">
            </span>
            <span class="item-content">
                <h5>Advanced</h5>
                <p>$120/yr</p>
                <p class="months-free">2 months free</p>
            </span>
        </div>
        <div class="form-choose_item">
            <span class="icon-img">
                <img src="./img/images/icon-pro.svg" alt="pro">
            </span>
            <span class="item-content">
                <h5>Pro</h5>
                <p>$150/yr</p>
                <p class="months-free">2 months free</p>
            </span>
        </div>`;
        chooseItemcourse();
        } else {
            chooseBtn.classList.replace('right-btn', 'left-btn');
            month.classList.add('choose');
            year.classList.remove('choose');
            formChoose.innerHTML = `<div class="form-choose_item">
            <span class="icon-img">
                <img src="./img/images/icon-arcade.svg" alt="acard">
            </span>
            <span class="item-content">
                <h5>Arcade</h5>
                <p>$9/mo</p>
            </span>
        </div>
        <div class="form-choose_item">
            <span class="icon-img">
                <img src="./img/images/icon-advanced.svg" alt="advanced">
            </span>
            <span class="item-content">
                <h5>Advanced</h5>
                <p>$12/mo</p>
            </span>
        </div>
        <div class="form-choose_item">
            <span class="icon-img">
                <img src="./img/images/icon-pro.svg" alt="pro">
            </span>
            <span class="item-content">
                <h5>Pro</h5>
                <p>$15/mo</p>
            </span>
        </div>`
            chooseItemcourse();
        }
    }
    step2.onclick = (e) => {
        
        const itemChoosed = document.querySelector('.choose-package');
        const choosetime = document.querySelector('.choose')
        var resultPlan =  {
            'item-choose' : itemChoosed.querySelector('.item-content').querySelector('h5').innerText,
            'time-course': choosetime.innerText,
            'price': itemChoosed.querySelector('.item-content').querySelector('p').innerText
        }
        localStorage.setItem('plan', JSON.stringify(resultPlan))
        nextPage(curentPage);
        console.log(curentPage);
    }
    
    goback.onclick = () => {
        
    }
}
// step 3
function step3Fn() {
    
}


function nextPage(index) {
    console.log(index);
    if(index >= 1 || index <= 3) {
        index++;
    }
    console.log(index);
    switch (index) {
        case 2:
            stepContent.innerHTML = `<h1>Select your plan</h1>
            <p>You have the option of monthly or yearly billing.</p>
            <div id="form-choose">
                <div class="form-choose-action">
                    <div class="form-choose_item">
                        <span class="icon-img">
                            <img src="./img/images/icon-arcade.svg" alt="acard">
                        </span>
                        <span class="item-content">
                            <h5>Arcade</h5>
                            <p>$9/mo</p>
                        </span>
                    </div>
                    <div class="form-choose_item">
                        <span class="icon-img">
                            <img src="./img/images/icon-advanced.svg" alt="advanced">
                        </span>
                        <span class="item-content">
                            <h5>Advanced</h5>
                            <p>$12/mo</p>
                        </span>
                    </div>
                    <div class="form-choose_item">
                        <span class="icon-img">
                            <img src="./img/images/icon-pro.svg" alt="pro">
                        </span>
                        <span class="item-content">
                            <h5>Pro</h5>
                            <p>$15/mo</p>
                        </span>
                    </div>
                </div>
                
                <div class="choose-action">
                    <p class="month choose">Monthly</p>
                    <span class="choose-btn">
                        <span class="choose-roller left-btn"></span>
                    </span>
                    <p class="year">Yearly</p>
                </div>
                <button class="goback-btn">Go Back</button>
                <button class="nextbtn step2" value="2">Next Step</button>
            </div>`;
            step2Fn();
            break;
        case 3:
            stepContent.innerHTML = `
            <h1>Pick add-ons</h1>
            <p>  Add-ons help enhance your gaming experience.</p>
            <form id="form-group" method="post">
                <div class="form-item item_3">
                    <div class="input-title">
                        <input id="Online" type="checkbox">
                        <div class="title-content">
                            <h3>Online service</h3>
                            <p>Access to multiplayer games</p>
                        </div>
                    </div>
                    <p class="time">+$1/mo</p>
                </div>
                <div class="form-item item_3">
                    <div class="input-title">
                        <input id="Larger" type="checkbox">
                        <div class="title-content">
                            <h3>Larger storage</h3>
                            <p>Extra 1TB of cloud save</p>
                        </div>
                    </div>
                    <p class="time">+$2/mo</p>
                </div>
                <div class="form-item item_3">
                    <div class="input-title">
                        <input id="Online" type="checkbox">
                        <div class="title-content">
                            <h3>Customizable Profile</h3>
                            <p>Custom theme on your profile</p>
                        </div>
                    </div>
                    <p class="time">+$2/mo</p>
                </div>
                <button class="goback-btn">Go Back</button>
                 <button class="nextbtn step2" value="3">Next Step</button>
            </form>
            `
            break;
        case 4:

            break;
        default:
            break;
    }
}




