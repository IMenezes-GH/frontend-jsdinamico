const root = document.getElementById("root");

const formToggle = (el) => {

    if (el.name === 'login-toggle'){
        renderRoot(0);
    }
    if (el.name === 'cadastro-toggle'){
        renderRoot(1);
    }

}

const passwordToggle = (el) => {

    const field = el.parentElement.firstChild;
    el.classList.toggle('closed');

    field.type = field.type === 'password' ? 'text' : 'password'; 
}

const renderRoot = (index=0) => {

    const Register = 
    `
    <div class="wrapper">
            <section>
                <div id="form-toggle"><button onclick="formToggle(this)" name="login-toggle">Login</button><button id="active" name="cadastro-toggle">Cadastro</button></div>
            </section>
            <section>

                <form id="login-form" action="">
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
                <div id="form-toggle"><button id="active" name="login-toggle">Login</button><button onclick="formToggle(this)" name="cadastro-toggle">Cadastro</button></div>
        </section>
        <section>

            <form id="login-form" action="">
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

    const Components = [Login, Register];

    root.innerHTML = Components[index];
}

renderRoot();
