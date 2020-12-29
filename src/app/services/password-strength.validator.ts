import { AbstractControl, ValidationErrors } from "@angular/forms"
export const PasswordStrengthValidator=function (control:AbstractControl):ValidationErrors | null{
    let value:string=control.value || '';
    if(!value){
        return null
    }

    let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain Upper case characters` };
  }

  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain lower case characters` };
  }

  let space=' ';
  if(value.indexOf(space)>=0){
    return { passwordStrength: `password should not contain spaces` };
  }
   
  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain numbers ` };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `password has to contain special character` };
  }
  if(value.length<8){
    return { passwordStrength: `length should be minimum 8 characters` };
  }
  return null;
}
 //product code validation
 export const productCodeValidators = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  if (!value) {
    return null;
  }
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) === true) {
    return {
      ProductCodeValidation: `Product Code should not contain special character`,
    };
  }
  let space = ' ';
  if (value.indexOf(space) >= 0) {
    return {
      ProductCodeValidation: `Product Code should not contain spaces`,
    };
  }
  if (value.length < 4) {
    return {
      ProductCodeValidation: `Product Code should be minimum 4 characters`,
    };
  }
  if (value.length > 6) {
    return {
      ProductCodeValidation: `Product Code should be maximum 6 characters `,
    };
  }
};

//product name validation
export const productNameValidators = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  if (!value) {
    return null;
  }
  if (/\S/.test(value) === false) {
    return {
      ProductnameValidation: `Product Name should not contain the whitespaces`,
    };
  }
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) === true) {
    return {
      ProductnameValidation: `Product Name should not contain special character`,
    };
  }
  if (value.length < 4) {
    return {
      ProductnameValidation: `Product Name should be minimum 4 characters`,
    };
  }
  if (value.length > 20) {
    return {
      ProductnameValidation: `Product Name should be maximum 20 characters `,
    };
  }
};

//description validation
export const descriptionValidators = function (
  control: AbstractControl
): ValidationErrors | null {
  let value: string = control.value || '';
  if (!value) {
    return null;
  }
  if (/\S/.test(value) === false) {
    return {
      DescriptionValidation: `Description should not contain whitespaces `,
    };
  }
   let specialCharacters = /^[0-9!@#\$%\^\&*\)\(+=._-]+$/;
  // if(specialCharacters.test(value)===true)
  // {
  //   return {
  //     DescriptionValidation: `Description should not contain sequence of special characters `,
  //   };
  // }
  if (value.replace(specialCharacters, '').length < 10) {
    return {
      DescriptionValidation: `Description should be minimum 10 characters`,
    };
  }
  if (value.replace(specialCharacters, '').length > 100) {
    return {
      DescriptionValidation: `Description should be maximum 100 characters `,
    };
  }
};