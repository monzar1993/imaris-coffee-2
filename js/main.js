// navbar
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("logo").style.width = "45px";
    } else {
        document.getElementById("logo").style.width = "160px";
    }
}
// navbar

//tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
//tabs


//timer
// для задания обратного отсчета до определенной даты укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ);
// Для задания даты с точностью до времени укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);

timeend = new Date();
timeend = new Date(timeend.getYear() > 1900 ? (timeend.getYear() + 1) : (timeend.getYear() + 1900), 2, 15);

function time() {
    today = new Date();
    today = Math.floor((timeend - today) / 1000);
    tsec = today % 60;
    today = Math.floor(today / 60);
    if (tsec < 10) tsec = '0' + tsec;
    tmin = today % 60;
    today = Math.floor(today / 60);
    if (tmin < 10) tmin = '0' + tmin;
    thour = today % 24;
    today = Math.floor(today / 24);
    timestr = today + ":" + thour + ":" + tmin + ":" + tsec;
    document.getElementById('t').innerHTML = timestr;
    window.setTimeout("time()", 1000);
}
//timer