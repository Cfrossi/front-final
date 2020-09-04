function carregaInfo(){
    var infoUser = localStorage.getItem("pdvUser");
    if (!infoUser){
        window.location = "index.html";
    }
    var objUser  = JSON.parse(infoUser);

    var linhaHTML = `<div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <img src="${objUser.linkFoto}" width="100%">
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                           <strong> Nome: </strong> ${objUser.nome} <br>
                           <strong> RACF: </strong> ${objUser.racf} <br>
                           <strong> Email: </strong> ${objUser.email} <br>
                           <strong> Fone: </strong> ${objUser.telefone} <br>
                        </div>
                     </div>`;
    document.getElementById("dadosUsuario").innerHTML = linhaHTML;

    recuperaRelatorio();
}


function recuperaRelatorio(){
    fetch("http://localhost:8088/solicitacao/status/0")
      .then(res=>res.json())
      .then(lista=>preencheRelatorio(lista));
}

function preencheRelatorio(lista){
    var relHTML = "";
    for (i=0;i<lista.length; i++){
        var solic=lista[i];

        relHTML = relHTML+`<div class="row">

                             <div class="col-1 espaco-container-"> ${solic.numSeq} </div>
                             <div class="col-2 espaco-container-"> ${solic.dataSolicitacao} ${solic.horaSolicitacao} </div>
                             <div class="col-4 espaco-container-"> ${solic.nomeTecnico} <br>
                                                 ${solic.documento} / ${solic.telefone} </div>
                             <div class="col-4 espaco-container-"> ${solic.pdv.nome} </div>
                             <div class="col-12 espaco-container"><p class="espaco-p">Detalhes da Solicitação</p>
                             </div>
                             <div class="col-12"> ${solic.detalhes} </div>

                             <div class="col-12"> <button type="button" class="btn btn-success" 
                                                         onclick="atualizarStatus(${solic.numSeq},1)">APROVAR</button>
                                                 <button type="button" class="btn btn-danger" 
                                                         onclick="atualizarStatus(${solic.numSeq},2)">NEGAR</button>
                                                 <button type="button" class="btn btn-secondary espaco-btn" 
                                                         onclick="atualizarStatus(${solic.numSeq},3)">CANCELAR</button>
                             </div>
                             <div class="espaco"></div>
                          </div>`;
    }
    document.getElementById("relatorio").innerHTML = relHTML;
}


function atualizarStatus(numReq, novoStatus){
    var msgBody = {
        numSeq : numReq,
        situacao : novoStatus
    };
    var cabecalho = {
        method: "PUT",
        body : JSON.stringify(msgBody),
        headers: {
            "content-type":"application/json"
        }
    };
    fetch("http://localhost:8088/solicitacao/atualiza", cabecalho)
       .then(res => notificaSucesso());
}

function notificaSucesso(){
    alert("Solicitacao atualizada!");
    recuperaRelatorio();
}

function filtrarStatus(){
    var status = document.getElementById("selectFiltro").value;
    var url;
    if (status != -1){
        url = "http://localhost:8088/solicitacao/status/"+status;
    }
    else{
        url = "http://localhost:8088/solicitacao/todas";
    }
    fetch(url)
      .then(res => res.json())
      .then(lista => preencheRelatorio(lista));
}