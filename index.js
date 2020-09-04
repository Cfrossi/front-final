function enviar(){
    // primeira coisa de tudo: quero acessar os inputs e ver os dados que foram digitados
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    // console.log("digitados: "+txtLogin+" / "+txtSenha);

    // preciso montar a requisição POST para o backend
    // passo 1 - criar a estrutura do CORPO (Body da requisicao)
    var msgBody = {
        email : txtLogin,
        racf  : txtLogin, 
        senha : txtSenha
    };

    console.log(JSON.stringify(msgBody));
    // passo 2 - preciso montar o cabeçalho da mensagem
    var cabecalho = {
        method : "POST",
        body   : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }
    };

    fetch("http://localhost:8088/login",cabecalho)
       .then(res => tratarResposta(res));
}

function tratarResposta(res){
    if (res.status == 200){
        res.json().then(objUser => logar(objUser))
    }
    else if (res.status == 404){
        document.getElementById("resultado").innerHTML = "Usuario Desconhecido";
    }
    else if (res.status == 403){
        document.getElementById("resultado").innerHTML = "Senha Invalida";
    }
    else {
        document.getElementById("resultado").innerHTML = "Erro Desconhecido";
    }
}

function logar(objUser){
    console.log(objUser);
    localStorage.setItem("pdvUser", JSON.stringify(objUser));
    window.location = "dashboard.html";
}