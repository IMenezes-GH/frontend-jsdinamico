const passwordToggle = (el) => {

    const field = el.parentElement.firstChild;
    el.classList.toggle('closed');

    field.type = field.type === 'password' ? 'text' : 'password'; 
}

export const test = () => {
    console.log('test')
}