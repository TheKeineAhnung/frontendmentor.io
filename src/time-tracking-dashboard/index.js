function loadData(data) {
  var myData = JSON.parse(data);
  return myData;
}

function addEntry(element, config) {
  var title = element.title;
  var time = document.querySelector(
    `div.time span.time-${title}`.toLowerCase()
  );
  console.log(time);
  var lastWeek = document.querySelector(
    `div.last-week-${title} span.number`.toLowerCase()
  );
  if (config.classList.contains("daily")) {
    time.innerText = element.timeframes.daily.current;
    lastWeek.innerText = element.timeframes.daily.previous;
  } else if (config.classList.contains("weekly")) {
    time.innerText = element.timeframes.weekly.current;
    lastWeek.innerText = element.timeframes.weekly.previous;
  } else {
    time.innerText = element.timeframes.monthly.current;
    lastWeek.innerText = element.timeframes.monthly.previous;
  }
}

function addEntrys() {
  var data = loadData(`[
        {
          "title": "Work",
          "timeframes": {
            "daily": {
              "current": 5,
              "previous": 7
            },
            "weekly": {
              "current": 32,
              "previous": 36
            },
            "monthly": {
              "current": 103,
              "previous": 128
            }
          }
        },
        {
          "title": "Play",
          "timeframes": {
            "daily": {
              "current": 1,
              "previous": 2
            },
            "weekly": {
              "current": 10,
              "previous": 8
            },
            "monthly": {
              "current": 23,
              "previous": 29
            }
          }
        },
        {
          "title": "Study",
          "timeframes": {
            "daily": {
              "current": 0,
              "previous": 1
            },
            "weekly": {
              "current": 4,
              "previous": 7
            },
            "monthly": {
              "current": 13,
              "previous": 19
            }
          }
        },
        {
          "title": "Exercise",
          "timeframes": {
            "daily": {
              "current": 1,
              "previous": 1
            },
            "weekly": {
              "current": 4,
              "previous": 5
            },
            "monthly": {
              "current": 11,
              "previous": 18
            }
          }
        },
        {
          "title": "Social",
          "timeframes": {
            "daily": {
              "current": 1,
              "previous": 3
            },
            "weekly": {
              "current": 5,
              "previous": 10
            },
            "monthly": {
              "current": 21,
              "previous": 23
            }
          }
        },
        {
          "title": "Self-Care",
          "timeframes": {
            "daily": {
              "current": 0,
              "previous": 1
            },
            "weekly": {
              "current": 2,
              "previous": 2
            },
            "monthly": {
              "current": 7,
              "previous": 11
            }
          }
        }
      ]`);
  var selected = document.querySelector("span.selected");
  data.forEach((element) => {
    addEntry(element, selected);
  });
}

window.onload = addEntrys();

const daily = document.querySelector(".daily");
const weekly = document.querySelector(".weekly");
const monthly = document.querySelector(".monthly");

daily.addEventListener("click", function () {
  var selected = document.querySelector(".selected");
  selected.classList.remove("selected");
  daily.classList.add("selected");
  addEntrys();
});

weekly.addEventListener("click", function () {
  var selected = document.querySelector(".selected");
  selected.classList.remove("selected");
  weekly.classList.add("selected");
  addEntrys();
});

monthly.addEventListener("click", function () {
  var selected = document.querySelector(".selected");
  selected.classList.remove("selected");
  monthly.classList.add("selected");
  addEntrys();
});
