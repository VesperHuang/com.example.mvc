using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace com.example.mvc.Models
{
    public class RegModel
    {
        [Display(Name = "登錄名")]
        [Required]
        [MaxLength(10, ErrorMessage = "{0}長度不能超過十位")]
        public string user_id { get; set; }

        [Display(Name = "密 碼")]
        [Required]
        public string password { get; set; }

        [Display(Name = "姓 名")]
        [Required]
        public string user_name { get; set; }

        [Display(Name = "行動電話")]
        [Required]
        public string mobile { get; set; }

        [Display(Name = "電子郵箱")]
        [Required]
        public string email { get; set; }

        [Display(Name = "性 別")]
        [Required]
        public string sex { get; set; }

        [Display(Name = "生 日")]
        [Required]
        public DateTime birthday { get; set; }

    }
}