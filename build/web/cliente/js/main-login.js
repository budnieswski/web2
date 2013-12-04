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
          url: '../LoginCliente',
          type: 'POST',
          data: form,
          success: function (data) {
              console.log(data);
              if (data=='true')
                  window.location.href = "../cliente/home.jsp";
              else if (data=='false') {
                  
                  $("#dialog-alert")
                          .dialog("open")
                          .html("Login ou Senha incorretos");
                  console.log("depois");
              }

          }
        })
      },
      success: function(label) {
        label.remove();
      }
    })
  }
  

  /*
  * Formulario Cadastro
  */
  {

    $("#cadastro-form").validate({
      rules: {
        nome: {
          required: true,
          minlength: 6
        },
        endereco: {
          required: true,
          minlength: 6
        },
        sexo: {
          required: true
        },
        telefone: {
          required: true,
          minlength: 6
        },
        cpf: {
          required: true,
          minlength: 11,
//          remote: 'test.php?type=cpf'
        },
        email: {
          required: true,
          email: true,
//          remote: 'test.php?type=email'
        },
        senha: {
          required: true,
          minlength: 6,
        },
        senha2: {
          required: true,
          equalTo: '#csenha'
        }
      },
      messages: {
        nome: {
          required: 'Insira um Nome',
          minlength: jQuery.format("Nome com no minimo {0} caracteres")
        },
        endereco: {
          required: 'Insira um Endereco',
          minlength: jQuery.format("Endereco com no minimo {0} caracteres")
        },
        sexo: {
          required: 'Selecione um Sexo'
        },
        telefone: {
          required: 'Insira um Telefone',
          minlength: jQuery.format("Telefone com no minimo {0} caracteres")
        },
        cpf: {
          required: 'Insira um CPF',
          minlength: jQuery.format("CPF deve conter {0} numeros"),
//          remote: "CPF ja esta cadastrado"
        },
        email: {
          required: 'Insira um E-mail',
          email: 'Email invalido',
//          remote: "E-mail ja esta cadastrado"
        },
        senha: {
          required: 'Digite uma Senha',
          minlength: jQuery.format("Senha com no minimo {0} caracteres")
        },
        senha2: {
          required: 'Repita a senha',
          equalTo: 'As senhas nao sao iguais'
        }
      },
      submitHandler: function() {
        alert("submitted!");
      },
      success: function(label) {
        label.remove();
      }
    });

  }
  

})