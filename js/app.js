(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function updateTime() {
        const now = new Date;
        const timeElement = document.getElementById("time");
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    updateTime();
    setInterval(updateTime, 1e3);
    var Cal = function(divId) {
        this.divId = divId;
        this.DaysOfWeek = [ "Пн", "Вт", "Ср", "Чтв", "Птн", "Суб", "Вск" ];
        this.Months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
        var d = new Date;
        this.currMonth = d.getMonth("9");
        this.currYear = d.getFullYear("22");
        this.currDay = d.getDate("3");
    };
    Cal.prototype.nextMonth = function() {
        if (this.currMonth == 11) {
            this.currMonth = 0;
            this.currYear = this.currYear + 1;
        } else this.currMonth = this.currMonth + 1;
        this.showcurr();
    };
    Cal.prototype.previousMonth = function() {
        if (this.currMonth == 0) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        } else this.currMonth = this.currMonth - 1;
        this.showcurr();
    };
    Cal.prototype.showcurr = function() {
        this.showMonth(this.currYear, this.currMonth);
    };
    Cal.prototype.showMonth = function(y, m) {
        new Date;
        var firstDayOfMonth = new Date(y, m, 7).getDay(), lastDateOfMonth = new Date(y, m + 1, 0).getDate(), lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
        var html = "<table>";
        html += "<thead><tr>";
        html += '<td colspan="7">' + this.Months[m] + " " + y + "</td>";
        html += "</tr></thead>";
        html += '<tr class="days">';
        for (var i = 0; i < this.DaysOfWeek.length; i++) html += "<td>" + this.DaysOfWeek[i] + "</td>";
        html += "</tr>";
        i = 1;
        do {
            var dow = new Date(y, m, i).getDay();
            if (dow == 1) html += "<tr>"; else if (i == 1) {
                html += "<tr>";
                var k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (var j = 0; j < firstDayOfMonth; j++) {
                    html += '<td class="not-current">' + k + "</td>";
                    k++;
                }
            }
            var chk = new Date;
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
            if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) html += '<td class="today">' + i + "</td>"; else html += '<td class="normal">' + i + "</td>";
            if (dow == 0) html += "</tr>"; else if (i == lastDateOfMonth) {
                k = 1;
                for (dow; dow < 7; dow++) {
                    html += '<td class="not-current">' + k + "</td>";
                    k++;
                }
            }
            i++;
        } while (i <= lastDateOfMonth);
        html += "</table>";
        document.getElementById(this.divId).innerHTML = html;
    };
    window.onload = function() {
        var c = new Cal("divCal");
        c.showcurr();
        getId("btnNext").onclick = function() {
            c.nextMonth();
        };
        getId("btnPrev").onclick = function() {
            c.previousMonth();
        };
    };
    function getId(id) {
        return document.getElementById(id);
    }
    window["FLS"] = true;
    isWebp();
})();