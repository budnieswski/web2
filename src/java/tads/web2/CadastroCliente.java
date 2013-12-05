/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tads.web2;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import tads.web2.dao.ConnectionFactory;
import tads.web2.dao.UsuarioDAO;
/**
 *
 * @author guilherme
 */
@WebServlet(name = "CadastroCliente", urlPatterns = {"/CadastroCliente"})
public class CadastroCliente extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        try {
            
            Connection con = ConnectionFactory.getConnection();
            UsuarioDAO dao = new UsuarioDAO(con);
            
            String[] possivel = new String[]{
                "nome", "endereco", "sexo", "telefone", "cpf", "email", "senha", "data_nasc"
            };            
            
            Map reqMap = request.getParameterMap();
            
            String SQLValues = "",
                   SQLFields = "";
            
            for(String parameter: possivel){
                if (reqMap.containsKey(parameter) && !request.getParameter(parameter).isEmpty()) {
                    if (parameter != "senha") {
                        SQLFields += parameter + ",";
                        SQLValues += "'" + request.getParameter(parameter) + "',";
                    } else {
                        // E senha, entao tem que ser MD5
                        SQLFields += parameter + ",";
                        SQLValues += "'" + MD5.gerate(request.getParameter(parameter)) + "',";
                    }
                }
            }
            SQLFields = SQLFields.substring(0, SQLFields.length()-1);
            SQLValues = SQLValues.substring(0, SQLValues.length()-1);
            
            boolean cadastro = dao.cadastroUsuario(SQLFields, SQLValues, 2); // 2 = Cliente
            
            if (cadastro) {
                out.print("true");
            } else {
                out.print("false");
            }
            

        } catch (Exception e) {
            out.print("Error: " + e);
        } finally {            
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
