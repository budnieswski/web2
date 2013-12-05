package tads.web2;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
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
@WebServlet(urlPatterns = {"/test"})
public class test extends HttpServlet {

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
        PrintWriter out = response.getWriter();
        
        try {
            
            Connection con = ConnectionFactory.getConnection();
            UsuarioDAO dao = new UsuarioDAO(con);
            
            String tipo = request.getParameter("type");
            
            if (tipo.equals("email")) {
                boolean rs = dao.consultaValidaCadastro("email", request.getParameter("email"));
                
                if (rs) {
                    out.print("false"); // Existe
                } else {
                    out.print("true"); // Nao existe
                }
            } else if (tipo.equals("cpf")) {
                boolean rs = dao.consultaValidaCadastro("cpf", request.getParameter("cpf"));
                
                if (rs) {
                    out.print("false"); // Existe
                } else {
                    out.print("true"); // Nao existe
                }
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
