using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Webdiyer.WebControls.Mvc;

namespace com.example.mvc.Controllers
{
    [Authorize]
    public class EmployeeController : Controller
    {
        //员工列表
        public ActionResult List(string FindName, int? pageIndex)
        {
            int PageIndex = pageIndex ?? 1;
            int PageSize = 2;
            int CurrentCount = (PageIndex - 1) * PageSize;
            int totalCount = 0;
            PagedList<Models.EmployeeModel> listModel = Repository.Employee.GetEmployeeList(FindName, PageSize, CurrentCount, out totalCount).ToPagedList(PageIndex, PageSize);
            listModel.TotalItemCount = totalCount;
            listModel.CurrentPageIndex = (int)(pageIndex ?? 1);

            ViewBag.FindName = FindName;
            return View(listModel);
        }

        [HttpGet]
        public ActionResult Edit(int? Id)
        {
            Models.EditModel edit = new Models.EditModel();
            if (Id != null && Id != 0)
            {
                edit = Repository.Employee.GetEmployee(Convert.ToInt32(Id));
            }
            return View(edit);
        }

        [HttpPost]
        public ActionResult Edit(Models.EditModel editModel)
        {
            if (editModel.Id != 0)
            {
                //修改
                Repository.Employee.SaveEmployee(editModel.Id, editModel.Name, editModel.Age);
            }
            else
            {
                //新增
                Repository.Employee.AddEmployee(editModel.Name, editModel.Age);
            }
            return View();
        }

        [HttpGet]
        public ActionResult Detail(int Id)
        {
            Models.DetailModel detail = Repository.Employee.GetEmployeeDetail(Convert.ToInt32(Id));
            return View(detail);
        }

        [HttpGet]
        public ActionResult Remove(int Id)
        {
            Repository.Employee.RemoveEmployee(Id);
            return RedirectToAction("List");
        }
    }
}