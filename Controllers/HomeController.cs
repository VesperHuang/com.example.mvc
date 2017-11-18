using System.Web.Mvc;
using com.example.mvc.Models;

namespace com.example.mvc.Controllers
{
    public class HomeController : Controller
    {      
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.IndexActive = "active";
            return View(ViewBag);
        }

        public ActionResult room() 
        {
            ViewBag.RoomActive = "active";
            return View(ViewBag);
        }

        public ActionResult photos() {
            ViewBag.PhotosActive = "active";
            return View(ViewBag);
        }

        //登錄
        [HttpPost]
        public ActionResult Login(Models.LoginModel obj)
        {
            var user_id = obj.login_user;
            var user_password = obj.login_password;
            //登錄業務邏輯

            return RedirectToAction("Index");
        }

        //註冊
        [HttpPost]
        public ActionResult Register(Models.RegModel obj){
            var user_id = obj.user_id;
            var password = obj.password;
            var sex = obj.sex;
            var birthday = obj.birthday;
            //註冊業務邏輯

            return RedirectToAction("Index");
        }


    }
}