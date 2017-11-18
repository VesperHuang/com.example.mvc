var headingcss="text-left";
var headingbr="";
var headingsize="24";
var agencyInfo="";

$(function () {
  var a=location.search;
  if (a.length>1) {
    var pas=a.substring(1).split("&");
    for (var i=0; i<pas.length; i++) {
      pas2=pas[i].split("=");
      if (pas2[0]=="hid" && isNumeric(pas2[1]))
        hotelID=pas2[1];
      else if (pas2[0]=="aid" && isNumeric(pas2[1]))
        agentID=pas2[1];
    }
  }
  if (location.hash.indexOf("agency")>-1) {
    agencyInfo="<span style='font-size:8px;'>bbc.</span>";
    $("#payBox1").append("<div class='col-xs-1' style='margin-left:50px;'></div><div class='col-xs-1 text-center'><a href='javascript:void(0);' onclick='inputAgency()'><img id='payK3' src='../IMG/agencyCode.png'></a></div");
    //$("#payBox1").append("<div class='col-xs-1 text-center'><a href='javascript:void(0);' onclick='promo()'><img id='payK3' src='img/promoCode.png'></a></div");
  }
  $('#pickupBox2').hide();
  $("#pre_pickup_label").hide();
  $("#pre_pickup").hide();
    //var url = _ServletPath+"ajaxRoomListbyKey?id="+location.pathname.split("/")[2];
  var url = _ServletPath + "ajaxRoomListbyKey?id=zaiyanyan259";


	$.getScript( url, function() {
	});
  
//var httpres="20171112|哉煙煙民宿|玉山銀行 太平分行|808|1355-979-0210-77|游家豪|9999|0|-1|11111111111001101119000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|加床||2|7||03-8531683;0966785227|N||哉煙煙民宿||TWD|0|1|0|N|N|N|N|N|1040|1|園景雙人房|園景雙人房|園景雙人房|2|精緻雙人房|精緻雙人房|精緻雙人房|3|山景雙人房|山景雙人房|山景雙人房|4|北非四人房|北非四人房|北非四人房|5|北歐四人房|北歐四人房|北歐四人房";
//	if(ajaxRoomList)ajaxRoomList(httpres);
  
  $('#agencyFinishModal').on('hidden.bs.modal', function (e) {
    location.reload();
  })
});

function ajaxRoomList(res) {	
  if (res.length>10) {
    document.fbf.action=_ServletPath+"flexBookingBooking";
    roomList = res.split("|");
    var h = roomList.splice(0, 30);
    hotel=new Object();
    hotelID=h[29];
    hotel.hotelID=hotelID;
    hotel.hotelName=h[1];
	if (langU=="en") hotel.hotelName=h[18];
    hotel.addBed1Price=h[6];
    hotel.addBed2Price=h[7];
    hotel.addBed1Name=h[10];
    hotel.addBed2NAme=h[11];
    hotel.tel=h[15];
    hotel.sysTime=h[0];
    hotel.pp=h[22];
    hotel.alip=h[23];
    hotel.bank=h[2];
    hotel.bankCode=h[3];
    hotel.accountName=h[5];
    hotel.currency=h[20];
    hotel.pickupPrice=parseInt(h[8],10);
    hotel.packagesAmount=parseInt(h[21],10);
    if (hotel.pickupPrice==-1) {
      $('#pickupBox').hide();
      $('#pickupBox2').hide();
      $("#pre_pickup_label").hide();
      $("#pre_pickup").hide();
    } else if (hotel.pickupPrice==-2) {
      $('#pickupLabel').html(msgs(14)+h[14]+")");
    } else if (hotel.pickupPrice==0) {
      $('#pickupLabel').html(msgs(15)+h[14]+")");
    } else if (hotel.pickupPrice>0) {
      $('#pickupLabel').html(msgs(16)+h[20]+h[14]+")");
    }
    totalSteps = (hotel.packagesAmount==0)?6:7;
    if (hotel.hotelName.length>10) {
      $("#h_name").css("height","120px");
      //$("#stepbuttons").css("top","80px");
      headingcss="text-center";
      headingbr="<br>";
      if (hotel.hotelName.length>29) {
        headingsize="20";
      }
    }
	if (langU=="tw") {
		$.get("msg"+hotelID+".txt",
			function (res) {
				$(".panel-warning").html("<dl><dt>最新消息:</dt><dd>"+res+"</dd></dl>");
			}
		);
	} else if (langU=="en") {
		$.get("msg"+hotelID+"_en.txt",
			function (res) {
				$(".panel-warning").html("<dl><dt>News:</dt><dd>"+res+"</dd></dl>");
			}
		);
  }
    
    sDate = new Date();
    eDate = new Date();
    var viewMonth = parseInt(h[13],10);
    
    sDate.setDate(parseInt(h[0].substring(6,8),10));
    sDate.setMonth(parseInt(h[0].substring(4,6),10)-1);
    sDate.setFullYear(parseInt(h[0].substring(0,4),10));
    
//  freeIcon+="free.png";
    freeIcon = "../IMG/zaiyanyan259free.png"
    $("#sampleicon").attr("src",freeIcon);
    
    $("#hint1").html(msgs(31));
    $("#hint2").html(msgs(32));
    document.title=hotel.hotelName+" 訂房系統";
    $('input[type=text],input[type=email]').on('focus', function (e) {
      $(this).one('mouseup', function () {
         $(this).select();
         return false;
      }).select();
     });
	var langText="zh-TW";
	if (langU=="en") langText="en";
    $('.sdatepicker').datepicker({
      format: "yyyy-mm-dd",
      language: langText,
      autoclose: true,
      todayBtn: true,
      startDate: sDate,
      todayHighlight: true
    });
    
    $("#checkin").datepicker().on("changeDate", function(e){
      //console.log(e.date.getTime());
      if (e.date) {
        //var pageDate=$("#checkin").datepicker("getDate");
        //console.log(pageDate.getTime());
        var pageDate = e.date;
        var range=Math.floor((pageDate.getTime()-isDate.getTime())/86400000);
        if (range>0) {
          choosedDate=_getDateID(e.date);
          nowPage=Math.floor(range/7);
          if ( (range % 7)==6) nowPage++;
          //setTimeout(function(){drawDailys(nowPage);},100);
        }
        
      }
    });
    
    $("#checkin").on("change", function(e){
      //console.log($("#checkin").datepicker("getDate").getTime());
      var pageDate = $("#checkin").datepicker("getDate");
      var range=Math.floor((pageDate.getTime()-isDate.getTime())/86400000);
      if (range>0) {
        choosedDate=_getDateID(pageDate);
        nowPage=Math.floor(range/7);
        if ( (range % 7)==6) nowPage++;
        setTimeout(function(){drawDailys(nowPage);},100);
      }
    });
    
    $('#timepicker1').timepicker({minuteStep:30,defaultTime:"3:30 PM"});
    
    $(".bootstrap-timepicker-meridian").css("padding","6px 0px");
    
    eDate.setDate(1);
    eDate.setMonth(sDate.getMonth());
    eDate.setFullYear(sDate.getFullYear());
    eDate.setMonth(eDate.getMonth()+viewMonth);
    //eDate.setMonth(eDate.getMonth()+1);
    eDate.setDate(eDate.getDate()-1);
    dayAmount=Math.floor((eDate.getTime()-sDate.getTime())/86400000) + 1;
    isDate = new Date();
    isDate.setTime(sDate.getTime());
    startAmount=0-isDate.getDay();
    isDate.setDate(isDate.getDate()+startAmount);
    //if ($("#checkin").val().length>0) {
    //  var pageDate=$("#checkin").datepicker("getDate");
    //  var range=Math.floor((pageDate.getTime()-isDate.getTime())/86400000);
    //  var nowPage=Math.floor(range/7);
    //}
    drawDailys(nowPage);
    showStep(1);
    //for (i=0;i<roomList.length; i+=4) {
    //  roomNameArray[roomList[i]] = roomList[i+2];
    //  bf+="<tr><td><div id='RN"+roomList[i]+"' class='roomName'>"+roomList[i+2]+"</div></td></tr>";
    //}
  }
}
var timer=null;
function next7(i) {
  nowPage+=i;
  if (nowPage<0) nowPage=0;
  if (i==-2) nowPage=0;  //today
  if (timer!=null) {
    clearTimeout(timer);
	timer=null;
  }
  timer = setTimeout(function(){drawDailys(nowPage);},500);
  
}

function drawDailys(page) {
  //if (startAmount+7*page > dayAmount || page<0) {
  //  return false;
  //}
  var bf="";
  var iDate = new Date();
  iDate.setTime(isDate.getTime());
  iDate.setDate(isDate.getDate()+page*7);
  var startDID=_getDateID(iDate);
  var endDID;
  for (i=0; i<7; i++) {
    var tdcss="tdA";
    if (iDate.getDay()==6) tdcss="tdSat";
    else if (iDate.getDay()==0) tdcss="tdSun";
    if (i+page*7+startAmount<0 || i+page*7+startAmount>=dayAmount)
      tdcss="tdD"
    if (choosedDate>0 && _getDateID(iDate)==choosedDate) {
      tdcss+=" choosedDate";
    }
	if (langU=="tw")
		bf+="<th class='"+tdcss+"'>"+(iDate.getMonth()+1)+"/"+iDate.getDate()+"<sub>("+week[iDate.getDay()]+")</sub></th>";
	else
		bf+="<th class='"+tdcss+"'>"+(iDate.getMonth()+1)+"/"+iDate.getDate()+"<sub>("+week_en[iDate.getDay()]+")</sub></th>";
    endDID=_getDateID(iDate);
    if (i+page*7+startAmount<dayAmount)
      endDID=_getDateID(iDate);
    iDate.setDate(iDate.getDate()+1);
    if (i+page*7+startAmount<0)
      startDID=_getDateID(iDate);
  }
  $("#h_dateHeading").html(bf);
  bf="";
  var langStep=2;
  if (langU=="en") langStep=1;
  for (r=0; r<(roomList.length/4); r++) {
    iDate = new Date();
    iDate.setTime(isDate.getTime());
    iDate.setDate(isDate.getDate()+page*7);
    bf+="<tr>";
    bf+='<th scope="row" style="width:360px;">'+roomList[r*4+langStep]+'</th>';
    roomNameArray[roomList[r*4]] = roomList[r*4+langStep];
    for (i=0; i<7; i++) {
      var readonly="";
      var tdcss="tdA";
      var icco="fa fa-home fa-fw";
      if (iDate.getDay()==6) tdcss="tdSat";
      else if (iDate.getDay()==0) tdcss="tdSun";
      if (i+page*7+startAmount<0 || i+page*7+startAmount>=dayAmount) {
        //console.log(i+page*7+startAmount+" , "+dayAmount);
        tdcss="tdD";
        readonly=" disabled";
        icco="fa fa-minus";
      }
      var nextDate=new Date();
      nextDate.setTime(iDate.getTime());
      nextDate.setDate(iDate.getDate()+1);
      bf+="<td class='"+tdcss+"'><button type='button' class='btn btn-default dailyD"+readonly+"' data-toggle='popover' aria-label='bed' id='wd"+_getDateID(iDate)+roomList[r*4]+"' day='"+iDate.getDay()+"'"+readonly+"><span class='"+icco+"' style='color:gray' aria-hidden='true'></span></button></td>";
      iDate.setDate(iDate.getDate()+1);
    }
    bf+="</tr>";
  }
  $("#h_roomTable").html(bf);
  for (r=0; r<(roomList.length/4); r++) {
    iDate = new Date();
    iDate.setTime(isDate.getTime());
    iDate.setDate(isDate.getDate()+page*7);
    for (i=0; i<7; i++) {
      $("#wd"+_getDateID(iDate)+roomList[r*4]).addClass("dailyO");
      $("#wd"+_getDateID(iDate)+roomList[r*4]).prop("free",0);
      $("#wd"+_getDateID(iDate)+roomList[r*4]).on("click", function () {popDaily(this);});
      iDate.setDate(iDate.getDate()+1);
    }
  }
  if (startAmount+7*page > dayAmount || page<0) {
    alert(msgs(5));
    if (startAmount+7*page > dayAmount) {
      next7(-1);
    }
    return true;
  }
  //var url = _ServletPath + "ajaxWebDaily?v=2.0&sd=" + startDID + "&ed=" + endDID + "&hid=" + hotelID;
  var url = _ServletPath + "ajaxWebDaily?v=2.0&sd=" + startDID + "&ed=" + endDID + "&hid=" + hotelID;
  //console.log(url);
  $.getScript( url, function() { });
  return true;
}
function ajaxWebDaily(s) {
  var url = _ServletPath + "m_HotelRule?hid="+hotelID;
  
  $.getScript( url, function() {})
    .fail(function( jqxhr, settings, exception ) {
      waitingDialog.hide();
      alert("Network error. Please try again.");
    });
  //s="201711121,2100,1,0,201711131,2100,1,0,201711141,2100,1,0,201711151,2100,1,0,201711161,2100,1,0,201711122,2900,1,0,201711132,2900,2,0,201711142,2900,2,0,201711152,2900,2,0,201711162,2900,2,0,201711172,3200,2,0,201711182,3200,2,0,201711123,2600,2,0,201711133,2600,1,0,201711143,2600,1,0,201711153,2600,2,0,201711163,2600,2,0,201711173,3000,2,0,201711183,3000,2,0,201711124,4000,1,0,201711144,4000,1,0,201711154,4000,1,0,201711164,5000,1,0,201711174,5000,1,0,201711184,5000,1,0,201711155,4500,1,0,201711165,4500,1,0,201711175,5400,1,0,201711185,5400,1,0";
  setTimeout(function(){showDailys(s);},100);
}
function showDailys(wres){
  if(wres.length>10) {
    daily_array=wres.split(",");
    for (i=0; i<daily_array.length; i+=4) {
      //if (String(daily_array[i]).indexOf("20150311")>-1)
      //if (parseInt(daily_array[i].substring(0,8),10) > _getDateID(eDate)) {
      //  $('#wd'+daily_array[i]).addClass("disabled");
      //} else {
      //  $('#wd'+daily_array[i]).removeClass("disabled");
      //}
      if (daily_array[i+3]==0) {
        if ($('#wd'+daily_array[i]).hasClass("dailyC")) {
          $('#wd'+daily_array[i]).removeClass("dailyC");
        }
        //$('#wd'+daily_array[i]).html("<span class='fa fa-home fa-lg fa-fw' style='color:#FA6A6A' aria-hidden='true'></span>");
        $('#wd'+daily_array[i]).html("<img src='"+freeIcon+"'>");
        $('#wd'+daily_array[i]).prop("price",parseInt(daily_array[i+1],10));
        if (!$('#wd'+daily_array[i]).prop("free"))
          $('#wd'+daily_array[i]).prop("free",0);
        var free=$('#wd'+daily_array[i]).prop("free");
        free+=parseInt(daily_array[i+2],10);
        //console.log("free="+free+",wd="+daily_array[i]);
        $('#wd'+daily_array[i]).prop("free",free);
        if ($('#wd'+daily_array[i]).prop("free")>0) {  //第一個free room
          if ($('#wd'+daily_array[i]).hasClass("dailyO")) {
            $('#wd'+daily_array[i]).removeClass("dailyO");
          }
          if (!$('#wd'+daily_array[i]).hasClass("dailyB")) {
            $('#wd'+daily_array[i]).addClass("dailyB");
            //$('#wd'+daily_array[i]).off();
            //$('#wd'+daily_array[i]).on( "click", function() {popDaily(this);});
          }
        }
      } else if (daily_array[i+3]==5) {
        if ($('#wd'+daily_array[i]).prop("free")==0) {  //若有放出的空房處理鎖房. 沒有空房才處理          
          if ($('#wd'+daily_array[i]).hasClass("dailyO")) {
            $('#wd'+daily_array[i]).removeClass("dailyO");
          }
          if (!$('#wd'+daily_array[i]).hasClass("dailyC")) {
            $('#wd'+daily_array[i]).prop("free",0);
            $('#wd'+daily_array[i]).prop("price",parseInt(daily_array[i+1],10));
            $('#wd'+daily_array[i]).addClass("dailyC");
            $('#wd'+daily_array[i]).html("<span class='fa fa-phone fa-lg fa-fw' aria-hidden='true'></span>");
            //$('#wd'+daily_array[i]).on( "click", function() {popDaily(this);});
          }
        }
      } else {
        $('#wd'+daily_array[i]).addClass("hidden");
      }
    }
    
    
    if (carts) {
      for (i=0; i<carts.roomIDs.length; i++) {
        var dailyObj=$("#"+carts.roomIDs[i]);
        var daily=carts.rooms[i];
        dailyObj.html("<span class='choosedDaily'>"+daily.booked+"</span>");
        dailyObj.prop("booked",daily.booked);
      }
    }
    
    setTimeout(function(){setupPopover();},0);
    //scroller.updateTargetSize();
    //if (firstLoad) {
      //popup = new wink.ui.xy.Popup();
      //wink.byId('container').appendChild(popup.getDomNode());
    //}
  } else {
    waitingDialog.hide();
    //alert("目前指定日期(預設為今日)前後3天皆無空房, 請重新選擇.");
  }
}
var oldDaily=null;
function popDaily(daily) {
  //if (oldDaily==null || oldDaily.prop('id')!=daily.id) {
    if (oldDaily)
      oldDaily.popover('hide');
    if (oldDaily==null || oldDaily.prop('id')!=daily.id) {
      $(daily).popover('show');
      oldDaily=$(daily);
    } else {
      oldDaily=null;
    }
  //}
}

function setupPopover(){
  $('.dailyB').popover({ 
    html : true,
    placement: function() {
      if ($(this.$element).attr('day')>5)
        return 'left';
      else
        return 'top';
    },
    trigger: 'manual',
    title: function() {
      var bf=_dateFormat(this.id.substring(2));
      bf+=" "+roomNameArray[this.id.substring(10)];
      return bf;
    },
    content: function() {
      var bf="NTD$ "+this.price;
      var bookedDefault=(this.booked>0)?this.booked:1;
      bf+="<br><div class='input-group' style='width:240px'><span class='input-group-btn'><button type='button' class='btn btn-default' onclick=\"addCart('"+this.id+"',0);\"><i class='fa fa-trash-o'></i></button></span><input type='number' id='"+this.id+"R' class='form-control' placeholder='房間數' value='"+bookedDefault+"' min='0'><div class='input-group-btn'><button type='button' class='btn btn-primary' onclick=\"addCart('"+this.id+"',$('#"+this.id+"R').val());\">ok</button><button type='button' class='btn btn-default' onclick='popDaily({});'><i class='fa fa-times'></i></button></div></div>";
      return bf;
    }
  });
  $('.dailyB').on('shown.bs.popover', function () {
    $("#"+this.id+"R").focus().select();
  })
  $('.dailyC').popover({ 
    html : true,
    placement: 'top',
    trigger: 'manual',
    title: function() {
      return msgs(2)+hotel.tel;
    },
    content: function() {
      var bf=msgs(6)+this.price;
      bf+="<button type='button' class='btn btn-default pull-right' onclick='popDaily({});' style='margin-bottom:8px;'><i class='fa fa-times'></i></button>";
      return bf;
    }
  });
  $('.dailyO').popover({ 
    html : true,
    placement: 'top',
    trigger: 'manual',
    title: function() {
      var bf=_dateFormat(this.id.substring(2));
      bf+=" "+roomNameArray[this.id.substring(10)];
      return bf;
    },
    content: function() {
      var bf=msgs(1);
      bf+="<button type='button' class='btn btn-default pull-right' onclick='popDaily({});' style='margin-bottom:8px;'><i class='fa fa-times'></i></button>";
      return bf;
    }
  });
  waitingDialog.hide();
}

function addCart(dailyID, amount){
  amount=parseInt(amount,10);
  if (amount<0) {
    return;
  }
  var dailyObj=$("#"+dailyID);
  var daily = new Object;
  daily.id=dailyID.substring(2,10);
  daily.free=dailyObj.prop("free");
  daily.price=dailyObj.prop("price");
  daily.roomID=dailyID.substring(10);
  daily.day=dailyObj.attr("day");
  var index=-1;
  if (isNaN(amount)) {
    alert(msgs(8));
    return;
  } else if (amount>daily.free) {
    alert(msgs(9));
    return;
  }
  popDaily(this);
  if (!carts) {
    carts=new Object();
    carts.rooms=new Array();
    carts.roomIDs=new Array();
  }
  if ($.inArray(dailyID, carts.roomIDs)==-1) {
    if (amount==0)
      return;
    carts.roomIDs.push(dailyID);
    carts.rooms.push(daily);
    dailyObj.prop("oldHtml",dailyObj.html());
  } else {
    index=$.inArray(dailyID, carts.roomIDs);
    daily=carts.rooms[index];
  }
  if (amount==0) {
    if (index > -1) {
      carts.rooms.splice(index,1);
      carts.roomIDs.splice(index,1);
    }
    dailyObj.html(dailyObj.prop("oldHtml"));
    dailyObj.prop("booked",amount);
    daily.booked=amount;
  } else {
    dailyObj.html("<span class='choosedDaily'>"+amount+"</span>");
    dailyObj.prop("booked",amount);
    daily.booked=amount;
  }
}

function payKind(k) {
  var bf="";
  if (k==1) {
    $("#payK1").css("height", "");
    $("#payK2").css("height", "85px");
    $("#payK2").css("opacity","0.5");
    $("#payK1").css("opacity","1");
    if (hotel.bank.length>0) {
      bf+="<div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff(0)'><img src='../IMG/payATM.png'></a></div>";
    }
    
    //$("#payBox2").html("<div class='col-xs-1 text-center'><a href='javascript:void(0);' onclick='payoff(0)'><img src='../IMG/payATM.png'></a></div>"
    //  +"<div class='col-xs-1 text-center'><a href='javascript:void(0);' onclick='payoff(10)'><img src='../IMG/payOTHER.png'></a></div>");
  } else {
    $("#payK2").css("height", "");
    $("#payK1").css("height", "85px");
    $("#payK1").css("opacity","0.5");
    $("#payK2").css("opacity","1");
    if (hotel.pp==1) {
      bf+="<div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff(2)'><img src='../IMG/payPAYPAL.png' width=128></a></div>";
    }
    if (hotel.alip==1) {
      bf+="<div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff(6)'><img src='../IMG/payJFP.png' width=128></a></div>";
    }
    //$("#payBox2").html("<div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff(2)'><img src='../IMG/payPAYPAL.png'></a></div>"
    //  +"<div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff(6)'><img src='../IMG/payJFP.png'></a></div>"
    //  +"<!--div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff(4)'><img src='../IMG/payOTHER.png'></a></div-->");
  }
  if (payMethods!="") {
    for (i=0; i<payMethods.vs.length; i++) {
      var paym = payMethods.vs[i];
      pms[parseInt(paym.payMethodNo,10)]=paym.method;
      if (paym.area.substring(0,1)=="1" && k==1) {
        bf+="<div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff("+paym.payMethodNo+")'><img src='../IMG/"+paym.icon+"' width=128></a></div>";
      } else if (paym.area.substring(1,2)=="1" && k==2) {
        bf+="<div class='col-xs-3 text-center'><a href='javascript:void(0);' onclick='payoff("+paym.payMethodNo+")'><img src='../IMG/"+paym.icon+"' width=128></a></div>";
      }
    }
  }
  if (bf=="") {
    bf=msgs(29);
  }
  $("#payBox2").html(bf);
}
var agencyC = "";
function checkAgency() {
  $("#bbcSubmitB").attr("disabled", true);
  $.post(
    _ServletPath + "checkAgencyCode",
    {code:$("#userAgencyCode").val()},
    function(res) {
      //console.log(res);
      if (res!=1) {
        $("#bbcSubmitB").attr("disabled", false);
        agencyC="";
        alert("代碼錯誤! 請檢查後重新輸入.");
      } else {
        agencyC = $("#userAgencyCode").val();
        payoff(3);
      }
    }
  );
}
function inputAgency() {
  $('#agencyModal').modal('show');
  $("#bbcSubmitB").attr("disabled", false);
}

//點選 payPAYPAL 後 程式進入點(付款邏輯)
function payoff(p) {
  if (!lockSubmit) {
    lockSubmit=true;
    if ( (agencyC!="" && p==3) || confirm(msgs(27)+pms[p]+msgs(28))) {
      $('#agencyModal').modal('hide');
      for (var i in payMethods.vs) {
        if (payMethods.vs[i].payMethodNo==p)
          payMObj=payMethods.vs[i];
      }
      //$('#processing-modal').modal("show");
      waitingDialog.show();
      payMethod=p;
      var ROOM_S="";
      for (var i in carts.rooms) {
        if (ROOM_S.length > 0) ROOM_S+=",";
        ROOM_S+=carts.rooms[i].id + "," + carts.rooms[i].roomID + "," + carts.rooms[i].booked + ",0,0";
      }
      var data=
      {
        hid:hotelID,
        tel:$("#fphone").val(),
        country:$("#fcountry").val(),
        email:$("#femail").val(),
        address:$("#faddress").val(),
        creq:"[網站]"+$("#fnote").val(),  //再加上加床及行程
        name:$("#fuserName").val(),
        rooms:ROOM_S,
        people:parseInt($("#adult").val(),10)+parseInt($("#child").val(),10),
        adult:$("#adult").val(),
        child:$("#adult").val(),
        arrivald: ($("#farrivalDate").val().length>0)? _getDateID($("#farrivalDate").datepicker("getDate")):"",
        arrivalt:"0000",
        addbed:"N",
        send:"N",
        pickup:$('input[name=fpickup]:checked').val(),
        sex:$('input[name=fgender]:checked').val(),
        tid:$("#fpickupLoc").val(),
        total:total_fee,
        cki:carts.checkin,
        cko:carts.checkout,
        aid:agentID,
        pmth:p,
        lang: "tw"
      };
      if (arrivalTime.length>=5) {
        var hour=parseInt(arrivalTime.substring(0,2),10);
        if (arrivalTime.charAt(6)=='P')
          hour+=12;
        arrivalTime=hour+arrivalTime.substring(3,5);
      }
      fbf.hid.value=hotelID;
      fbf.tel.value=$("#fphone").val();
      fbf.sex.value=$('input[name=fgender]:checked').val();
      fbf.country.value=$("#fcountry").val();
      fbf.email.value=$("#femail").val();
      fbf.address.value=$("#faddress").val();
      fbf.creq.value="[網路]"+orderNote;
      fbf.name.value=$("#fuserName").val();
      fbf.rooms.value=ROOM_S;
      fbf.people.value=parseInt($("#adult").val(),10)+parseInt($("#child").val(),10);
      fbf.arrivald.value=($("#farrivalDate").val().length>0)? _getDateID($("#farrivalDate").datepicker("getDate")):"";
      fbf.arrivalt.value=arrivalTime;
      fbf.addbed.value="N";
      fbf.send.value="N";
      fbf.pickup.value=$('input[name=fpickup]:checked').val();
      fbf.tid.value=$("#fpickupLoc").val();
      fbf.total.value=total_fee;
      fbf.cki.value=carts.checkin;
      fbf.cko.value=carts.checkout;
      fbf.aid.value=agentID;
      fbf.pmth.value=p;
      fbf.lang.value="tw";
      if (fbf.agency) {
        fbf.agency.value=agencyC;
      }
      fbf.submit();    
      //console.log("submit!");
    }
  }
}


function showRuleRes(res) {
  
  $('#hotelRule').html(res);
  if (hotel.packagesAmount>0) {
    //var url = _ServletPath + "ajaxPackages?hid="+hotelID;
    //$.getScript( url, function() {});
    var url = _ServletPath + "flexBookingPackages";
    $.post(
      url,
      {hid:hotelID},
      function(res) {
        ajaxPackages(res);
      }
    );
  } else {
    $("#packagesPanel").hide();
    $('form').validator();
  }
}
function ajaxPackages(s) {
  packageArray = s.split("|");
  var bf="";
  var langStep=0;
  if (langU=="en") langStep=1;
  for (i=0; i<packageArray.length; i+=12) {
    bf+="<div class='panel panel-success' id='pk_"+packageArray[i]+"'>";
    bf+="<div class='panel-heading'>"+packageArray[i+3+langStep]+"</div>";
    bf+="<div class='panel-body'><div class='xcontainer'>"+packageArray[i+5+langStep]+"</div>";
    bf+="<div class='text-right'>"+msgs(13)+" <div class='input-group' style='width:100px'><span class='input-group-btn'><button type='button' class='btn btn-default' onclick=\"$('#pk_a_"+packageArray[i]+"').val(0);\"><span class='fa fa-trash-o'></span></button></span><input type='text' min='0'  id='pk_a_"+packageArray[i]+"' class='form-control' value='0' onchange='if(isNaN(this.value)||this.value<=0) this.value=0;' required></div> "+packageArray[i+9+langStep]+"</div>";
    bf+="</div></div>";
  }
  if (bf=="") {
    hadPackages=false;
  } else {
    hadPackages= true;
    bf="<form class='form-inline'>"+bf+"</form>"
    $("#hotelPackages").html(bf);
  }
  $('form').validator();
}
//function showPayMethods() {
//  var url = _ServletPath + "ajaxHotelPayMethods";
//  $.post(
//    url,
//    {hid:hotelID},
//    function(res) {
//    }
//  );
//}
function showPreOrder() {
  if ($("#fuserName").val()!="")
    $("#pre_userName").html($("#fuserName").val()+".");
  if ($("#fphone").val()!="")
    $("#pre_phone").html($("#fphone").val()+".");
  if ($("#femail").val()!="")
    $("#pre_email").html($("#femail").val()+".");
  if ($("#fcountry").val()!="")
    $("#pre_country").html($("#fcountry").find(":selected").text()+".");
  if ($("#adult").val()>0) {
    var people_temp=msgs(17)+$("#adult").val()+msgs(19);
    if ($("#child").val()>0)
      people_temp+=msgs(18)+$("#child").val()+msgs(19);
    people_temp+=".";
    $("#pre_people").html(people_temp);
  }
  total_fee=0;
  if (carts!=null && carts.rooms.length>0) {
    carts.checkin=99999999;
    carts.checkout=0;
    bf="";
    for (i=0; i<carts.rooms.length; i++) {
      var daily = carts.rooms[i];
      if ( parseInt(daily.id.substring(0,10),10)<carts.checkin) {
        carts.checkin=parseInt(daily.id.substring(0,10),10);
        $('#farrivalDate').datepicker('update', daily.id.substring(0,4)+"-"+daily.id.substring(4,6)+"-"+daily.id.substring(6,8));
        //$("#farrivalDate").datepicker("setDate",_dateFormat(daily.id.substring(0,10)));
      }
      var cko=new Date();
      cko.setYear( parseInt(daily.id.substring(0,4),10));
      cko.setMonth( parseInt(daily.id.substring(4,6),10)-1);
      cko.setDate( parseInt(daily.id.substring(6,8),10)+1);
      if ( _getDateID(cko)>carts.checkout) {
        carts.checkout=_getDateID(cko);
      }
      if (i>0)
        bf+="<br>";
      bf+=_dateFormat(daily.id)+"("+((langU=="tw")?week[daily.day]:week_en[daily.day])+") "+roomNameArray[daily.roomID]+"/$"+daily.price+" x "+daily.booked+msgs(20);
      total_fee+=daily.price*daily.booked;
    }
    $("#pre_checkDate").html(msgs(21)+_dateFormat(carts.checkin.toString())+msgs(22)+_dateFormat(carts.checkout.toString())+".");
    $("#pre_rooms").html(bf);
    $("#afp_checkDate").html($("#pre_checkDate").html());
    $("#afp_rooms").html(bf);
  }
  $("#pre_total").html(hotel.currency+" "+total_fee);
  $("#afp_total").html(hotel.currency+" "+total_fee);
  $("#pre_address").html($("#faddress").val());
  $("#pre_userName").html($("#fuserName").val());
  $("#pre_note").html($("#fnote").val());
  var bf="";
  if (hadPackages) {
    for (i=0; i<packageArray.length; i+=12) {
      if ($("#pk_a_"+packageArray[i]).val()>0) {
        bf+="<br>(I want)"+packageArray[i+3]+"x"+$("#pk_a_"+packageArray[i]).val();
      }
    }
    $("#pre_packages").html(bf.substring(4));
    $("#afp_packages").html(bf.substring(4));
    if ($("#fnote").val().length<1)
      bf=bf.substring(4);
  }
  bf+="<br>"+$("#adult").val()+"大";
  if ($("#child").val()>0) {
    bf+=$("#child").val()+"小";
  }
  orderNote=$("#pre_note").html()+bf;
  arrivalTime = $("#timepicker1").val();
  if ($("#farrivalDate").val().length>0) {
    arrivalDate = _getDateID($("#farrivalDate").datepicker("getDate"));
  } else {
    arrivalDate="";
  }
  
  $("#pre_arrivalTime").html(($("#farrivalDate").datepicker("getDate")).Format("yyyy-MM-dd")+" "+arrivalTime);
  
  if ($('input[name=fpickup]:checked').val()==1) {
    $("#pre_pickup").html(msgs(23)+($("#farrivalDate").datepicker("getDate")).Format("yyyy-MM-dd")+" "+$("#timepicker1").val()+msgs(24)+$("#fpickupLoc").val());
  } else {
    $("#pre_pickup").html(msgs(25));
  }
}

function getPayMethod() {
  $.post( _ServletPath+"ajaxHotelPayMethods",
    {hid:hotelID},
    function (res) {
      payMethods=eval('('+res+')');
    }
  );
}

function checkValid1() {
  if ($("#child").val().length==0) {
    $("#child").val(0);
  }
  if ($("#adult").val()<1) {
    alert(msgs(0));
    $("#adult").focus();
    return false;
  } else if ($("#child").val()<0) {
    alert(msgs(3));
    $("#child").focus();
    return false;
  } else if ($("#checkin").val().length<10) {
    alert(msgs(4));
    $("#checkin").focus();
    return false;
  }
  return true;
}

function checkValid4() {
  if ($("#fuserName").val().length<1) {
    alert(msgs(10));
    $("#fuserName").focus();
    return false;
  } else if ($("#femail").val().length<1) {
    alert(msgs(11));
    $("#femail").focus();
    return false;
  } else if ($("#fphone").val().length<1) {
    alert(msgs(12));
    $("#fphone").focus();
    return false;
  } else if ($("#fcountry").val().length<1) {
    alert(msgs(26));
    $("#fcountry").focus();
    return false;
  } else if ($("#farrivalDate").val().length<10) {
    alert("請挑選預計到達日及時間.");
    $("#farrivalDate").focus();
    return false;
  } else if ($("#timepicker1").val().length<8) {
    alert("請挑選預計到達日及時間.");
    $("#timepicker1").focus();
    return false;
  } else if ($('input[name=fpickup]:checked').val()==1 && $("#fpickupLoc").val().length<1) {
    alert("請告知航班, 火車車次或抵達地點.");
    $("#fpickupLoc").focus();
    return false;
  }
  return true;
}

function showStep(i) {
  var s = new Array();
  for (j=1; j<=totalSteps; j++) {
    if ( (j-step)<2 || hotelID==11)
      s[j]="<a href='javascript:goStep("+j+")'><image src='../IMG/step"+j+"s.png' style='height:40px;'></a>";
    else
      s[j]="<image src='../IMG/step"+j+"s.png' style='height:40px;'>";
  }
  s[i]="<image src='../IMG/step"+i+".png' style='height:60px;'>";
  ss="";
  for (j=1; j<=totalSteps; j++) {
    if (j>1) ss+='<image src="../IMG/step_line.png" style="width:6px;height:3px;">';
    ss+=s[j];
  }
  ss+='<image src="../IMG/p.png" style="height:60px;">';
  $("#h_name").html('<div class="'+headingcss+'"><span style="font-size:'+headingsize+'px">'+hotel.hotelName+'</span> '+headingbr+'<span style="vertical-align:middle">'+ss+'</span></div>');
  $("#versiondiv").html(agencyInfo);
  switch (i) {
    case 3:
      $("#hotelRule").show();
      break;
    case (totalSteps-2):
      showPreOrder();
      break;
    case (totalSteps-1):
      showPreOrder();
      break;
    case (totalSteps):
      //getPayMethod();
      break;
    default :
      $("#hotelRule").hide();
  }
}

function goStep(i){
  if (i>=totalSteps)
    $("#btnNext").hide();
  else
    $("#btnNext").show();
  if (i>totalSteps)
    $("#btnPrev").hide();
  else
    $("#btnPrev").show();
  //if (i-step>=2)
  //  return;
  switch (i) {
    case 2:
      //$("#hotelRule").show();
      if (!checkValid1()) {
        return false;
      }
      break;
    case 3:
      //$("#hotelRule").show();
      if (!carts || carts.roomIDs.length==0) {
        alert(msgs(7));
        return false;
      }
      break;
    case 5:
      if ( (totalSteps==6) && !checkValid4()) {
        return false;
      }
      break;
    case (totalSteps-1):
      if (!checkValid4()) {
        return false;
      }
      break;
    default :
      //$("#hotelRule").hide();
  }
  var move;
  if (step>i) {
    move="+="+(step-i)+"00%";
  } else {
    move="-="+(i-step)+"00%";
  }
  step=i;
  $("#main-body").animate({ marginLeft: move}, 500);
  showStep(i);
}
function nextStep() {
  var i=step+1;
  if (i>totalSteps) {
    i=totalSteps;
  }
  //console.log("i="+i);
  goStep(i);
}
function prevStep() {
  var i=step-1;
  if (i<1) i=1;
  goStep(i);
}
function loadpic(a,b) {
}
function changelang(lang) {
	if (lang=='tw') {
		location.href="index.html";
	} else if (lang=='en') {
		location.href="index_en.html";
	}
}

var msgList = new Array();
var msg_enList = new Array();
msgList[0]="請確實輸入同行成人人數.";
msg_enList[0]="Please input the number of guests.";
msgList[1]="<font color=red>已售出</font>";
msg_enList[1]="<font color=red>Sold out</font>";
msgList[2]="請來電洽詢:";
msg_enList[2]="Please call:";
msgList[3]="請輸入正確小孩人數.";
msg_enList[3]="Please input number.";
msgList[4]="請挑選入住日";
msg_enList[4]="Please input check-in date.";
msgList[5]="您選擇的日期超過民宿開放訂房的期間, 請回前一步重新選擇較近的日期.";
msg_enList[5]="Please choose the date range again.";
msgList[6]="費用=NT$";
msg_enList[6]="Price=NT$";
msgList[7]="至少需要訂1個房間.";
msg_enList[7]="Please choose one room to continue.";
msgList[8]="請輸入想要訂幾間房.";
msg_enList[8]="Please input number.";
msgList[9]="這一天此房型可訂房數不足.";
msg_enList[9]="Not enough.";
msgList[10]="請輸入下單人的姓名.";
msg_enList[10]="Please input your name.";
msgList[11]="請輸入收得到訂單通知信的Email.";
msg_enList[11]="Please input your email.";
msgList[12]="請輸入可以聯絡到您的手機或市話.";
msg_enList[12]="Please input your phone number.";
msgList[13]="是的, 我想要這項服務, 數量=";
msg_enList[13]="Yes, I want this;";
msgList[14]="要(現場收費,";
msg_enList[14]="Yes(fees will be collected at the scene";
msgList[15]="要(";
msg_enList[15]="Yes(";
msgList[16]="要(費用=";
msg_enList[16]="Yes(fees=";
msgList[17]="成人";
msg_enList[17]="Adults=";
msgList[18]=", 小孩";
msg_enList[18]=", Children=";
msgList[19]="人";
msg_enList[19]="";
msgList[20]=" 間.";
msg_enList[20]=".";
msgList[21]="入住日=";
msg_enList[21]="Check-in Date=";
msgList[22]=", 退房日=";
msg_enList[22]=", Check-out Date=";
msgList[23]="我要接送: 時間=";
msg_enList[23]="I want pick-up: Time=";
msgList[24]=", 地點=";
msg_enList[24]=", location=";
msgList[25]="不需要";
msg_enList[25]="No";
msgList[26]="請選擇您的國籍.";
msg_enList[26]="Please choose your country.";
msgList[27]="確認使用 ";
msg_enList[27]="Choose method of payment - ";
msgList[28]=" 付款?";
msg_enList[28]="";
msgList[29]="<h2> 無國外支付方式, 請選擇 我是台灣人.</h2>";
msg_enList[29]="<h2>Sorry, we only provide the way of paymethod in Taiwan.</h2>";
msgList[30]="";
msg_enList[30]="";
msgList[31]="點擊";
msg_enList[31]="Click";
msgList[32]="即可訂房";
msg_enList[32]="to book.";
function msgs(i) {
	if(langU=="en") return msg_enList[i];
	else return msgList[i];
}