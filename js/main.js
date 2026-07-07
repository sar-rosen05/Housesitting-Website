document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var tabButtons = document.querySelectorAll(".tab-btn");
  var tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabPanels.forEach(function (panel) {
        panel.hidden = true;
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      var target = document.querySelector('.tab-panel[data-panel="' + btn.dataset.tab + '"]');
      if (target) {
        target.hidden = false;
      }
    });
  });

  document.querySelectorAll(".tab-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetBtn = document.querySelector('.tab-btn[data-tab="' + link.dataset.tab + '"]');
      if (targetBtn) {
        targetBtn.click();
        targetBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  var inquiryForm = document.getElementById("inquiry-form");
  var inquiryStatus = document.getElementById("inquiry-status");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var submitBtn = inquiryForm.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch(inquiryForm.action, {
        method: "POST",
        body: new FormData(inquiryForm),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            inquiryForm.reset();
            inquiryStatus.textContent = "Thanks! Your inquiry has been sent — I'll get back to you soon.";
            inquiryStatus.className = "form-status success";
          } else {
            inquiryStatus.textContent = "Something went wrong. Please try again or email me directly.";
            inquiryStatus.className = "form-status error";
          }
          inquiryStatus.hidden = false;
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Inquiry";
        })
        .catch(function () {
          inquiryStatus.textContent = "Something went wrong. Please try again or email me directly.";
          inquiryStatus.className = "form-status error";
          inquiryStatus.hidden = false;
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Inquiry";
        });
    });
  }

  var calGrid = document.getElementById("cal-grid");
  if (calGrid) {
    // To update: add or remove { start: "YYYY-MM-DD", end: "YYYY-MM-DD" } entries below
    // as your gig bookings change. The calendar re-renders automatically from this list.
    var bookedRanges = [
      { start: "2026-07-03", end: "2026-07-12" },
      { start: "2026-07-16", end: "2026-07-19" },
      { start: "2026-07-23", end: "2026-07-29" },
      { start: "2026-07-31", end: "2026-08-04" },
      { start: "2026-08-06", end: "2026-08-19" },
      { start: "2026-08-21", end: "2026-08-30" },
      { start: "2026-09-11", end: "2026-09-13" },
      { start: "2026-09-22", end: "2026-09-27" },
      { start: "2026-12-22", end: "2027-01-16" },
    ];

    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    var monthLabel = document.getElementById("cal-month-label");
    var prevBtn = document.getElementById("cal-prev");
    var nextBtn = document.getElementById("cal-next");

    var today = new Date();
    var viewYear = today.getFullYear();
    var viewMonth = today.getMonth();

    function parseDate(str) {
      var parts = str.split("-");
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }

    function isBooked(date) {
      return bookedRanges.some(function (range) {
        var start = parseDate(range.start);
        var end = parseDate(range.end);
        return date >= start && date <= end;
      });
    }

    function renderCalendar(y, m) {
      calGrid.innerHTML = "";
      monthLabel.textContent = monthNames[m] + " " + y;

      var firstWeekday = new Date(y, m, 1).getDay();
      var totalDays = new Date(y, m + 1, 0).getDate();

      for (var i = 0; i < firstWeekday; i++) {
        var empty = document.createElement("div");
        empty.className = "cal-day-empty";
        calGrid.appendChild(empty);
      }

      for (var d = 1; d <= totalDays; d++) {
        var cellDate = new Date(y, m, d);
        var cell = document.createElement("div");
        cell.className = "cal-day" + (isBooked(cellDate) ? " booked" : "");
        cell.textContent = d;
        calGrid.appendChild(cell);
      }
    }

    prevBtn.addEventListener("click", function () {
      viewMonth -= 1;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear -= 1;
      }
      renderCalendar(viewYear, viewMonth);
    });

    nextBtn.addEventListener("click", function () {
      viewMonth += 1;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear += 1;
      }
      renderCalendar(viewYear, viewMonth);
    });

    renderCalendar(viewYear, viewMonth);
  }
});
