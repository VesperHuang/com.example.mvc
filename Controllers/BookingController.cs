using System;
using System.Web.Mvc;
using com.example.mvc.Models;

namespace com.example.mvc.Controllers
{
    public class BookingController : Controller
    {
        public ActionResult Add()
        {
            ViewBag.Booking_Add = "active";
            return View(ViewBag);
        }


        [HttpGet]
        public ContentResult ajaxRoomListbyKey(string id)
        {

            //以下內容是跟著 id 進行資料庫查詢後得到的結果傳回
            string httpres =  "var httpres=\"20171113|XX 民宿|XX銀行 XX分行|808|1234-567-8910-66|黃小毛|9999|0|-1|11111111111001101119000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|加床||2|7||03-8531683;0966785227|N||哉煙煙民宿||TWD|0|1|0|N|N|N|N|N|1040|1|園景雙人房|園景雙人房|園景雙人房|2|精緻雙人房|精緻雙人房|精緻雙人房|3|山景雙人房|山景雙人房|山景雙人房|4|北非四人房|北非四人房|北非四人房|5|北歐四人房|北歐四人房|北歐四人房\";if(ajaxRoomList)ajaxRoomList(httpres);";
            return Content(httpres);
        }

         [HttpGet]
        public ContentResult ajaxWebDaily(string v, string startDID, string endDID, string hotelID) 
        {
            string httpres = "var httpres='201711131,2100,1,0,201711141,2100,1,0,201711151,2100,1,0,201711161,2100,1,0,201711132,2900,2,0,201711142,2900,2,0,201711152,2900,2,0,201711162,2900,2,0,201711172,3200,2,0,201711182,3200,2,0,201711133,2600,1,0,201711143,2600,1,0,201711153,2600,2,0,201711163,2600,2,0,201711173,3000,2,0,201711183,3000,2,0,201711144,4000,1,0,201711154,4000,1,0,201711164,5000,1,0,201711174,5000,1,0,201711184,5000,1,0,201711155,4500,1,0,201711165,4500,1,0,201711175,5400,1,0,201711185,5400,1,0';if(ajaxWebDaily)ajaxWebDaily(httpres);";
            return Content(httpres);
        }

        [HttpPost]
         public ContentResult flexBookingPackages(string hotelID)
         {
             string httpres = "";
             return Content(httpres);
         }

         [HttpPost]
        public ContentResult ajaxHotelPayMethods(string hotelID){
            string httpres = "";
            return Content(httpres);
        }
	}
}