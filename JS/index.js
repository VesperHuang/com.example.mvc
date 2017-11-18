var LoginModel = {
    login_user: $('#login_user').val(),
    login_password: $('#login_password').val()
};

var RegModel = {
    user_id: $('#user_id').val(),
    password: $('#password').val(),
    user_name: $('#user_name').val(),
    mobile: $('#mobile').val(),
    email: $('#email').val(),
    sex: $('input[name=sex]:checked').val(),
    birthday: $('birthday').val()
};

$(function () {
    $('#loading, #error').hide();

    //在Google Chome 上沒用
    $('#member, #logout').hide();

    if ($.cookie('user')) {
        $('#member, #logout').show();
        $('#reg_a, #login_a').hide();
        $('#member').html($.cookie('user'));
    } else {
        $('#member, #logout').hide();
        $('#reg_a, #login_a').show();
    }

    //會員登出
    $('#logout').click(function () {
        $.removeCookie('user');
        window.location.href = '/Home/Index';
    });

    //會員登入
    $('#login_a').click(function () {
        $('#login').dialog('open');
    });

    $('#login').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        width: 320,
        height: 260,
        buttons: {
            '登錄': function () {
                $(this).submit();
            }
        }
    }).validate({

        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: '/Home/Login',
                type: 'POST',
                data: LoginModel,
                beforeSubmit: function (formData, jqForm, options) {
                    //$('#loading').dialog('open');
                    $('#login').dialog('widget').find('button').eq(1).button('disable');
                },
                success: function (responseText, statusText) {
                    if (responseText) {
                        $('#login').dialog('widget').find('button').eq(1).button('enable');
                        //$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('登录成功...');
                        if ($('#expires').is(':checked')) {
                            $.cookie('user', $('#login_user').val(), {
                                expires: 7,
                            });
                        } else {
                            $.cookie('user', $('#login_user').val());
                        }
                        setTimeout(function () {
                            //$('#loading').dialog('close');
                            $('#login').dialog('close');
                            $('#login').resetForm();
                            //$('#login span.star').html('*').removeClass('succ');
                            //$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
                            $('#member, #logout').show();
                            $('#reg_a, #login_a').hide();
                            $('#member').html($.cookie('user'));
                        }, 1000);
                    }
                },
            });
        }
    });


    //會員註冊
    $('#reg_a').click(function () {
        $('#reg').dialog('open');
    });

    $('#reg').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        width: 320,
        height: 420,
        buttons: {
            '提交': function () {
                $(this).submit();
            }
        }
    }).validate({
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: '/Home/Register',
                type: 'POST',
                data: RegModel,
                beforeSubmit: function (formData, jqForm, options) {
                    //debug 
                    //for (var i = 0; i < formData.length; i++) {
                    //    alert(i +':'+ formData[i].value);
                    //}

                    //$('#loading').dialog('open');
                    $('#reg').dialog('widget').find('button').eq(1).button('disable');
                },
                success: function (responseText, statusText) {
                    if (responseText) {
                        $('#reg').dialog('widget').find('button').eq(1).button('enable');
                        //$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
                        $.cookie('user', $('#user').val());
                        setTimeout(function () {
                            //$('#loading').dialog('close');
                            $('#reg').dialog('close');
                            $('#reg').resetForm();
                            //$('#reg span.star').html('*').removeClass('succ');
                            //$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
                            $('#member, #logout').show();
                            $('#reg_a, #login_a').hide();
                            $('#member').html($.cookie('user'));
                        }, 1000);
                    }
                },
            });
        }
    });

    //會員註冊 生日
    $('#birthday').datepicker({
        dateFormat: 'yy-mm-dd',
        //dayNames : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        //dayNamesShort : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        altField: '#abc',
        altFormat: 'dd/mm/yy',
        //appendText : '日历',
        showWeek: true,
        weekHeader: '周',
        firstDay: 1,
        //disabled : true,
        //numberOfMonths : 3,
        //numberOfMonths : [3,2],
        //showOtherMonths : true,
        //selectOtherMonths : true,
        changeMonth: true,
        changeYear: true,
        //isRTL : true,
        //autoSize : true,
        //showOn : 'button',
        //buttonText : '日历',
        buttonImage: '../IMG/calendar.gif',
        //buttonImageOnly : true,
        showButtonPanel: true,
        closeText: '關閉',
        currentText: '今日',
        //nextText : '下个月mm',
        //prevText : '上个月mm',
        //navigationAsDateFormat : true,
        //yearSuffix : '年',
        //showMonthAfterYear : true,

        //日期的限制优先级，min和max最高
        maxDate: 0,
        //minDate : -8000,				//但是年份有另外一个属性进行了限制
        hideIfNoPrevNext: true,

        //而maxDate和minDate只是限制日期，而年份的限制的优先级没有另外一个高
        yearRange: '1950:2020',

        //defaultDate : -1,

        //gotoCurrent : true,

        //showAnim : true,
        //duration : 1000,
        //showAnim : 'slide',
        //beforeShow : function () {
        //	alert('日历显示之前被调用！');
        //}

        //beforeShowDay : function (date) {
        //	if (date.getDate() == 1) {
        //		return [false, 'a', '不能选择1号'];
        //	} else {
        //		return [true];
        //	}
        //}

        //onChangeMonthYear : function (year, month, inst) {
        //alert('日历中年份或月份改变时激活！');
        //alert(year);
        //alert(month);
        //alert(inst.id);
        //}

        //onSelect : function (dateText, inst) {
        //	alert(dateText);
        //}

        //onClose : function (dateText, inst) {
        //	alert(dateText);
        //}
    });

    //alert($('#date').datepicker('getDate').getFullYear());
    $('#birthday').datepicker('setDate', '1980-1-1');


});
























