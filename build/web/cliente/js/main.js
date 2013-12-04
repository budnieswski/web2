jQuery(function($){

  /* ==========================================================================
   Default
   ========================================================================== */
  {
    $( "#wrap" ).tabs({ active: 0, show: { effect: "fade", duration: 500 } });
    $( ".menu-options li:last-child" ).css('float','right');
    $( "input[type=submit], button" ).button();
    $( ".accordion" ).accordion({
      heightStyle: "content",
        icons: {
          header: "ui-icon-circle-arrow-e",
          activeHeader: "ui-icon-circle-arrow-s"
        }
      });
    $( ".styleTable" ).styleTable();
    
    
    // Deslogar
    $(".menu-options a[href*='deslogar']").click(function(event){
      event.preventDefault();
       window.location.href = "./deslogar.jsp";
       return false;
    });

    /*
    * Dialogs
    */
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
    } // end <Dialogs>;
  
  } // end <Default>;



  /* ==========================================================================
   Lavagem
   ========================================================================== */
  {
    var $itens = $( "#itens" ),
        $cesto = $( "#cesto" );

    /*
    * Setup
    */
    {
      // faz os itens ficarem 'draggable'
      $( "li", $itens ).draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        helper: "clone",
        cursor: "move"
      });

      // faz o cesto ficar 'droppable', aceitando os itens
      $cesto.droppable({
        accept: "#itens  li",
        activeClass: "ui-state-highlight",
        drop: function( event, ui ) {
          adicionarItem( ui.draggable );
        }
      });

      // faz a galeria de itens ficar 'droppable', aceitando os itend do cesto
      $itens.droppable({
        accept: "#cesto li",
        activeClass: "custom-state-active",
        drop: function( event, ui ) {
          removerItem( ui.draggable );
        }
      });
    } // end <Setup>;

    /*
    * Dialogs
    */
    {
      // dialog para esvaziar o cesto
      $("#dialog-esvaziar-cesto").dialog({
        autoOpen: false,
        resizable: false,
        width: 350,
        modal: true,
        buttons: {
          "Esvaziar o cesto": function() {
            limpaCesto();
            $(this).dialog("close");
          },
          Fechar: function() {
            $(this).dialog("close");
          }
        }
      });

      // dialog para a finalizacao do cesto
      $("#dialog-finalizar-cesto").dialog({
        autoOpen: false,
        resizable: false,
        width: 350,
        modal: true,
        buttons: {
          "Finalizara a coleta": function() {
            finalizarCesto();
            $(this).dialog("close");
          },
          Voltar: function() {
            $(this).dialog("close");
          }
        }
      });
    } // end <Dialogs>;

    /*
    * Triggers
    */
    {
      // limpa o cesto ao clicar no botao 'Esvaziar'
      $('.limpar-cesto').click(function(event){
        event.preventDefault();
        $("#dialog-esvaziar-cesto").dialog( "open" );
      });

      // pega os itens do formulario hidden e envia
      $('.finalizar-cesto').click(function(event){
        event.preventDefault();
        $("#dialog-finalizar-cesto").dialog( "open" );
      });

      // adiciona o item ao clicar no 'plus'
      $( "ul.itens  li" ).click(function( event ) {
        
        var $item = $( this ),
          $target = $( event.target );
   
        if ( $target.is( "a.ui-icon-plus" ) ) {
          adicionarItem( $item );
        }
   
        return false;
      });
    } // end <Triggers>;

    /*
    * Functions
    */
    {
      // funcao para colocar item no cesto
      function adicionarItem( $item ) {

        var $cloned_item = $item.clone(),
                   $list = $( "ul", $cesto ).length ?
                           $( "ul", $cesto ) :
                           $( "<ul class='itens ui-helper-reset'/>" ).appendTo( $cesto ),
                   $form = $( "form", $cesto ).length ?
                           $( "form", $cesto ) :
                           $( "<form id='formlavanderia' />" ).appendTo( $cesto );

             icon_return = "<a href='#remover-cesto' title='Remover do cesto' class='ui-icon ui-icon-arrowthick-1-w'>Remover do cesto</a>",
            category     = $item.parent().attr('id'),
            product      = $item.attr('data-id');

        // Quando foi clonado, nao foi pego todas as propriedades, entao e necessario
        // 'redraggar' o item
        $cloned_item
          .draggable({
            cancel: "a.ui-icon",
            revert: "invalid",
            containment: "document",
            helper: "clone"
          })
          .click(function( event ){
            event.preventDefault();
            if ( $( event.target ).is( "a.ui-icon-arrowthick-1-w" ) ) {
              removerItem( $(this) );
            }
          });        
   
        $cloned_item.find( "a.ui-icon-plus" ).remove();
        $cloned_item.find( "div.price" ).hide();

        // Verifica se ja existe o produto no CESTO
        var hasItem = $("#cesto").find('li[data-id='+product+']');
        if ( hasItem.length) {

          var _total = (hasItem.find('div.quantidade').text()*1) + 1;

          // Texto da quantidade
          hasItem.find('div.quantidade').html( _total );

          // Atualiza no formulario de envio
          $("#formlavanderia").find('input[data-id='+product+']').attr('value', _total);

        } else {

          // Cria div de quantidade
          $cloned_item.find( "div.price" ).after("<div class=\"quantidade\">1</div>");

          // Adiciona no formulario para posterior envio
          $("#formlavanderia")
            .append('<input type="hidden" name="'+category+'[]" data-id="'+product+'" value="1" />');

          $cloned_item.append( icon_return )
          .appendTo( $list )
          .fadeIn(function() {
            $cloned_item
              .animate({ width: "48px" })
              .find( "img" )
              .animate({ height: "36px" });
          });

        }        

        // altera o valor do preco total
        plusValorTotal( $('.price span.js-money', $cloned_item).text() );
      }



      // funcao para retirar do cesto
      function removerItem( $item ) {
        console.log($item);

        var quantidade = $item.find('.quantidade');

        if (quantidade.text() == 1) {

          // remove o item do formulario 'hidden'
          $("#formlavanderia").find('input[data-id='+$item.attr('data-id')+']').remove();

          // retira o item do cesto
          $item.remove();

        } else {

          var novaQuantidade = (quantidade.text()*1)-1;

          // Altera dentro do cesto
          quantidade.text( novaQuantidade );

          // Altera no formulario de envio
          $("#formlavanderia")
            .find('input[data-id='+$item.attr('data-id')+']')
              .attr('value', novaQuantidade);

        }

        // Diminui o valor do preco total
        minusValorTotal( $('.price span.js-money', $item).text() );
        
      }

      // funcao para AUMENTAR o valor total da lavagem
      function plusValorTotal ( $item_price ) {
        var $elem_total = $('.valor-lavagem'),
           $valor_total = $elem_total.toNumber().text();

        $item_price *= 1; // transforma para INT
        $valor_total *= 1; // transforma para INT

        $elem_total
          .text( $valor_total+$item_price )
          .formatCurrency({symbol: "R$ "});
      }

      // funcao para DIMINUIR o valor total da lavagem
      function minusValorTotal ( $item_price ) {
        var $elem_total = $('.valor-lavagem'),
           $valor_total = $elem_total.toNumber().text();

        $item_price *= 1; // transforma para INT
        $valor_total *= 1; // transforma para INT

        $elem_total
          .text( $valor_total-$item_price )
          .formatCurrency({symbol: "R$ "});
      }

      // funcao para limpar o cesto
      function limpaCesto () {
        var form = $('#formlavanderia').serialize();

        // 'cesto'(form) vazio, ja esta vazio
        if (!form.length) {
          $("#dialog-alert")
            .dialog("open")
            .html("O cesto ja esta vazio (*_*)");
          return false;
        }

        $('#cesto .itens').remove();
        $('#cesto #formlavanderia').remove();
        $('.valor-lavagem')
          .text(0)
          .formatCurrency({symbol: "R$ "});
      }

      // funcao para finalizar o cesto
      function finalizarCesto () {
        var form = $('#formlavanderia input');

        // Cria o array para ser enviado
        var lop = {};
        $.each(form, function(index, val) {
          lop[index] = {
            id:$(this).attr('data-id'),
            quantidade:$(this).val()
          }
        });

        // 'cesto'(form) vazio, nao deixa finalizar
        if (!form.length) {
          $("#dialog-alert")
            .dialog("open")
            .html("Nao e possivel finalizar um cesto se ele esta vazio >.<");
          return false;
        }

        $.ajax({
          url: 'test.php',
          type: 'POST',
          data: lop,
          success: function (data) {
            console.log(data);
          }
        })
      }
    } // end <Functions>;
  
  } // end <Lavagem>;

  

  /* ==========================================================================
   Table Lista Lavagem (Visualizar Lavagens/Cancelar Lavagem)
   ========================================================================== */
  {
    /*
    * Dialogs
    */
    {
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
    } // end <Dialogs>;

    /*
    * Triggers
    */
    {
      $( ".table-lista-lavagem td a" ).click(function(event){
        event.preventDefault();
        var obj = $(this),
            tipo = obj.attr('href').replace('#',''),
            idLavagem = obj.parent().parent().attr('id');

        if (tipo == "cancelar") {
          
          $("#dialog-cancelar-lavagem")
            .attr('data-remove-id', idLavagem) //passa o id da lavagem para a Dialog, para poder cancelar
            .dialog( "open" );

        } else if (tipo == "visualizar") {
          
          // <Escopo> Consulta via ajax, e recebe um JSON ...
          var jSON = [
              {"id":"2","quantidade":"10","imagem":"img\/lavagem\/itens\/bermuda\/jeans.jpg"},
              {"id":"6","quantidade":"3","imagem":"img\/lavagem\/itens\/sapato\/sapatilha.jpg"}
          ];

          var toMSG = '';
          $.each(jSON, function(index, item){
            toMSG += '<li class="ui-widget-content ui-corner-tr ui-draggable" style="width: 48px;">';
            toMSG += item.quantidade + 'x<img src="'+item.imagem+'" style="display: inline-block; height: 36px;">';
            toMSG += '</li>';
          });

          // coloca os intens da lavagem na dialog
          $("#dialog-itens-lavagem").dialog("open").find('ul').html(toMSG);

        } // endif <visualizar>;
      });

    } // end <Triggers>;

    /*
    * Functions
    */
    {
      // funcao para cancelar a lavagem
      function cancelarLavagem(id) {
        console.log("ja na funcao cancelar; id=" +id);
      }
    }
    
  } // end <Visualizar Lavagem>;

})