<div id="configuracao">

  <div class="accordion ui-helper-reset ui-helper-clearfix">
    <h3>Configurações de Cadastro</h3>
    <div>
      <form id="configuracoes-form" method="get" action="#">
        <input id="cnome" name="nome" type="text" value="${u.nome}" placeholder="Nome" />
        <input id="cendereco" name="endereco" type="text" value="${u.endereco}" placeholder="Endereço" />
        <select id="csexo" name="sexo">
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
        <input id="ctelefone" name="telefone" type="text" value="${u.telefone}" placeholder="Telefone" />
        <input id="ccpf" name="ncpf" type="text" value="${u.cpf}" placeholder="CPF" disabled="disabled" />
        <input id="cemail" name="nemail" type="text" value="${u.email}" placeholder="E-mail" disabled="disabled" />
        <input id="csenha" name="senha" type="password" value="" placeholder="Senha" />
        <input id="csenha2" name="senha2" type="password" value="" placeholder="Repita a senha" />
        <input id="cenviar" name="enviar" type="submit" value="Gravar" />
      </form>
    </div>    
  </div>
  <!-- e#accordion -->

</div>
<!-- e#configuracao -->

<!-- Para buggar, pois o conteudo ajax e carregado depois de ter executado o script -->
<script src="./js/main.js"></script>