using System.ComponentModel.DataAnnotations;

namespace com.example.mvc.Models
{
    public class LoginModel
    {
        [Display(Name = "登錄名")]
        [Required]
        [MaxLength(10, ErrorMessage = "{0}的長度不能超過十位")]
        public string login_user { get; set; }

        [Display(Name = "密 碼")]
        [Required]
        [MaxLength(10, ErrorMessage = "{0}的長度不能超過十位")]
        public string login_password { get; set; }
    }
}