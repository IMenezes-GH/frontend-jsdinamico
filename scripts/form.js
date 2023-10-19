import { register } from "./api.js";
const root = document.getElementById("root");

const formToggle = (el, callback) => {

    if (el.name === 'login-toggle'){
        callback(0);
    }
    if (el.name === 'cadastro-toggle'){
        callback(1);
    }
}

const renderRoot = async (index=0) => {
    root.replaceChildren();
    const Register = 
    `
    <div class="wrapper">
            <section>
                <div id="form-toggle"><button name="login-toggle">Login</button><button id="active" name="cadastro-toggle">Cadastro</button></div>
            </section>
            <section>

                <form id="login-form" onsubmit="test">
                    <h2>Cadastro</h2>
                    
               
                    <input id="name" name="name" type="text" placeholder="Seu nome completo*" maxlength="12"/>
                    <input id="username" name="username" type="text" placeholder="Nome de usuário*" maxlength="12"/>
            
                    <div class="password-container"><input id="password" name="password" type="password" maxlength="24" placeholder="Digite sua Senha*"><span role="button" onclick=passwordToggle(this) class="eye"></span></div>      
                    <div class="password-container"><input id="password-repeat" name="password-repeat" type="password" maxlength="24" placeholder="Repita sua senha*"><span role="button" class="eye" onclick=passwordToggle(this)></span></div>
                    <button type="submit">Criar sua conta</button>
        
                </form>
            </section>
    </div>
    `

    const Login = 
    `
    <div class="wrapper">
        <section>
                <div id="form-toggle"><button id="active" name="login-toggle">Login</button><button name="cadastro-toggle">Cadastro</button></div>
        </section>
        <section>

            <form id="login-form" onsubmit="test(this)">
                <h2>Bem-vindo de volta!</h2>
                    
                <input id="username" name="username" type="text" placeholder="Nome de usuário" maxlength="12"/>
                <div class="password-container"><input id="password" name="password" type="password" maxlength="26" placeholder="Senha"><span role="button" class="eye" onclick=passwordToggle(this)></span></div>
                <label for=""><input name="connect-checkbox" type="checkbox"> Manter conectado</label>
                <a href="./register.html">Esqueceu sua senha?</a>
                <button type="submit">Login</button>
            </form>
        </section>
    </div>    
    `
    const LoginFragment = document.createElement('div')
    LoginFragment.innerHTML = Login

    LoginFragment.querySelectorAll('#form-toggle button').forEach((el) => {el.addEventListener('click', (ev) => {
        if (el.name === 'login-toggle'){
            renderRoot(0);
        }
        if (el.name === 'cadastro-toggle'){
            renderRoot(1);
        }
    })})

    const RegisterFragment = document.createElement('div')
    RegisterFragment.innerHTML = Register

    RegisterFragment.querySelectorAll('#form-toggle button').forEach((el) => {el.addEventListener('click', (ev) => {
        if (el.name === 'login-toggle'){
            renderRoot(0);
        }
        if (el.name === 'cadastro-toggle'){
            renderRoot(1);
        }
    })})
    
    const Components = [LoginFragment, RegisterFragment];
    root.appendChild(Components[index]);

    const form = document.forms[0];
    form.onsubmit = async (ev) => {
        ev.preventDefault();

        const data = {
            name: form.elements.name.value,
            username: form.elements.username.value,
            password: form.elements.password.value
        }
        
        const request = await register(data);
        console.log(request);
    };
}

renderRoot();
