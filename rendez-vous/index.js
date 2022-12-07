(function() {
  angular
    .module('calendarApp', ['ngAnimate'])
    .controller('calendarController', calendarController);

  function calendarController($scope) { 
    var parm = this,
      now = new Date(),
      months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],jan = daysInMonth(1, now.getFullYear()),feb = daysInMonth(2, now.getFullYear()),mar = daysInMonth(3, now.getFullYear()),apr = daysInMonth(4, now.getFullYear()),may = daysInMonth(5, now.getFullYear()),jun = daysInMonth(6, now.getFullYear()),jul = daysInMonth(7, now.getFullYear()),aug = daysInMonth(8, now.getFullYear()),sep = daysInMonth(9, now.getFullYear()),oct = daysInMonth(10, now.getFullYear()),nov = daysInMonth(11, now.getFullYear()),dec = daysInMonth(12, now.getFullYear()),
      monthRef = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
      month = now.getMonth(),
      monthDay = monthRef[now.getMonth()],
      n = now.getDate(),
      uidi,
      uidm,
      uid;

    parm.id = now.getDate().toString() + now.getMonth().toString();
    parm.dataId;
    parm.events = [];
    parm.i = 1;
    parm.full = "full";
    parm.nom;
    parm.prenom;
    parm.tele;
    parm.horaires;
    parm.month = months[month];
    parm.next = next;
    parm.prev = prev;
    parm.add = add;
    function placeIt() {
      if (month === 0) {
        $(".date_item").first().css({'margin-left': '200px'})
      } else if (month === 1) {
        $("date_item").first().css({'margin-left': '0px'})
      } else if (month === 2) {
        $(".date_item").first().css({'margin-left': '50px' })
      } else if (month === 3) {
        $(".date_item").first().css({'margin-left': '200px'})
      } else if (month === 4) {
        $(".date_item").first().css({'margin-left': '300px'})
      } else if (month === 5) {
        $(".date_item").first().css({'margin-left': '100px'
        })
      } else if (month === 6) {
        $(".date_item").first().css({'margin-left': '200px'
        })
      } else if (month === 7) {
        $(".date_item").first().css({'margin-left': '0px'
        })
      } else if (month === 8) {
        $(".date_item").first().css({'margin-left': '150px'
        })
      } else if (month === 9) {
        $(".date_item").first().css({'margin-left': '250px'
        })
      } else if (month === 10) {
        $(".date_item").first().css({'margin-left': '50px'})
      } else if (month === 11) {
        $(".date_item").first().css({'margin-left': '150px'})
      }
    }

    function presentDay() {
      $(".date_item").eq(n - 1).addClass("present");
    }
    function showDays(days) {
      for (var i = 1; i < days; i++) {
        var uidi = i;
        var uidm = month;
        var uid = uidi.toString() + uidm.toString();
        $(".dates").append("<div class='date_item' data='" + uid + "'>" + i + "</div>");
      }
    }
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate() + 1;
    }

    function next() {
      if (month < 11) {
        month++;
        $(".dates").html('');
        parm.month = months[month];
        monthDay = monthRef[month];
        showDays(monthDay);
        placeIt();
      }
    }

    function prev() {
      if (month === 0) {
        return false
      } else {
        month--;
        $(".dates").html('');
        parm.month = months[month];
        monthDay = monthRef[month];
        showDays(monthDay);
        placeIt();
      }
    }
    
    function add() {
      if(parm.i === 10)
      {
        parm.full = "full";        
      }else
      {
        parm.full = "present";
      }

      parm.events.push({  
        id: parm.id,
        nom: parm.nom,
        progresss :parm.i,
        prenom : parm.prenom,
        telee : parm.tele,
        etat : parm.full,
        horaires :parm.horaires
      });
      console.log(parm.i);
      //nombre de patient ne depasse pas 10 patients par exemple 
      if(parm.i === 10)
      {
        $("#frm :input").prop("disabled", true);
        $(".calendar_left_2").animate({left: '800px'});
        $(".sidebar .nav-links li i").animate({left: '-8px'});
        $(".sidebar").animate({left: '-192px'});
        $(".present").addClass("full");
        $(".sidebar").animate({left: '0'});
        $(".sidebar .nav-links li i").animate({left: '177px'});
       
      }
      parm.i = parm.i + 1;
      parm.nom = "";
      parm.prenom = "";
      parm.tele = "";
    }
  
    $(".dates").click(function(){
      $(".calendar_right").animate({left: '1140px'});
    });
   
    $(".dates").click(function(){
      $(".calendar_left_2").animate({left: '426px'});
    });

    $(".calendar_right h3").on("click", function() {
      $(".calendar_right").animate({left: '800px'});
    });

    $(".calendar_left_2 h3").on("click", function() {
      $(".calendar_left_2").animate({left: '812px'});
      $(".sidebar .nav-links li i").animate({left: '177px'});
    $(".sidebar").animate({left: '0'});
    });

    $("#heure").on("click", function() {
       $("#time").animate({  right: '8px',top: '128px'});
    });
    
    
    $(".dates").on("click", ".date_item", function() {
      parm.id = $(this).attr('data');
      parm.dataId = $(this).attr('data');
 
      $(this).addClass("present").siblings().removeClass("present");
      $(".sidebar .nav-links li i").animate({left: '-8px'});
      $(".sidebar").animate({left: '-192px'});
      $("#frm :input").prop("disabled", false);
      parm.nom = "";
      parm.prenom = "";
      parm.tele = "";
      parm.horaires = "";
      $("#time").animate({  right: '40px',top: '145px'});
      parm.i = 1;
      $scope.$apply();
    });
  
    showDays(monthDay);
    presentDay();
    placeIt();
  }

})();