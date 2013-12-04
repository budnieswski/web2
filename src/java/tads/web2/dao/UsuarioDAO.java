package tads.web2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
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
    
    public void cadastroUsuario (String dados, int tipo) {
        Object obj = JSONValue.parse(dados);
    }
}
