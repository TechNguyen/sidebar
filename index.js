const nextbtn = document.querySelector('.nextbtn');
const stepContent = document.querySelector('.step-content_item')
var curentPage = 0;
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
            var errorMessageAr = []
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
            if(isValidated) {
                errorMessageAr.forEach(e => {
                    e.selector.innerText =  '';
                    e.inputSelector.classList.remove('error')
                })
                curentPage = 1;
            } else {
                errorMessageAr.forEach(e => {
                    e.selector.innerText = e.errorMessage;
                    e.inputSelector.classList.add('error')
                })
            }

            return 1
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
        console.log(data);
    }
    
})