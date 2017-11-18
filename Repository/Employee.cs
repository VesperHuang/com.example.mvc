using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace com.example.mvc.Repository
{
    public class Employee
    {
        public static string CONNSTRING = ConfigurationManager.ConnectionStrings["Conn"].ToString();

        public static bool Login(string LoginName, string Password)
        {
            string sql = string.Format("select count(1) from employee where login_name = '{0}' and login_password='{1}'", LoginName, Password);
            int result = (int)SqlHelper.ExecuteScalar(CONNSTRING, CommandType.Text, sql);
            if (result > 0)
                return true;
            else
                return false;
        }

        public static Models.EditModel GetEmployee(int employeeId)
        {
            Models.EditModel result = new Models.EditModel();
            string sql = string.Format("select * from employee where employee_id = {0}", employeeId);
            DataSet ds = SqlHelper.ExecuteDataset(CONNSTRING, CommandType.Text, sql);

            if (ds != null && ds.Tables.Count > 0)
            {
                result.Name = ds.Tables[0].Rows[0]["name"].ToString();
                result.Age = ds.Tables[0].Rows[0]["age"].ToString();
                result.Id = Convert.ToInt32(ds.Tables[0].Rows[0]["employee_id"]);
            }
            return result;
        }

        public static Models.DetailModel GetEmployeeDetail(int employeeId)
        {
            Models.DetailModel result = new Models.DetailModel();
            string sql = string.Format("select * from employee where employee_id = {0}", employeeId);
            DataSet ds = SqlHelper.ExecuteDataset(CONNSTRING, CommandType.Text, sql);

            if (ds != null && ds.Tables.Count > 0)
            {
                result.Name = ds.Tables[0].Rows[0]["name"].ToString();
                result.Age = ds.Tables[0].Rows[0]["age"].ToString();
            }
            return result;
        }

        public static void RemoveEmployee(int employeeId)
        {
            string sql = string.Format("delete from employee where employee_id = {0}", employeeId);
            SqlHelper.ExecuteNonQuery(CONNSTRING, CommandType.Text, sql);
        }

        public static void AddEmployee(string Name, string Password)
        {
            string sql = string.Format("insert into employee (login_name,age) values ('{0}','{1}')", Name, Password);
            SqlHelper.ExecuteNonQuery(CONNSTRING, CommandType.Text, sql);
        }

        public static void SaveEmployee(int Id, string Name, string Password)
        {
            string sql = string.Format("update employee set login_name = '{0}', age='{1}' where employee_id={2}", Name, Password, Id);
            SqlHelper.ExecuteNonQuery(CONNSTRING, CommandType.Text, sql);
        }

        public static List<Models.EmployeeModel> GetEmployeeList(string FindName, int PageSize, int CurrentCount, out int TotalCount)
        {
            string where = "1=1";
            if (!string.IsNullOrEmpty(FindName))
            {
                where += string.Format(" and login_name = '{0}'", FindName);
            }
            List<Models.EmployeeModel> result = new List<Models.EmployeeModel>();
            DataSet ds = GetList(CONNSTRING, " employee_id desc ", PageSize, CurrentCount, " employee ", where, out TotalCount);

            if (ds != null && ds.Tables.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    Models.EmployeeModel model = new Models.EmployeeModel();
                    model.Name = dr["name"].ToString();
                    model.Age = dr["age"].ToString();
                    model.Id = Convert.ToInt32(dr["employee_id"]);
                    result.Add(model);
                }
            }
            return result;
        }

        private static DataSet GetList(string connectionString, string Order, int PageSize, int CurrentCount, string TableName, string Where, out int TotalCount)
        {
            SqlParameter[] parmList =
                {
                    new SqlParameter("@PageSize",PageSize),
                    new SqlParameter("@CurrentCount",CurrentCount),
                    new SqlParameter("@TableName",TableName),
                    new SqlParameter("@Where",Where),
                    new SqlParameter("@Order",Order),
                    new SqlParameter("@TotalCount",SqlDbType.Int,4)
                };
            parmList[5].Direction = ParameterDirection.Output;
            DataSet ds = SqlHelper.ExecuteDataset(connectionString, CommandType.StoredProcedure, "prPager", parmList);
            TotalCount = Convert.ToInt32(parmList[5].Value);
            return ds;
        }
    }
}