
// const formToggle = (el) => {

//     if (el.name === 'login-toggle'){
//         return 0;
//     }
//     if (el.name === 'cadastro-toggle'){
//         return 1;
//     }
// }




const passwordToggle = (el) => {

    const field = el.parentElement.firstChild;
    el.classList.toggle('closed');

    field.type = field.type === 'password' ? 'text' : 'password'; 
}