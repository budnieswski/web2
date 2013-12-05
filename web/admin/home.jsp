<%@taglib prefix="c"uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!doctype html>
<!--[if lt IE 7]>       <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>          <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>          <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->  <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width">
  <link rel="icon" type="image/vnd.microsoft.icon" href="favicon.ico"/>
  <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="favicon.ico"/>

  <title>Administração - LOL</title>

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/boilerplate.css">
  <link href="css/custom-theme/jquery-ui-1.10.3.custom.css" rel="stylesheet">
  <link href="css/jquery.appendGrid-1.1.2.css" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css">
  <script src="js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body>
<!--[if lt IE 7]>
  <p class="chromeframe">
    You are using an <strong>outdated</strong> browser.
    Please <a href="http://browsehappy.com/">upgrade your browser</a> or
    <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a>
    to improve your experience.
  </p>
<![endif]-->

<!-- cnt -->
<div id="wrap">
    
    <!-- Se nao exisitr usuario logado -->
    <c:if test="${empty u}">
        <script> window.location.href = "./" </script>
    </c:if>
        
    <!-- Nao e administrador/funcionario -->
    <c:if test="${u.usuario_tipo_id != 1 && u.usuario_tipo_id != 3}">
        <script> window.location.href = "../" </script>
    </c:if>
  
  <!-- Dialogs -->

  <div id="dialog-alert" title="Mensagem"></div>
  

  <div id="dialog-itens-lavagem" title="Itens"></div>

  <div id="dialog-cancelar-lavagem" title="Cancelar lavagem ?">
    Tem certeza que deseja cancelar esta lavagem ?
  </div>

  <!-- e#Dialogs -->
  
  <ul class="menu-options">
    
    <li><a href="ajax/pedidos.html">Pedidos</a></li>
    <li><a href="ajax/cancelar-pedido.html">Cancelar Pedido</a></li>
    <li><a href="ajax/consultar-pedido.html">Consultar Pedido</a></li>

    <li><a href="ajax/cadastro-cliente.html">+ Cliente</a></li>
    <li><a href="ajax/cadastro-roupa.html">+ Roupas</a></li>
    <li><a href="ajax/cadastro-funcionario.html">+ Funcionario</a></li>
    
    <li><a href="ajax/relatorios.html">Relatórios</a></li>

    <li><a href="#deslogar">Deslogar</a></li>
  </ul>

</div>
<!-- e#wrap -->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
<script src="js/jquery-ui-1.10.3.custom.js"></script>
<script src="js/jquery.formatCurrency-1.4.0.js"></script>
<script src="js/jquery.validate.min.js"></script>
<script src="js/jquery.meio.mask.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/main.js"></script>
</body>
</html>