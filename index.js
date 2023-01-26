const nextbtn = document.querySelector('.nextbtn');
const stepContent = document.querySelector('.step-content-title');
const stepItem = document.querySelector('.step-content_item');
const stepNumber = document.querySelector('.step-wrapper');
const stepnumberItem = Array.from(document.querySelectorAll('.number'));
var curentPage = 1;
var preElement, preElement2, preElement3;
var timePre;

function numberAnimation(curentPage) {
    switch (curentPage) {
        case 1:
            stepnumberItem.forEach(e => {
                if(e.innerText ==  1 ) {
                    e.classList.add('curent');
                } else {
                    e.classList.remove('curent')
                }
            })
            break;
        case 2:
            stepnumberItem.forEach(e => {
                if(e.innerText ==  2 ) {
                    e.classList.add('curent');
                } else {
                    e.classList.remove('curent')
                }
            })
            break;
        case 3:
            stepnumberItem.forEach(e => {
                if(e.innerText ==  3 ) {
                    e.classList.add('curent');
                } else {
                    e.classList.remove('curent')
                }
            })
            break;
        case 4:
            stepnumberItem.forEach(e => {
                if(e.innerText ==  4 ) {
                    e.classList.add('curent');
                } else {
                    e.classList.remove('curent')
                }
            })
            break;
        case 5:
            stepnumberItem.forEach(e => {
                if(e.innerText ==  4 ) {
                    e.classList.add('curent');
                } else {
                    e.classList.remove('curent')
                }
            })
            break;
        default:
            break;
    }
}
// Step 1 function
function step1Fn() {
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
                    preElement = document.querySelector('.step-content_item').innerHTML;
                    localStorage.setItem('input', JSON.stringify(input))
                    curentPage = 2;
                    nextPage(curentPage);
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
}
// call in first render 
step1Fn();
// Step 2 funtion
function step2Fn() {
    function chooseItemcourse() {
        const chooseItems = Array.from(document.querySelectorAll('.form-choose_item'));
        chooseItems.forEach(item => {
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
    step2.onclick = () => {    
        const itemChoosed = document.querySelector('.choose-package');
        const choosetime = document.querySelector('.choose');
        resultIput = itemChoosed;
        var resultPlan =  {
            'item-choose' : itemChoosed.querySelector('.item-content').querySelector('h5').innerText,
            'time-course': choosetime.innerText,
            'price': itemChoosed.querySelector('.item-content').querySelector('p').innerText
        };
        preElement2 = document.querySelector('.step-content_item').innerHTML;
        localStorage.setItem('yourplan', JSON.stringify(resultPlan));
        curentPage = 3;
        nextPage(curentPage);
    }
    
    goback.onclick = () => {
        curentPage = 1;
        nextPage(curentPage);
    }
}
function resultPre(input, el) {
    for(var key in input) {
        el.forEach((e) => {
            if(e.getAttribute('id') == key) {
                e.value = input[key]
            }
        }) 
    }
}
// step 3
function step3Fn() {
    function Validator(options) {
        const form = document.querySelector(options.form);
        if(form) {
            options.rules.forEach(rule => {
                var inputSelector = document.querySelector(rule.selector);
                var errorMessage;   
                // when checked
                inputSelector.addEventListener('click', function () {
                    if(inputSelector.checked) {
                        errorMessage = rule.test(inputSelector.checked);
                        inputSelector.parentElement.parentElement.classList.add('choose-package')
                    } else {
                        errorMessage = rule.test(inputSelector);
                        inputSelector.parentElement.parentElement.classList.remove('choose-package')
                    }
                })
            })
            form.onsubmit = function(e) {
                e.preventDefault();
                var errorMessage, inputSelector;
                var selectorRule = [];    
                var errorMessageAr = [];
                var isChecked = false;
                var errorElement = form.querySelector('.form-message');
                options.rules.forEach(rule => {
                    inputSelector = document.querySelector(rule.selector);
                    errorMessage = rule.test(inputSelector.checked);
                    selectorRule.push(errorMessage);
                    errorMessageAr.push({selector: errorElement, errorMessage, inputSelector});
                })
                for(let i = 0 ; i < selectorRule.length; i++) {
                    if(selectorRule[i] == undefined) {
                        isChecked = true;
                        break;
                    }
                }
                var formValue = Array.from(form.querySelectorAll('input'));
                var parentElementForm = formValue.map(el => {
                    return el.parentElement.parentElement;
                })
                var courseInput = parentElementForm.reduce((value, input) => {
                    if(input.querySelector('input').checked) {
                        (value[input.querySelector('input').value] = input.querySelector('.time').innerText );
                    }
                    return value
                }, {});
                if(isChecked) {
                    errorElement.innerText = '';
                    localStorage.setItem('courseInput', JSON.stringify(courseInput));
                    var timeElement = form.querySelector('.time').innerText;
                    if(timeElement[timeElement.length - 2] == 'm') {
                        timePre = 'Monthly';
                    } else {
                        timePre = 'Yearly';
                    }
                    preElement3 = document.querySelector('.step-content_item').innerHTML;
                    curentPage = 4;
                    nextPage(curentPage);
                } else {
                    errorElement.innerText = selectorRule.filter((item) => {
                        return item  !== undefined
                    })[0];
                }
                options.onsubmit(courseInput);
            }
        }
    
    }
    Validator.isChecked = function(selector) {
        return {
            selector: selector,
            test: function (value) {
                return value == true ? undefined : 'This field is required';
            }
        }
    }
    Validator({
        form: '#form-group',
        rules: [
            Validator.isChecked('#Online'),
            Validator.isChecked('#Larger'),
            Validator.isChecked('#Customizable'),
        ],
        onsubmit: function (data) {
            return data
        }
        
    })
    const goback = document.querySelector('.goback-btn');
    goback.addEventListener('click',() => {
        curentPage = 2;
        nextPage(curentPage);
    })
}
function step4Fn() {
    const confirm = document.querySelector('.confirm');
    const goback = document.querySelector('.goback-btn');
    const totalSum = document.querySelector('.total-sum .sum');
    const eachMoney = Array.from(document.querySelectorAll('.money'));
    const changge = document.querySelector('.changebtn')
    var total = 0;
    var time = '';
    var regexNumber = /[0-9]/g;
    eachMoney.forEach(e => {
        var sumEach = e.innerText.match(regexNumber);
        var each = '';
        for( var i = 0 ; i < sumEach.length; i++) {
            each += sumEach[i]
        }
        total += Number(each);
    })
    for( let i = 0; i < eachMoney[0].innerText.length; i++) {
        if(i >= eachMoney[0].innerText.length - 3) {
            time += eachMoney[0].innerText[i]
        }
    }
    totalSum.innerText = '$' + total + time;
    confirm.onclick = () => {    
        curentPage = 5;
        var Infor = {
            'personal-infor': JSON.parse(localStorage.getItem('input')),
            'choose-course': JSON.parse(localStorage.getItem('yourplan')),
            'detail-course': JSON.parse(localStorage.getItem('courseInput')),
            'totalSum': totalSum.innerText
        }
        localStorage.setItem('Infor', JSON.stringify(Infor));
        nextPage(curentPage);
    }
    goback.onclick = () => {
        curentPage = 3;
        nextPage(curentPage);
    }
    changge.onclick = () => {
        curentPage = 2;
        nextPage(curentPage);
    }
}
function nextPage(index, timechoose) {
    switch (index) {
        case 1:
            stepItem.innerHTML = preElement;
            var inputPre = JSON.parse(localStorage.getItem('input'));
            const form = document.querySelector('#form-group');
            const formElements = Array.from(form.querySelectorAll('.form-item input'));
            resultPre(inputPre, formElements);
            step1Fn();
                break;
        case 2:
            if(preElement2) {
                stepItem.innerHTML = preElement2;
                step2Fn();
            } else {
                stepItem.innerHTML = `<h1>Select your plan</h1>
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
                <span class="goback-btn">Go Back</span>
                <button class="nextbtn step2" value="2">Next Step</button>
            </div>`;
            step2Fn();
            }
            break;
        case 3:
            var timechoose = JSON.parse(localStorage.getItem('yourplan'))['time-course'];
            if(preElement3) {
                    if(timePre == timechoose) {
                        stepItem.innerHTML = preElement3;
                        var elementcheck = JSON.parse(localStorage.getItem('courseInput'));
                        const formInput = Array.from(document.querySelectorAll('input'));
                        var elInput = formInput.map(item => {
                            return {item: item.getAttribute('value'), value: item}
                        })
                        for(var key in elementcheck) {
                            elInput.forEach(e => {
                                if(key == e.item) {
                                    e.value.checked = true;
                                }
                            })
                        }
                    } else {
                        stepItem.innerHTML = `
                    <h1>Pick add-ons</h1>
                    <p>  Add-ons help enhance your gaming experience.</p>
                    <form id="form-group" method="post">
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Online" type="checkbox" value="Online service">
                                <div class="title-content">
                                    <h3>Online service</h3>
                                    <p>Access to multiplayer games</p>
                                </div>
                            </div>
                            <p class="time">+$10/yr</p>
                        </div>
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Larger" type="checkbox" value="Larger storage">
                                <div class="title-content">
                                    <h3>Larger storage</h3>
                                    <p>Extra 1TB of cloud save</p>
                                </div>
                            </div>
                            <p class="time">+$20/yr</p>
                        </div>
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Customizable" type="checkbox" value="Customizable Profile">
                                <div class="title-content">
                                    <h3>Customizable Profile</h3>
                                    <p>Custom theme on your profile</p>
                                </div>
                            </div>
                            <p class="time">+$20/yr</p>
                        </div>
                        <span class="form-message fmess-step3"></span>
                        <div class="button-active" style="margin-top: 1rem;">
                            <span class="goback-btn">Go Back</span>
                            <button class="nextbtn step2" value="3">Next Step</button>
                        </div>
                    </form>
                    `
                }
                step3Fn();
            } else {
                if(timechoose == 'Monthly') {
                    stepItem.innerHTML = `
                    <h1>Pick add-ons</h1>
                    <p>  Add-ons help enhance your gaming experience.</p>
                    <form id="form-group" method="post">
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Online" type="checkbox" value="Online service">
                                <div class="title-content">
                                    <h3>Online service</h3>
                                    <p>Access to multiplayer games</p>
                                </div>
                            </div>
                            <p class="time">+$1/mo</p>
                        </div>
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Larger" type="checkbox" value="Larger storage">
                                <div class="title-content">
                                    <h3>Larger storage</h3>
                                    <p>Extra 1TB of cloud save</p>
                                </div>
                            </div>
                            <p class="time">+$2/mo</p>
                        </div>
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Customizable" type="checkbox" value="Customizable Profile">
                                <div class="title-content">
                                    <h3>Customizable Profile</h3>
                                    <p>Custom theme on your profile</p>
                                </div>
                            </div>
                            <p class="time">+$2/mo</p>
                        </div>
                        <span class="form-message fmess-step3"></span>
                        <div class="button-active" style="margin-top: 1rem;">
                            <span class="goback-btn">Go Back</span>
                            <button class="nextbtn step2" value="3">Next Step</button>
                        </div>
                    </form>
                    `
                } else {
                    stepItem.innerHTML = `
                    <h1>Pick add-ons</h1>
                    <p>  Add-ons help enhance your gaming experience.</p>
                    <form id="form-group" method="post">
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Online" type="checkbox" value="Online service">
                                <div class="title-content">
                                    <h3>Online service</h3>
                                    <p>Access to multiplayer games</p>
                                </div>
                            </div>
                            <p class="time">+$10/yr</p>
                        </div>
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Larger" type="checkbox" value="Larger storage">
                                <div class="title-content">
                                    <h3>Larger storage</h3>
                                    <p>Extra 1TB of cloud save</p>
                                </div>
                            </div>
                            <p class="time">+$20/yr</p>
                        </div>
                        <div class="form-item item_3">
                            <div class="input-title">
                                <input id="Customizable" type="checkbox" value="Customizable Profile">
                                <div class="title-content">
                                    <h3>Customizable Profile</h3>
                                    <p>Custom theme on your profile</p>
                                </div>
                            </div>
                            <p class="time">+$20/yr</p>
                        </div>
                        <span class="form-message fmess-step3"></span>
                        <div class="button-active" style="margin-top: 1rem;">
                            <span class="goback-btn">Go Back</span>
                            <button class="nextbtn step2" value="3">Next Step</button>
                        </div>
                    </form>
                    `
                }
                step3Fn();
            }
            break;
        case 4:        
            var resultStep2 = JSON.parse(localStorage.getItem('yourplan'))
            var resultStep3 = JSON.parse(localStorage.getItem('courseInput'));
            var nameCourse = resultStep2['item-choose'];
            if(resultStep2['time-course'] == 'Monthly') {
                nameCourse += '(Monthly)'
            } else {
                nameCourse += '(Yearly)'
            }
            var MoneyCourse = resultStep2['price'];
            var manyAdvanceCourse = [];
            var arrCourse = []
            for(var key in resultStep3) {
                manyAdvanceCourse.push({key: key, value: resultStep3[key]})
            }
            manyAdvanceCourse.forEach(e => {
                arrCourse.push(`<div class="total-content">
                                <p class="name-total">${e.key}</p>
                                <p class="money money-course">${e.value}</p>
                            </div>`)
            })

            stepItem.innerHTML = `
            <h1>  Finishing up</h1>
            <p>  Double-check everything looks OK before confirming.</p>
            <div id="form-group" method="post">
                <div class="form-item item_4">
                   <div class="total-table">
                        <div class="total-content line">
                            <span class="content">
                                <h3>${nameCourse}</h3>
                                <p class="changebtn">Change</p>
                            </span>
                            <p class="money">${MoneyCourse}</p>
                        </div>
                        ${arrCourse.join(' ')}          
                   </div>

                    <div class="total-content total-sum">
                        <p>Total (per month)</p>
                        <p class="time sum"></p>
                    </div>
                </div>
                

                <button class="goback-btn">Go Back</button>
                <button class="nextbtn step2 confirm" value="4">Confirm</button>
            </div>
            `
            step4Fn();
            break;
        case 5:
                stepItem.innerHTML = `
                <div class="thank-content">
                <img src="./img/images/icon-thank-you.svg" alt="">
                <h1>Thank you!</h1>
                <p class="phara">Thanks for confirming your subscription! We hope you have fun 
                    using our platform. If you ever need support, please feel free 
                    to email us at support@loremgaming.com.</p>
            </div>`;
                break;
        default:
            break;
    }
    numberAnimation(index);
}




