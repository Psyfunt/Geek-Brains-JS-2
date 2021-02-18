const form = document.querySelector('.burger-form');
function getFormValues(event) {
    event.preventDefault();

    const size = form.querySelector('.burgerSize'),
        burgerFilling = form.querySelector('.burgerFilling'),
        seasoning = form.querySelector('.seasoning'),
        mayonnaise = form.querySelector('.mayonnaise');
    const values = {
        size: size.value,
        burgerFilling: burgerFilling.value,
        seasoning: seasoning.checked,
        mayonnaise: mayonnaise.checked
    }
    console.log(values);
}
form.addEventListener('submit', getFormValues);