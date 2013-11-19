jQuery(function($){

  /*
  * Default
  */
  {
    $( "#landing-login" ).tabs({ show: { effect: "fade", duration: 500 } });
    $( document ).tooltip();
    $( "input[type=submit], button" ).button();
    
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
  }


  /*
  * Masks
  */
  {
    $('input[name=cpf]').setMask({ mask: '999.999.999-99' });
    $('input[name=telefone]').setMask({ mask: '(99) 9999-9999' });
    $('input[name=telefone]').keyup(function () {
      var o = $(this),
      value = o.val();
      if (value[1] == '1' && value[2] == '1' && value[5] == '9') {
        o.setMask({
          mask: '(99) 99999-9999'
        });
      } else {
        o.setMask({
          mask: '(99) 9999-9999'
        });
      }
    });
  }

  function putErrorForm () {
    
  }

  /*
  * Formulario Login
  */
  {
    $("#login-form").validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        senha: {
          required: true,
          minlength: 6
        }
      },
      messages: {
        email: {
          required: 'Insira um E-mail',
          email: 'E-mail invalido'
        },
        senha: {
          required: 'Insira a senha',
          minlength: jQuery.format("A Senha deve conter no minimo {0} caracteres")
        }
      },
      submitHandler: function() {
        var form = $('#login-form').serialize();
        
        $.ajax({
          url: '../LoginAdmin',
          type: 'POST',
          data: form,
          success: function (data) {
              
              if (data=='true')
                  window.location.href = "../admin/home.html";
              else if (data=='false') {
                  
                  $("#dialog-alert")
                          .dialog("open")
                          .html("Login ou Senha incorretos");
              }

          }
        })
      },
      success: function(label) {
        label.remove();
      }
    })
  }

})