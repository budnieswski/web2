/* ==========================================================================
 Dialogs
 ========================================================================== */
{

  // dialog default, para interacao
  $("#dialog-alert").dialog({
    autoOpen: false,
    resizable: false,
    width: 350,
    modal: true,
    buttons: {
      Fechar: function() {
        $(this).dialog("close");
      }
    }
  });


  // dialog para cadastrar uma nova cateria
  $("#dialog-cadastro-categoria").dialog({
    autoOpen: false,
    resizable: false,
    width: 300,
    modal: true,
    buttons: {
      Cadastrar: function() {
        cadastroCategoria($(this).find('input').val());
        $(this).dialog("close");
      },
      Fechar: function() {
        $(this).dialog("close");
      }
    }
  });


  // dialog para mostrar itens da lavagem
  $("#dialog-itens-lavagem").dialog({
    autoOpen: false,
    resizable: false,
    width: 350,
    modal: true,
    buttons: {
      Fechar: function() {
        $(this).dialog("close");
      }
    }
  });

  
  // dialog para cancelar a lavagem
  $("#dialog-cancelar-lavagem").dialog({
    autoOpen: false,
    resizable: false,
    width: 350,
    modal: true,
    buttons: {
      "Sim cancelar lavagem": function() {
        cancelarLavagem($(this).attr('data-remove-id'));
        $(this).removeAttr('data-remove-id');
        $(this).dialog("close");
      },
      Fechar: function() {
        $(this).removeAttr('data-remove-id');
        $(this).dialog("close");
      }
    }
  });

}