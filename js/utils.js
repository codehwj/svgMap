var mapUtils = function () {


    function showMapInfo(st, state, map) {

        st['path'][0].onmouseover = function (e) {

            st['path'].animate({fill: map[state].color, stroke: "#fff", transfrom: "scale(1.1)"}, 500);

            $(document.body).append('<div id="MapTip1" class="mapTip"><div class="con"></div></div>');

            $('#MapTip1 .con').html('<div>' + '<p class="province" >' + st['name'] + '</p>' + '<p class="provinceToast" style="opacity: 0.5; ">' + st['path'] + '</p>' + '</div>');

            $('#MapTip1').css({
                position: 'absolute',
                left: e.pageX,
                top: e.pageY
            }).show();
        };

        st['path'][0].onmouseout = function () {
            st['path'].animate({fill: "#97d6f5", stroke: "#fff"}, 500);
            $('#MapTip1').remove();
        };

    }

    function areaMap(mapInfo) {
        for (var state in mapInfo) {
            showMapInfo(mapInfo[state], state, mapInfo);
        }
    }

    function selectTab(showMapId, tag) {
        if ($('#' + showMapId).attr('class').indexOf('active') > 0) {
            return
        } else {

            $("#tabControl > button:nth-child(" + tag + ")").addClass('active').siblings().removeClass('active');
            $("#options > span:nth-child(" + tag + ")").addClass('active').siblings().removeClass('active');
            $("#areaShow > div:nth-child(" + tag + ")").css('display', 'block').siblings().css('display', 'none');
            $('#' + showMapId).css({display: 'block'}).siblings().css('display', 'none');


        }
    }

    function dbClickMap(st, mapName, showMapId, mapInfo) {
        st['path'][0].ondblclick = function (e) {
            if (st['name'] === mapName) {
                // mapUtils.areaMap(mapInfo)
                switch (showMapId) {
                    case 'ChinaMap':
                        selectTab(showMapId, 1);
                        break;
                    case 'GXMap':
                        selectTab(showMapId, 2);
                        break;
                    case 'CityMap':
                        selectTab(showMapId, 3);
                        break;
                    case 'ScenicMap':
                        selectTab(showMapId, 4);
                        break;
                }
            } else {
                alert('暂时只做了' + mapName + '详细地图!')
            }
        }
    }


    return {
        showInfo: showMapInfo,
        areaMap: areaMap,
        selectTab: selectTab,
        dbClickMap: dbClickMap
    }
}();