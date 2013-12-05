package tads.web2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import tads.web2.model.Usuario;

public class UsuarioDAO {
    private Connection con;
    private HttpSession session;
    
    public UsuarioDAO (Connection con) {
        this.con = con;
    }
    
    public void setSession (HttpSession session) {
        this.session = session;
    }
    
    public boolean login (String email, String senha, int tipo) throws SQLException {
        
        String query = "SELECT * FROM usuario WHERE";
              query += " usuario_tipo_id=" + tipo;
              query += " AND email='" + email + "'";
              query += " AND senha='" + senha + "'";
        
        PreparedStatement st = con.prepareStatement(query);
        ResultSet rs = st.executeQuery();
        
        if (rs.next()) {
            atualizaBeanSession(Integer.parseInt(rs.getString("id")));            
            return true;
        }
        
        return false;
        
    }
    
    public List<Usuario> listarTodos() throws SQLException {
        List<Usuario> resultado = new ArrayList<Usuario>();
        
        PreparedStatement st = con.prepareStatement("SELECT * FROM usuario");
        ResultSet rs = st.executeQuery();
        
        while (rs.next()) {
            Usuario u = new Usuario();
            u.setNome( rs.getString("nome") );
            
            resultado.add(u);
        }
        
        return resultado;
    }
    
    
    /*
     * --
     */
    public boolean cadastroUsuario (String SQLFields, String SQLValues, int tipo) throws SQLException {
        String query = "INSERT INTO usuario (usuario_tipo_id,"+SQLFields+") ";
              query += "VALUES ('"+tipo+"',"+SQLValues+")";
              
        PreparedStatement st = con.prepareStatement(query);
        int rs = st.executeUpdate();
        
        if (rs==1) {
            
            return true;
        }
        
        return false;
    }
    
    
    /*
     * Metodo que faz a atulizacao dos dados do usuario no banco de dados
     */
    public boolean atualizaUsuario (String SQLValues) throws SQLException {
        Usuario u = (Usuario) session.getAttribute("u");
        String query = "UPDATE usuario SET "+SQLValues+" WHERE id="+u.getId();
              
        PreparedStatement st = con.prepareStatement(query);
        int rs = st.executeUpdate();
        
        if (rs==1) {
            
            atualizaBeanSession(u.getId());
            return true;
        }
        
        return false;
    }
    
    
    /*
     * Metodo que cria/atualiza a bean do usuario na sessao
     * usada quando efetuada um login/atualizacao de configuracao
     */
    private void atualizaBeanSession (int usuarioId) throws SQLException {
        String query = "SELECT * FROM usuario WHERE id="+usuarioId;
        
        PreparedStatement st = con.prepareStatement(query);
        ResultSet rs = st.executeQuery();
        
        if (rs.next()) {
            Usuario u = new Usuario();
            u.setId( Integer.parseInt(rs.getString("id")) );
            u.setUsuario_tipo_id( Integer.parseInt(rs.getString("usuario_tipo_id")) );
            u.setNome(rs.getString("nome"));
            u.setEndereco(rs.getString("endereco"));
            u.setSexo(rs.getString("sexo"));
            u.setTelefone(rs.getString("telefone"));
            u.setCpf( rs.getString("cpf") );
            u.setEmail(rs.getString("email"));
            u.setSenha(rs.getString("senha"));
            u.setData_nasc(rs.getString("data_nasc"));
            
            this.session.setAttribute("u", u);            
        }
    }
    
    
    /*
     * Metodo que faz uma consulta de determinado campo
     * usado no cadastro de usuarios para nao duplicar email/cpf
     */
    public boolean consultaValidaCadastro (String campo, String valor) throws SQLException {
        
        PreparedStatement st = con.prepareStatement("SELECT "+campo+" FROM usuario WHERE "+campo+"='"+valor+"'");
        ResultSet rs = st.executeQuery();
        
        if (rs.next()) {
            return true;
        }
        
        return false;
    }
    
    
    /*
     * Procura por um usuario e retorna uma String (JSON) do seu cadastro
     * caso nao exista retorna vazio
     */
    public String pesquisaCliente (String nome) throws SQLException {
        PreparedStatement st = con.prepareStatement("SELECT * FROM usuario WHERE nome LIKE '%"+nome+"%'");
        ResultSet rs = st.executeQuery();
        
        JSONArray jsonArray = new JSONArray();
        
        while (rs.next()) {
            JSONObject jsonObject = new JSONObject();
            
            jsonObject.put("id", Integer.parseInt(rs.getString("id")) );
            jsonObject.put("usuario_tipo_id", Integer.parseInt(rs.getString("usuario_tipo_id")) );
            jsonObject.put("nome", rs.getString("nome") );
            jsonObject.put("endereco", rs.getString("endereco") );
            jsonObject.put("sexo", rs.getString("sexo") );
            jsonObject.put("telefone", rs.getString("telefone") );
            jsonObject.put("cpf", rs.getString("cpf") );
            jsonObject.put("email", rs.getString("email") );
            jsonObject.put("data_nasc", rs.getString("data_nasc") );
            
            jsonArray.add(jsonObject);
        }
        
        
        return jsonArray.toString();
       
    }
}
