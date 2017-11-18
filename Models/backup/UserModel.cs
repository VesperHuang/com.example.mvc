using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace com.example.mvc.Models
{
    public class UserModel
    {
        [Display(Name = "用户名")]
        [Required]
        [RegularExpression(@"\d{2}", ErrorMessage = "{0}只是两位数字")]
        public string UserName { get; set; }

        [Display(Name = "年龄")]
        [Required]
        [StringLength(6, MinimumLength = 3, ErrorMessage = "{0}长度必须在3到6位")]
        public string Age { get; set; }

        public List<string> Hobby { get; set; }

        public string PoliticalStatus { get; set; }
    }
}