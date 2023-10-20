import { register, login } from "./api.js";
const root = document.getElementById("root");


const renderRoot = async (index=0) => {
    root.replaceChildren();
    const Register = 
    `
    <div class="form-wrapper">
            <section>
                <div id="form-toggle"><button name="login-toggle">Login</button><button id="active" name="cadastro-toggle">Cadastro</button></div>
            </section>
            <section>

                <form id="register-form">
                    <h2>Crie sua conta</h2>
                    
               
                    <input required id="name" name="name" type="text" placeholder="Seu nome completo*" maxlength="40"/>
                    <input required id="username" name="username" type="text" placeholder="Nome de usuário*" maxlength="15"/>
            
                    <div class="password-container"><input required id="password" name="password" type="password" minlength="8" maxlength="24" placeholder="Digite sua Senha*"><span role="button" class="eye"></span></div>      
                    <div class="password-container"><input required id="password-repeat" name="password-repeat" type="password" minlength="8" maxlength="24" placeholder="Repita sua senha*"><span role="button" class="eye"></span></div>
                    <button id="submit" type="submit">Criar sua conta</button>
                    <output id="output"></output>
                </form>
            </section>
    </div>
    `

    const Login = 
    `
    <div class="form-wrapper">
        <section>
                <div id="form-toggle"><button id="active" name="login-toggle">Login</button><button name="cadastro-toggle">Cadastro</button></div>
        </section>
        <section>

            <form id="login-form">
                <h2>Bem-vindo de volta!</h2>
                    
                <input required id="username" name="username" type="text" placeholder="Nome de usuário" maxlength="15"/>
                <div class="password-container"><input required id="password" name="password" type="password" minlength="8" maxlength="26" placeholder="Senha"><span role="button" class="eye"></span></div>
                <label for=""><input name="connect-checkbox" type="checkbox"> Manter conectado</label>
                <a href="./register.html">Esqueceu sua senha?</a>
                <button id="submit" type="submit">Login</button>
                <output id="output"></output>
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


    const passwordToggle = (el) => {

        const field = el.parentElement.firstChild;
        el.classList.toggle('closed');

        field.type = field.type === 'password' ? 'text' : 'password'; 
    }
    
    const Components = [LoginFragment, RegisterFragment];
    root.appendChild(Components[index]);

    // Password toggle
    document.querySelectorAll(".eye").forEach((el) => {el.addEventListener('click', (ev) => passwordToggle(ev.target))})

    // CADASTRO ============================
    const form = document.forms[0];
    form.onsubmit = async (ev) => {

        ev.preventDefault();
        
        if (form.id === 'register-form'){

            form.elements.output.innerText = '';
            
            const data = {
                name: form.elements.name.value,
                username: form.elements.username.value,
                password: form.elements.password.value
            }
            if (!data.name || !data.username || !data.password) return // Impede request se dados não tiverem sido preenchidos
        
            form.elements.name.disabled = true;
            form.elements.username.disabled = true;
            form.elements.password.disabled = true;
            form.elements.submit.disabled = true;
            document.body.style.cursor = 'wait';
            
            const request = await register(data);
            
            form.elements.output.innerText = request.message;
            document.body.style.cursor = 'inherit';

            form.elements.name.disabled = true;
            form.elements.username.disabled = true;
            form.elements.password.disabled = true;
            form.elements.submit.disabled = true;
            form.reset();
        };
        if (form.id === 'login-form'){
         
            form.elements.output.innerText = '';

            const data = {
                username: form.elements.username.value,
                password: form.elements.password.value
            }
            if (!data.username || !data.password) return // Impede request se dados não tiverem sido preenchidos

            form.elements.username.disabled = true;
            form.elements.password.disabled = true;
            form.elements.submit.disabled = true;

            document.body.style.cursor = 'wait';
            
            const request = await login(data);
        
            document.body.style.cursor = 'inherit';

            form.elements.username.disabled = false;
            form.elements.password.disabled = false;
            form.elements.submit.disabled = false;
            form.reset();

            sessionStorage.setItem('username', data.username);
            console.log(request);
            sessionStorage.setItem('auth', request.message.accessToken);

            if (!data.username || !data.password || !request.response.ok){
                form.elements.output.innerText = request.message.message;
            }
            else {
                const url = window.location.href.split('index.html')[0] + 'user.html';
                window.location.href = url;
            }
        }
    };
}

renderRoot();
