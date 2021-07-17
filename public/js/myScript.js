function loadpicP(ref) {
  var image = document.getElementById('prevP');
  image.src = URL.createObjectURL(ref.files[0]);
  image.style.display = "block";
};
function loadpicM(ref) {
  var image = document.getElementById('prevM');
  image.src = URL.createObjectURL(ref.files[0]);
  image.style.display = "block";
};
function showcard() {
  var cr = document.getElementById("crd");
  cr.style.display = "block";
}
function loadid() {
  document.getElementById("tid").value = localStorage.getItem("id");
}
function logout() {
  localStorage.removeItem("id");
  window.location = "index.html";
}
function hider() {
  document.getElementById("btnr").style.display = "none";
}
function goP() {
  var option = document.querySelector("#sel");
  var index = option.selectedIndex;
  if (index == 1) {
    window.location = "med-provider-dash.html"
  }
  if (index == 2) {
    window.location = "index.html"
    localStorage.removeItem("id");
  }
}
function gon()
{
  var option = document.querySelector("#sel");
  var index = option.selectedIndex;
  if (index == 1) {
    window.location = "needy-dash.html"
  }
  if (index == 2) {
    window.location = "index.html"
    localStorage.removeItem("id");
  }
}
$(document).ready(function () {
  var j1 = false;
  var j2 = false;
  var j3 = false;
  var j4 = false;
  $("#txtids").blur(function ()//------------------SIGN UP EMAIL VALIDATION----------------------------------------------------
  {
    var m = $(this).val();
    var r = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ($(this).val().length == 0) {
      $("#eres").html("*email can't be blank").css({ "color": "red", "font-size": "13px" });
      $("#txtids").css({ "border": "2px red solid" });
      j1 = false;
    }
    else
      if (r.test(m) == false) {
        $("#eres").html("*Invalid email").css({ "color": "red", "font-size": "13px" });
        $("#txtids").css({ "border": "2px red solid" });
        j1 = false;
      }
      else {
        var url = "/getalldataU?sid=" + m;
        //alert(url);
        $.get(url, function (datarecv) {
          if (datarecv.length == 0) {
            $("#eres").html("");
            $("#txtids").css({ "color": "black", "border-color": "black" });
            j1 = true;
          }
          else {
            $("#eres").html("*Email exist").css({ "color": "red" });
            $("#txtids").css({ "border": "2px red solid" });
            j1 = false;
          }
        })
      }
  });
  $("#txtps").blur(function ()//-------------------SIGN UP PASSWORD VALIDATION--------------------------------------------------
  {
    var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var m = $(this).val();
    if ($(this).val().length == 0) {
      $("#erps").html("*password can't be blank").css({ "color": "red", "font-size": "13px" });
      $("#txtps").css({ "border": "2px red solid" });
      j2 = false;
    }
    else
      if (r.test(m) == false) {
        $("#erps").html("*minimum characters length is 8 contain atleast one symbol, capital letter, small letter and a numeric").css({ "color": "red", "font-size": "13px" });
        $("#txtps").css({ "border": "2px red solid" });
        j2 = false;
      }
      else {
        $("#erps").html("");
        $("#txtps").css({ "color": "black", "border-color": "black" });
        j2 = true;
      }
  });
  $("#txtm").blur(function ()//--------------------SIGN UP MOBILE VALIDATION-----------------------------------------------------
  {
    var r = /^[7-9]{1}[0-9]{9}$/;
    var m = $(this).val();
    if ($(this).val().length == 0) {
      $("#erm").html("*mobile no can't be blank").css({ "color": "red", "font-size": "13px" });
      $("#txtm").css({ "border": "2px red solid" });
      j3 = false;
    }
    else
      if (r.test(m) == false) {
        $("#erm").html("*Invalid mobile No").css({ "color": "red", "font-size": "13px" });
        $("#txtm").css({ "border": "2px red solid" });
        j3 = false;
      }
      else {
        $("#erm").html("*").css({ "color": "black" });
        $("#txtm").css({ "color": "black", "border-color": "black" });
        j3 = true;
      }
  });
  $("#select").blur(function () {//----------------SIGN UP SELECT VALIDATION------------------------------------------------------
    var index = $("#select option:selected").index();
    if (index == 0) {
      $("#ers").html("*select option").css({ "color": "red", "font-size": "13px" });
      $("#select").css({ "border": "2px red solid" });
      j4 = false;
    }
    else {
      $("#ers").html("");
      $("#select").css({ "color": "black", "border-color": "black" });
      j4 = true;
    }
  })
  $("#btnsu").click(function () {//----------------SIGN UP BUTTON CLICK----------------------------------------------------------

    var index = $("#select option:selected").index();
    if (j1 == false || j2 == false || j3 == false || j4 == false)
      alert("Fill all fields with correct values")
    else {
      var vid = $("#txtids").val();
      var vp = $("#txtps").val();
      var vm = $("#txtm").val();
      //alert(vm);
      var sel = $('#select option:selected').text();
      // var dt=new Date();
      // var month=dt.getMonth()+1;
      // var cur=dt.getDate()+"/"+month+"/"+dt.getFullYear();
      var url = "/respinsert?sid=" + vid + "&spwd=" + vp + "&sm=" + vm + "&sel=" + sel;
      $.get(url, function (datarecv) {
        if (datarecv.length == 0)
          alert("Error in saving data");
        else
          alert("Saved");
      })
    }
  })
  $("#txtidl").blur(function ()//------------------LOGIN EMAIL VALIDATION--------------------------------------------------------
  {
    if ($(this).val().length == 0) {
      $("#erel").html("*email can't be blank").css({ "color": "red" });
      $("#txtidl").css({ "border": "2px red solid" });
      j1 = false;
    }
    else {
      $("#erel").html("")
      $("#txtidl").css({ "border": "2px black solid" });
      j1 = true;
    }
  });
  $("#txtpl").blur(function ()//-------------------LOGIN PASSWORD VALIDATION----------------------------------------------------
  {
    if ($(this).val().length == 0) {
      $("#erpl").html("*password can't be blank").css({ "color": "red" });
      $("#txtpl").css({ "border": "2px red solid" });
      j2 = false;
    }
    else {
      $("#erpl").html("");
      $("#txtpl").css({ "border": "2px black solid" });
      j2 = true;
    }
  });
  $("#btnlg").click(function ()//------------------LOGIN BUTTON CLICK----------------------------------------------------------
  {
    if (j1 == false || j2 == false)
      alert("Fill all fields")
    else {
      var m = $("#txtidl").val();
      localStorage.setItem("id", m);
      var url = "/getalldataU?sid=" + m;
      $.get(url, function (datarecv) {
        if (datarecv.length == 0) {
          $("#erel").html("Email not exist").css({ "color": "red" });;
          $("#txtidl").css({ "border": "2px red solid" });
        }
        else {
          var pwdd = $("#txtpl").val();
          var url = "/getalldataU?sid=" + m;
          $.get(url, function (datarecv) {
            if (datarecv[0].pwd == pwdd && datarecv[0].utype == "Needy") {
              window.location = "needy-dash.html";
            }
            else
              if (datarecv[0].pwd == pwdd && datarecv[0].utype == "Med Provider") {
                window.location = "med-provider-dash.html";
              }
              else {
                $("#erpl").html("*wrong password").css({ "color": "red" });
                $("#txtpl").css({ "border": "2px red solid" });
              }
          })
        }
      })
    }
  })
  $("#up").click(function ()//---------------------NEEDY SAVE UPDATE BTN--------------------------------------------------------
  {
    var vid = $("#tid").val();
    var vn = $("#tn").val();
    var vac = $("#tac").val();
    var vc = $("#tcty").val();
    var vad = $("#tad").val();
    //alert(vm);
    if ($(this).val() == "Save") {
      var url = "/nrouter/needySave?sid=" + vid + "&sn=" + vn + "&sac=" + vac + "&sc=" + vc + "&sad=" + vad;
      $.get(url, function (datarecv) {
        if (datarecv.length == 0)
          alert("Error in saving data");
        else
          alert("Saved");
      })
    }
    else if ($(this).val() == "Update") {
      var url = "/nrouter/needyUpdate?sid=" + vid + "&sn=" + vn + "&sac=" + vac + "&sc=" + vc + "&sad=" + vad;
      $.get(url, function (datarecv) {
        if (datarecv.length == 0)
          alert("Error in update data");
        else
          alert("Update");
      })
    }
  })
  $("#tn").blur(function ()//----------------------PROVIDER PROFILE NAME VALIDATION----------------------------------------------------
  {
    var r = /^[A-Za-z ]+$/; //for name
    var m = $(this).val();
    if ($(this).val().length == 0) {
      $("#ern").html("*Name can't be blank").css({ "color": "red", "font-size": "13px" });
      $("#tn").css({ "border-color": "red", "border": "2px red solid" });
      j2 = false;
    }
    else
      if (r.test(m) == false) {
        $("#ern").html("*Only alphabets").css({ "color": "red", "font-size": "13px" });
        $("#tn").css({ "border": "2px red solid" });
        j2 = false;
      }
      else {
        $("#ern").html("*").css({ "color": "black" });
        $("#tn").css({ "border": "2px black solid" });
        j2 = true;
      }
  });
  $("#tac").blur(function ()//---------------------PROVIDER PROFILE AADHAR VALIDATION----------------------------------------------------
  {
    var r = /^[0-9]{14}$/;
    var m = $(this).val();
    if ($(this).val().length == 0) {
      $("#erac").html("*Aadhar can't be blank").css({ "color": "red", "font-size": "13px" });
      $("#tac").css({ "border-color": "red", "border": "2px red solid" });
      j4 = false;
    }
    else
      if (r.test(m) == false) {
        $("#erac").html("*Invalid aadhar").css({ "color": "red", "font-size": "13px" });
        $("#tac").css({ "border": "2px red solid" });
        j4 = false;
      }
      else {
        $("#erac").html("*").css({ "color": "black" });
        $("#tac").css({ "border": "2px black solid" });
        j4 = true;
      }
  });
  $("#tcty").blur(function ()//--------------------PROVIDER PROFILE CITY VALIDATION----------------------------------------------------
  {
    var r = /^[A-Za-z]+$/; //for name
    var m = $(this).val();
    if ($(this).val().length == 0) {
      $("#erc").html("*City can't be blank").css({ "color": "red", "font-size": "13px" });
      $("#tcty").css({ "border-color": "red", "border": "2px red solid" });
      j5 = false;
    }
    else
      if (r.test(m) == false) {
        $("#erc").html("*Only alphabets").css({ "color": "red", "font-size": "13px" });
        $("#tcty").css({ "border": "2px red solid" });
        j5 = false;
      }
      else {
        $("#erc").html("*").css({ "color": "black" });
        $("#tcty").css({ "border": "2px black solid" });
        j5 = true;
      }
  });
  $("#tad").blur(function ()//---------------------PROVIDER PROFILE ADDRESS VALIDATION----------------------------------------------------
  {
    if ($(this).val().length == 0) {
      $("#erad").html("*Address can't be blank").css({ "color": "red", "font-size": "13px" });
      $("#tad").css({ "border-color": "red", "border": "2px red solid" });
      j6 = false;
    }
    else {
      $("#erad").html("*").css({ "color": "black" });
      $("#tad").css({ "border": "2px black solid" });
      j6 = true;
    }
  });
})
var mymodule = angular.module("module1", [])
mymodule.controller("control1", function ($scope, $http)//$scope is lib object provided by angular
{
  $scope.loademail = function () {
    $scope.uid = localStorage.getItem("id");
  }

  $scope.jsonArray = [{}];
  $scope.fetchUserM = function () {
    //alert($scope.uid);
    $http.get("/fetchUserM?uid=" + $scope.uid).then(ok, nok);
    function ok(response) {
      //alert("ok");
      //alert(JSON.stringify(response.data));
      // if (response.data.length == 0) {
      //   $('').html("Please update your profile").css({ 'color': 'black', "font-style": "italic" });
      // }
      // else {
        $scope.jsonArray = response.data;
    }
    function nok(response) {
      alert("not ok");
    }
  }

  $scope.delete = function (grid) {
    //alert(grid);
    var result = confirm("Are you sure you want to delete?");
    if (result) {
      $http.get("/deleteMed?uid=" + grid).then(ok, nok);
      function ok(response) {
        //alert("deleted");
        alert(JSON.stringify(response.data));
        $scope.fetchdata();
      }
      function nok(response) {
        alert("not delete")
      }
    }
    else {
      return;
    }
  }

  $scope.showModelMedU=function(grid)
  {
    alert(grid);
    $('#mdl').modal('show');
    localStorage.setItem("grid", grid);
  }
  $scope.frid = function (grid) {
    //alert(grid);
    //localStorage.removeItem("grid");
    localStorage.setItem("grid", grid);
    window.location = "med-update.html";
  }
})