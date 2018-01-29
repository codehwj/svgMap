(function () {
    //中国地图数据
    var chinaMap = [];

    //广西地图
    var gxmap = [];

    //城区地图
    var cityMap = [];

    //景点地图
    var scenicMap = [];

//    业务逻辑
    $(document).ready(function () {
        //中国地图
        var map = Raphael("ChinaMap", 860, 460);
        chinaMap = paintMap(map);

        //广西地图
        var gxMap = Raphael("GXMap", 550, 460);
        gxmap = GXMap(gxMap);

        //南宁地图
        var city = Raphael("CityMap", 550, 460);
        cityMap = loadCityMap(city);

        //青秀区地图
        var scenic = Raphael("ScenicMap", 550, 460);
        scenicMap = areaMap(scenic);

        $("#tabControl > button").on('click', function (e) {
            if ($(this).attr('class').indexOf('active') > 0) {
                return;
            } else {
                $(this).addClass('active').siblings().removeClass('active');
                switch ($(this).text()) {
                    case  '省份':
                        $('#ChinaMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#province').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#options span:nth-child(1)').addClass('active').siblings().removeClass('active');
                        break;
                    case '城市':
                        $('#GXMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#city').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#options span:nth-child(2)').addClass('active').siblings().removeClass('active');
                        var display = $('#GXMap').css('display');
                        break;
                    case  '城区':
                        $('#CityMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#urban').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#options span:nth-child(3)').addClass('active').siblings().removeClass('active');
                        var display = $('#CityMap').css('display');
                        break;
                    case  '景区':
                        $('#ScenicMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#scenicSpot').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#options span:nth-child(4)').addClass('active').siblings().removeClass('active');
                        break;
                }
            }
        })

        $("#options > span").on('click', function (e) {
            if ( $(this).attr('class').indexOf('active') > 0) {
                return;
            } else {
                $(this).addClass('active').siblings().removeClass('active');
                switch ($(this).text()) {
                    case  '省份':
                        $('#province').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#ChinaMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#tabControl button:nth-child(1)').addClass('active').siblings().removeClass('active');
                        break;
                    case '城市':
                        $('#city').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#GXMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#tabControl button:nth-child(2)').addClass('active').siblings().removeClass('active');
                        break;
                    case  '城区':
                        $('#urban').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#CityMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#tabControl button:nth-child(3)').addClass('active').siblings().removeClass('active');
                        break;
                    case  '景区':
                        $('#ScenicMap').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#scenicSpot').css({display: 'block'}).siblings().css({display: 'none'});
                        $('#tabControl button:nth-child(4)').addClass('active').siblings().removeClass('active');
                        break;
                }
            }
        })


        //广西地图点击
        for (var state in chinaMap) {
            mapUtils.dbClickMap(chinaMap[state], '广西', 'GXMap', gxmap);
            mapUtils.showInfo(chinaMap[state], state, chinaMap);
        }

        //南宁地图点击
        for (var state in gxmap) {
            mapUtils.dbClickMap(gxmap[state], '南宁', 'CityMap', cityMap);
            mapUtils.showInfo(gxmap[state], state, gxmap);
        }
        //南宁地图点击
        for (var state in cityMap) {
            mapUtils.dbClickMap(cityMap[state], '青秀区', 'ScenicMap', scenicMap);
            mapUtils.showInfo(cityMap[state], state, cityMap);
        }
        //青秀区地图显示
        showScenicMap(scenicMap);
        function showScenicMap(st) {
            for (var i = 0; i < st['textInfo'].length; i++) {

                (function (st, textInfo) {

                    st['textInfo'][i].text[0].onmouseover = function (e) {

                        $(document.body).append('<div id="MapTip1" class="mapTip"><div class="con"></div></div>');

                        $('#MapTip1 .con').html('<div>' + '<p class="province" >' + textInfo.name + '</p>' + '<p class="provinceToast" style="opacity: 0.5; ">' + textInfo.address + '</p>' + '</div>');
                        $('#MapTip1').css({
                            position: 'absolute',
                            left: e.pageX,
                            top: e.pageY
                        }).show();
                    };

                    st['textInfo'][i].text[0].onmouseout = function () {
                        st['path'].animate({fill: "#97d6f5", stroke: "#fff"}, 500);
                        $('#MapTip1').remove();
                    };
                })(st, st['textInfo'][i])
            }
        }
    })

})();




