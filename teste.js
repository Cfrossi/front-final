function preencherPagina(){

    fetch("http://localhost:8088/pdv/todos")   // "promessa de execução"
       .then(res => res.json())                // vou extrair o JSON do resultado que vier
       .then(lista => trataConteudoDaLista(lista));
}


function trataConteudoDaLista(lista){
    // aqui efetivamente eu quero trabalhar com os objetos que eu recebi do BackEnd


    var conteudoHTML = "";
    for (i=0; i<lista.length; i++){
        var pdv = lista[i];
        var estilo="";
        if (i%2 == 0){
            estilo = "linhaPar";
        }
        else{
            estilo = "linhaImpar";
        }

        // conteudoHTML = conteudoHTML + `<div class="row ${estilo}">
        //                                   <div class="col-2">${pdv.numeroPonto}</div>
        //                                   <div class="col-5">${pdv.nome}</div>
        //                                   <div class="col-5">${pdv.endereco}</div>
        //                                </div>`;

        conteudoHTML = conteudoHTML +`<option value="${pdv.id}">${pdv.nome}</option>`;
    }
    document.getElementById("listaDePDV").innerHTML = `<select class="form-control form-control-lg"> ${conteudoHTML} <select>`;

}