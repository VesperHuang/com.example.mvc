using System;
using System.ComponentModel.DataAnnotations;

namespace com.example.mvc.Models
{
    public class BookingModel
    {
        [Display(Name = "入住日期")]
        [Required]
        public DateTime check_in_date { get; set; }

        [Display(Name = "成人人數")]
        [Required]
        public int adult_count { get; set; }

        [Display(Name = "小孩人數")]
        public int children_count { get; set; }

        [Display(Name = "預訂人姓名")]
        [Required]
        public string booking_name { get; set; }

        [Display(Name = "預訂人性別")]
        public string booking_sex { get; set; }

        [Display(Name = "預訂人手機")]
        [Required]
        public string booking_mobile { get; set; }

        [Display(Name = "預訂人郵箱")]
        [Required]
        public string booking_email { get; set; }

        [Display(Name = "預訂人國家")]
        [Required]
        public string booking_country { get; set; }

        [Display(Name = "預計抵達日期")]
        public string booking_arrival_date { get; set; }


        [Display(Name = "預計抵達時間")]
        public string booking_arrival_time { get; set; }

        [Display(Name = "可收件地址")]
        public string booking_address { get; set; }


        [Display(Name = "留言")]
        public string booking_message { get; set; }

        [Display(Name = "付款方式")]
        public string booking_pay_type { get; set; }

        [Display(Name = "是否為會員")]
        public bool is_member { get; set; }

        [Display(Name = "會員ID")]
        public string member_id { get; set; }

    }
}