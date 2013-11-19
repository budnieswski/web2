package tads.web2.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import tads.web2.model.Usuario;

public class UsuarioDAO {
    private Connection con;
    
    public UsuarioDAO (Connection con) {
        this.con = con;
    }
    
    public boolean login (String email, String senha, int tipo) throws SQLException {
        
        String query = "SELECT * FROM usuario WHERE";
              query += " usuario_tipo_id=" + tipo;
              query += " AND email='" + email + "'";
              query += " AND senha='" + senha + "'";
        
        PreparedStatement st = con.prepareStatement(query);
        ResultSet rs = st.executeQuery();
        
        if (rs.next()) {
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
}
