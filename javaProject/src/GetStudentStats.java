

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class GetStudentStats
 */
@WebServlet("/GetStudentStats")
public class GetStudentStats extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetStudentStats() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("id") == null || session.getAttribute("role") == null) {
			response.sendRedirect("login.html");
		}
		
		String id = (String) session.getAttribute("id");
		String role = (String) session.getAttribute("role");
		//String secid = (String) request.getParameter("secid");
		if(!role.equals("student")) {
			response.sendRedirect("illegalAccess.html");
		}
		String responseQuery = "select qid, marksobtained, topicname, question.isobjective from ((select sid, qid, marksobtained from response) as temp "
				+ "natural inner join questiontopic) natural inner join topic natural inner join question where temp.sid = ?;";
		List<List<Object>> responses = DbHelper.executeQueryList(responseQuery, new DbHelper.ParamType[]
				{DbHelper.ParamType.STRING}, new String[] {id});
		String allQuestionsQuery = "select qid, maxmarks, topicname, isobjective from takes natural inner join quiz natural inner join quizquestion"
				+ " natural inner join topic natural inner join questiontopic natural inner join question where sid = ?;";
		List<List<Object>> allQuestions = DbHelper.executeQueryList(allQuestionsQuery, new DbHelper.ParamType[]
				{DbHelper.ParamType.STRING}, new String[] {id});
		
		String theString = "";
		float marksObj = 0, correctObj = 0;
		float marksSub = 0, correctSub = 0;
		Dictionary maxMarks = new Hashtable();
		Dictionary marksObtained = new Hashtable();
		List<String> topics = new ArrayList<> ();
		for (int i = 0 ; i < allQuestions.size() ; i ++) {
			String topicname = (String) allQuestions.get(i).get(2);
			if (maxMarks.get(topicname) == null)
			{
				maxMarks.put(topicname, (float) 0.0);
				marksObtained.put(topicname,(float) 0.0);
				topics.add(topicname);
			}
			boolean isobj = (boolean) allQuestions.get(i).get(3);
			if (isobj)
			{
				marksObj += (float) allQuestions.get(i).get(1);
			}
			else
			{
				marksSub += (float) allQuestions.get(i).get(1);
			}
			maxMarks.put(topicname, (float) maxMarks.get(topicname) + (float) allQuestions.get(i).get(1));
		}
		
		for (int i = 0 ; i < responses.size() ; i ++)
		{
			String topicname = (String) responses.get(i).get(2);
			boolean isobj = (boolean) allQuestions.get(i).get(3);
			if (isobj && (float) responses.get(i).get(1) > -0.5)
			{
				correctObj += (float) responses.get(i).get(1);
				marksObtained.put(topicname, (float) marksObtained.get(topicname) + (float) responses.get(i).get(1));
			}
			else if ((float) responses.get(i).get(1) > -0.5)
			{
				correctSub += (float) responses.get(i).get(1);
				marksObtained.put(topicname, (float) marksObtained.get(topicname) + (float) responses.get(i).get(1));
			}
		}
		theString += "<table>\n";
			theString += "<tr class=\"row100 head\">\n";
				theString += "<th class=\"cell100 column1\"></th>\n";
				theString += "<th class=\"cell100 column2\">Total Marks</th>\n";
				theString += "<th class=\"cell100 column3\">Marks Obtained</th>\n";
			theString += "</tr>\n";
			theString += "<tr>\n";
				theString += "<td> Objective </td>\n";
				theString += "<td>" + Float.toString(marksObj) + "</td>\n";
				theString += "<td>" + Float.toString(correctObj) + "</td>\n";
			theString += "</tr>\n";
			theString += "<tr>\n";
				theString += "<td> Subjective </td>\n";
				theString += "<td>" + Float.toString(marksSub) + "</td>\n";
				theString += "<td>" + Float.toString(correctSub) + "</td>\n";
			theString += "</tr>\n";
		theString += "</table>\n<br><br><br>\n";
		
		theString += "<table>\n";
		theString += "<tr>\n";
			theString += "<th>Topic</th>\n";
			theString += "<th>Total Marks</th>\n";
			theString += "<th>Marks Obtained</th>\n";
		theString += "</tr>\n";
		for (int i = 0 ; i < topics.size() ; i ++)
		{
			theString += "<tr>\n";
				theString += "<td> " + topics.get(i) + " </td>\n";
				theString += "<td>" + maxMarks.get(topics.get(i)) + "</td>\n";
				theString += "<td>" + marksObtained.get(topics.get(i)) + "</td>\n";
			theString += "</tr>\n";
		}
	theString += "</table>\n";
		
		
		PrintWriter out =  response.getWriter();
		out.print(theString);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
