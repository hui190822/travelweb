window.onload = function(){
    var type = "F-C0032-001";
    var apikey = "CWB-369D8D1A-E780-4AA9-8DA2-601990BDFE8B";
    var format = "JSON";
    var factor = ["Wx", "PoP", "MinT", "MaxT"];

    var opendata = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/${type}?Authorization=${apikey}&format=${format}&elementName=${factor.join(",")}`;


    // https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-369D8D1A-E780-4AA9-8DA2-601990BDFE8B&format=JSON&elementName=["Wx", "PoP", "MinT", "MaxT"]
    var citysWeather = [];

    var now = new Date();
    var hour = now.getHours();
    const daytime = [
      {
        text: "今日白天",
        val: "day"
      },
      {
        text: "今晚明晨",
        val: "night"
      },
      {
        text: "明日白天",
        val: "day"
      }
    ];
  
    //昨晚今晨、今日白天、今日晚上 night day night
  
    const daynight = [
      {
        text: "今晚明晨",
        val: "night"
      },
      {
        text: "明日白天",
        val: "day"
      },
      {
        text: "明日晚上",
        val: "night"
      }
    ];
  
    fetch(opendata)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
  
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(function (myJson) {
        console.log("myJson", myJson);
        var allCitys = myJson.records.location;
        allCitys.forEach((element, index) => {
          var array = myJson.records.location[index].weatherElement;
          var wx = array.find((m) => m.elementName === "Wx").time;
          var pop = array.find((m) => m.elementName === "PoP").time;
          var minT = array.find((m) => m.elementName === "MinT").time;
          var maxT = array.find((m) => m.elementName === "MaxT").time;
  
          var info = [];
          for (let i = 0; i < 3; i++) {
            info.push({
              Time: {
                start: wx[i].startTime,
                end: wx[i].endTime
              },
              weatherName: wx[i].parameter.parameterName,
              weatherIndex: wx[i].parameter.parameterValue,
              Temperature: {
                low: minT[i].parameter.parameterName,
                high: maxT[i].parameter.parameterName
              },
              rainRate: pop[i].parameter.parameterName
            });
          }
          citysWeather.push({
            city: myJson.records.location[index].locationName,
            info
          });
        });
        const defaultCity = document.querySelector(".is-active");
        initalWeather(defaultCity.dataset.name, hour >= 18 ? daynight : daytime);
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        );
      });
  
    var paths = document.querySelectorAll("path");
    var title = document.querySelector(".weather__title > h1");
    var moment = document.querySelectorAll(".weather__content > h3");
    var low = document.querySelectorAll(".low");
    var high = document.querySelectorAll(".high");
    var img = document.querySelectorAll(".weather__icon > img");
    var rate = document.querySelectorAll(".rain__rate");
  
    paths.forEach((element) => {
      element.addEventListener("click", function () {
        let previousEle = document.querySelector(".is-active");
        previousEle.classList.remove("is-active");
        element.classList.add("is-active");
        initalWeather(element.dataset.name, hour >= 18 ? daynight : daytime);
      });
  
      var toolltip = document.querySelector(".tooltip");
      element.addEventListener("mousemove", function (e) {
        // console.log("e.clientX, e.clientY", e.clientX, e.clientY);
        // console.log("e.pageX, e.pageY", e.pageX, e.pageY);
        tooltip.textContent = element.dataset.name;
        tooltip.style.left = `${e.pageX + 8}px`;
        tooltip.style.top = `${e.pageY - 35}px`;
        tooltip.style.display = "block";
      });
      element.addEventListener("mouseout", function (e) {
        tooltip.textContent = "";
        tooltip.style.display = "none";
      });
    });
  
    initalWeather = (cityName, days) => {
      //縣市名
      title.innerHTML = cityName;
  
      let obj = citysWeather.find((m) => m.city === cityName);
  
      days.forEach((element, index) => {
        moment[index].innerHTML = days[index].text;
        low[index].innerHTML = `${obj.info[index].Temperature.low}<sup>°</sup>`;
        high[index].innerHTML = `${obj.info[index].Temperature.high}<sup>°</sup>`;
        rate[index].innerHTML = `${obj.info[index].rainRate}%`;
        let number =
          obj.info[index].weatherIndex < 10
            ? "0" + obj.info[index].weatherIndex
            : "" + obj.info[index].weatherIndex;
        img[
          index
        ].src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${days[index].val}/${number}.svg`;
        img[index].alt = obj.info[index].weatherName;
        img[index].title = obj.info[index].weatherName;
      });
    };
  };
  