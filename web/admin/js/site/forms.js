/* ==========================================================================
   Masks
   ========================================================================== */
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

/* ==========================================================================
   Forms
   ========================================================================== */
{

  /*
  * + Cliente
  */
  {
    // Cadastro
    $("#form-cadastro-cliente").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
        endereco: {
          required: true,
          minlength: 2
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
          remote: "../test?type=cpf"
        },
        email: {
          required: true,
          email: true,
          remote: "../test?type=email"
        },
        senha: {
          required: true,
          minlength: 6,
        },
        senha2: {
          required: true,
          equalTo: '#fcc_senha'
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
          remote: "CPF ja esta cadastrado"
        },
        email: {
          required: 'Insira um E-mail',
          email: 'Email invalido',
          remote: "E-mail ja esta cadastrado"
        },
        senha: {
          required: 'Digite uma Senha',
          minlength: jQuery.format("Senha com no minimo {0} caracteres")
        },
        senha2: {
          required: 'Repita a senha<br>',
          equalTo: 'As senhas nao sao iguais<br>'
        }
      },
      submitHandler: function(form) {
        cadastroCliente(form);
      },
      success: function(label) {
        label.remove();
      }
    });

    // Pesquisa
    $("#form-pesquisar-cliente").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
      },
      messages: {
        nome: {
          required: 'Insira um Nome<br>',
          minlength: jQuery.format("Nome com no minimo {0} caracteres<br>")
        },
      },
      submitHandler: function(form) {
        pesquisaCliente(form);
      },
      success: function(label) {
        label.remove();
      }
    });

    // Editar
    $("#form-editar-cliente").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
        endereco: {
          required: true,
          minlength: 2
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
          // remote: 'test.php?type=cpf'
        },
        email: {
          required: true,
          email: true,
          // remote: 'test.php?type=email'
        },
        senha: {
          required: false,
          minlength: 6,
        },
        senha2: {
          required: false,
          equalTo: '#fec_senha'
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
          remote: "CPF ja esta cadastrado"
        },
        email: {
          required: 'Insira um E-mail',
          email: 'Email invalido',
          remote: "E-mail ja esta cadastrado"
        },
        senha: {
          minlength: jQuery.format("Senha com no minimo {0} caracteres")
        },
        senha2: {
          equalTo: 'As senhas nao sao iguais<br>'
        }
      },
      submitHandler: function(form) {
        console.log("try");
      },
      success: function(label) {
        label.remove();
      }
    });
  } // end +Cliente


  /*
  * + Roupas
  */
  {
    // Cadastro
    $("#form-cadastro-roupa").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
        categoria: {
          required: true
        },
        preco: {
          required: true
        },
        imagem: {
          required: true
        },
        prazo: {
          required: true
        }
      },
      messages: {
        nome: {
          required: 'Insira um Nome',
          minlength: jQuery.format("Nome com no minimo {0} caracteres")
        },
        categoria: {
          required: 'Selecione uma Categoria'
        },
        preco: {
          required: 'Insira um Preço',
        },
        imagem: {
          required: 'Selecione uma Imagem',
        },
        prazo: {
          required: 'Insira um Prazo<br>',
        }
      },
      submitHandler: function() {
        alert("submitted!");
      },
      success: function(label) {
        label.remove();
      }
    });

    // Pesquisa
    $("#form-pesquisar-roupa").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        }
      },
      messages: {
        nome: {
          required: 'Insira um Nome<br>',
          minlength: jQuery.format("Nome com no minimo {0} caracteres<br>")
        }
      },
      submitHandler: function() {
        alert("submitted!");
      },
      success: function(label) {
        label.remove();
      }
    });

    // Editar
    $("#form-editar-roupa").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
        categoria: {
          required: true
        },
        preco: {
          required: true
        },
        imagem: {
          required: true
        },
        prazo: {
          required: true
        }
      },
      messages: {
        nome: {
          required: 'Insira um Nome',
          minlength: jQuery.format("Nome com no minimo {0} caracteres")
        },
        categoria: {
          required: 'Selecione uma Categoria'
        },
        preco: {
          required: 'Insira um Preço',
        },
        imagem: {
          required: 'Selecione uma Imagem',
        },
        prazo: {
          required: 'Insira um Prazo<br>',
        }
      },
      submitHandler: function() {
        alert("submitted!");
      },
      success: function(label) {
        label.remove();
      }
    });
  } // end +Roupas


  /*
  * + Funcionario
  */
  {
    // Cadastro
    $("#form-cadastro-funcionario").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          email: true,
          // remote: 'test.php?type=email'
        },
        data: {
          required: true
        },
        senha: {
          required: true,
          minlength: 6,
        },
        senha2: {
          required: true,
          equalTo: '#fcf_senha2'
        }
      },
      messages: {
        nome: {
          required: 'Insira um Nome',
          minlength: jQuery.format("Nome com no minimo {0} caracteres")
        },
        email: {
          required: 'Insira um E-mail',
          email: 'Email invalido',
          remote: "E-mail ja esta cadastrado"
        },
        data: {
          required: 'Selecione uma Categoria'
        },
        senha: {
          required: 'Digite uma Senha',
          minlength: jQuery.format("Senha com no minimo {0} caracteres")
        },
        senha2: {
          required: 'Repita a senha<br>',
          equalTo: 'As senhas nao sao iguais<br>'
        }
      },
      submitHandler: function() {
        alert("submitted!");
      },
      success: function(label) {
        label.remove();
      }
    });

    // Pesquisa
    $("#form-pesquisar-funcionario").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        }
      },
      messages: {
        nome: {
          required: 'Insira um Nome<br>',
          minlength: jQuery.format("Nome com no minimo {0} caracteres<br>")
        }
      },
      submitHandler: function() {
        alert("submitted!");
      },
      success: function(label) {
        label.remove();
      }
    });

    // Editar
    $("#form-editar-funcionario").validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          email: true,
          // remote: 'test.php?type=email'
        },
        data: {
          required: true
        },
        senha: {
          minlength: 6,
        },
        senha2: {
          equalTo: '#fef_senha2'
        }
      },
      messages: {
        nome: {
          required: 'Insira um Nome',
          minlength: jQuery.format("Nome com no minimo {0} caracteres")
        },
        email: {
          required: 'Insira um E-mail',
          email: 'Email invalido',
          remote: "E-mail ja esta cadastrado"
        },
        data: {
          required: 'Selecione uma Categoria'
        },
        senha: {
          minlength: jQuery.format("Senha com no minimo {0} caracteres")
        },
        senha2: {
          equalTo: 'As senhas nao sao iguais<br>'
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
  

}