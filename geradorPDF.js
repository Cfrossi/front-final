function gerarPDF(){
    var parametro = window.location.search;
    var status = parametro.substr(8);

    fetch("http://localhost:8088/solicitacao/status/"+status)
      .then(res => res.json())
      .then(lista => preencheRelatorio(lista));

}


function preencheRelatorio(lista){
    var relHTML = "";
    for (i=0;i<lista.length; i++){
        var solic=lista[i];

        relHTML = relHTML+`<div class="row">
                             <div class="col-1"> ${solic.numSeq} </div>
                             <div class="col-2"> ${solic.dataSolicitacao} ${solic.horaSolicitacao} </div>
                             <div class="col-4"> ${solic.nomeTecnico} <br>
                                                 ${solic.documento} / ${solic.telefone} </div>
                             <div class="col-3"> ${solic.pdv.nome} </div>
                             <div class="col-12">${solic.detalhes} </div>
                          </div>`;
    }
    document.getElementById("relatorio").innerHTML = relHTML;
    window.print();
}