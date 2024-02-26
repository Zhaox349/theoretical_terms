let game1Data;
function preload() {
  game1Data = loadJSON(`json/game1.json`);
}

function setup() {
  const count = getQueryVariable("count");
  const orientation = getQueryVariable("orientation");
  const key = getQueryVariable("key");

  const orientationMap = {
    east: "东",
    south: "南",
    west: "西",
    north: "北",
  };

  document.getElementById(
    "title"
  ).innerHTML = `${orientation.toLocaleUpperCase()} ${count}`;
  document.getElementById("result").innerHTML = `${decodeURIComponent(key)}`;
  document.getElementById("result2").innerHTML = `${
    game1Data[decodeURIComponent(key)].content
  }`;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
