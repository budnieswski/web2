/* ==========================================================================
   Triggers
   ========================================================================== */
{

  $("#btn-cadastro-categoria").click(function(event){
    event.preventDefault();
     $("#dialog-cadastro-categoria").dialog("open");
  });


  $("#pedidos a[href=#check]").click(function(event){
    event.preventDefault();
    atualizaStatusPedido(
      $(this)
        .parent() // td
        .parent() // tr
        .attr('id')
    );
  });


  $( ".table-lista-lavagem td a" ).click(function(event){
    event.preventDefault();

    var obj = $(this),
        tipo = obj.attr('href').replace('#',''),
        idLavagem = obj.parent().parent().attr('id');

    if (tipo == "cancelar") {
      
      $("#dialog-cancelar-lavagem")
        .attr('data-remove-id', idLavagem) //passa o id da lavagem para a Dialog, para entao poder cancelar
        .dialog( "open" );

    } else if (tipo == "visualizar") {
      
      getItensLavagem(idLavagem);

    } else if (tipo == "endereco") {

      getEndereco(idLavagem);          
    
    } // endif;
  });


  $('#cancelar-pedido #pesquisar #enviar').click(function(event){
    event.preventDefault();

    var obj = $(this),
       form = obj.parent();

    var idLavagem = form.find('#pesquisa_id').val();

    if (!idLavagem) {
      $("#dialog-alert")
      .dialog("open")
      .html("Insira um numero de Pedido.");
      return false;
    }

    // Busca o pedido, verifica o status se possivel cancelar
    // abre a dialog
    // caso contrario mostra a dialog alert, com a mensagem
    
    $("#dialog-cancelar-lavagem")
        .attr('data-remove-id', idLavagem) //passa o id da lavagem para a Dialog, para entao poder cancelar
        .dialog( "open" );
  });


  $('#consultar-pedido #pesquisar #enviar').click(function(event){
    event.preventDefault();

    var obj = $(this),
       form = obj.parent();

    var idLavagem = form.find('input:not(:disabled)').val();

    if (!idLavagem) {
      $("#dialog-alert")
      .dialog("open")
      .html("Insira um numero de Pedido / Cliente.");
      return false;
    }
    // IF NUMERIC -> ID PEDIDO SENAO CLIENTE
    console.log("Pesquisando Cliente/id !") ;
  });


  // So deixa selecionar 1 campo
  // ID Pedido / Cliente
  $('#pesquisar input').focus(function(){
    o = $(this),
    n = o.attr('name');

    if (n=='pesquisa_id') {
      $('#pesquisa_cliente').attr('disabled', 'disabled');
    } else if (n=='pesquisa_cliente') {
      $('#pesquisa_id').attr('disabled', 'disabled');
    }
  }).blur(function(event) {
    o = $(this),
    n = o.attr('name');

    if (n=='pesquisa_id') {
      if (!$('#pesquisa_id').val())
        $('#pesquisa_cliente').removeAttr('disabled');
    } else if (n=='pesquisa_cliente') {
      if (!$('#pesquisa_cliente').val())
        $('#pesquisa_id').removeAttr('disabled');
    }
  });

}