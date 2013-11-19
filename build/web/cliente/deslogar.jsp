<%@taglib prefix="c"uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Deslogar - Cliente</title>
    </head>
    <body>
        <c:if test="${sessionScope.logado == 'true'}">
            <c:remove var="logado" scope="session" />
        </c:if>
        <script> window.location.href = "./" </script>
    </body>
</html>
