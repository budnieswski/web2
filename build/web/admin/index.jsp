<%@taglib prefix="c"uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
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

  <title>Lavanderia OnLine - LOL</title>

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/boilerplate.css">
  <link href="css/custom-theme/jquery-ui-1.10.3.custom.css" rel="stylesheet">
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
<div id="dialog-alert" title="Mensagem"></div>

<c:if test="${sessionScope.logado == 'true'}">
    <script> window.location.href = "./home.jsp" </script>
</c:if>

<div id="landing-login">
  
    <form id="login-form" autocomplete="off" method="POST" action="#">
      <input id="lemail" name="email" type="text" placeholder="Email" />
      <input id="lsenha" name="senha" type="password" placeholder="Senha" />
      <input id="lenviar" name="enviar" type="submit" value="Logar" />
    </form>

</div>
<!-- e#landing-login -->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
<script src="js/jquery-ui-1.10.3.custom.js"></script>
<script src="js/jquery.validate.min.js"></script>
<script src="js/jquery.meio.mask.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/main-login.js"></script>
</body>
</html>