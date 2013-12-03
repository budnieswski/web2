/* ==========================================================================
   Functions
   ========================================================================== */
{

  function cadastroCategoria (categoriaNome) {
    console.log(categoriaNome);
  }
  
  
  function cadastroCliente (form) {
//    console.log($(form).serialize());
//    console.log(JSON.stringify($(form).serializeArray()));
    var form2 = JSON.stringify($(form).serializeArray());
    var form3 = $(form).serializeArray();
    
//    var fields=new Array();
//           var values = new Array();
//
//           fields = $(form).serializeArray();
//           $.each(fields, function(index,element){
//             values.push(element.value);
//           });
//           
//           console.log(values);
        
        $.ajax({
          url: '../CadastroCliente',
          type: 'POST',
          data: form2,
          success: function (data) {
              
              console.log(data);

          }
        })

  }


  // funcao que atualiza o status do pedido
  function atualizaStatusPedido (idLavagem) {
    console.log("ja na funcao atualizar status; id=" +idLavagem);
  }


  // funcao para cancelar a lavagem
  function cancelarLavagem(idLavagem) {
    console.log("ja na funcao cancelar; id=" +idLavagem);
  }


  // funcao que mostra os itens da lavagem
  function getItensLavagem (idLavagem) {
    // <Escopo> Consulta via ajax, e recebe um JSON ...
      var jSON = [
          {"id":"2","quantidade":"10","imagem":"img\/lavagem\/itens\/bermuda\/jeans.jpg"},
          {"id":"6","quantidade":"3","imagem":"img\/lavagem\/itens\/calca\/saia-jeans.jpg"}
      ];

      var toMSG = '<ul class="itens ui-helper-reset">';
      $.each(jSON, function(index, item){
        toMSG += '<li class="ui-widget-content ui-corner-tr ui-draggable" style="width: 48px;">';
        toMSG += item.quantidade + 'x<img src="'+item.imagem+'" style="display: inline-block; height: 36px;">';
        toMSG += '</li>';
      });
      toMSG += '</ul>';

      // coloca os intens da lavagem na dialog
      $("#dialog-itens-lavagem").dialog("open").html(toMSG);
  }


  // funcao para buscar o endereco e retornar na dialog
  function getEndereco (idLavagem) {
    // <Escopo> Consulta via ajax

    // Retorna a Dialog com o endereco
    $("#dialog-alert")
        .dialog( "open" )
        .html("Endereço: Rua ABC, numero 10");
  }

}