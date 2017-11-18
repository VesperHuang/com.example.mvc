using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace com.example.mvc.Models
{
    public class DetailModel
    {
        [Display(Name = "姓名")]
        public string Name { get; set; }

        [Display(Name = "年龄")]
        public string Age { get; set; }
    }
}