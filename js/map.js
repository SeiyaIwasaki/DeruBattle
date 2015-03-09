var Map = {};
var mark;		// 地図上のマーカー

Map.getCurrentPos = function(){
	var dfd = $.Deferred();
	
	// gpsに対応しているかどうか
	if(!navigator.geolocation){
		alert("GPSに対応していません");
		// グランフロントの座標値を返す
		dfd.resolve(new google.maps.LatLng(34.705895, 135.494474));
	}
	
	// gps取得開始
	navigator.geolocation.getCurrentPosition(function(pos) {
		// gps取得成功
		dfd.resolve(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	}, function(){
		// gps取得失敗（グランフロントの座標値）		
		dfd.resolve(new google.maps.LatLng(34.705895, 135.494474));
	});
	
	return dfd.promise();
};

Map.updateMarker = function(){
	Map.getCurrentPos().then(function(cur_pos){
		mark.setPosition(cur_pos);
		console.log("現在地更新：" + cur_pos);
		setTimeout("Map.updateMarker()", 5000);
	});
};

Map.createMap = function(id, lat, lng, zoom) {
    var mapOptions = {
		center: new google.maps.LatLng(lat, lng),
		zoom: zoom
    };
    var map = new google.maps.Map(document.getElementById(id), mapOptions);
    return map;
};

Map.getMapBounds = function(map) {
    var mapBounds = map.getBounds();
    var sw = mapBounds.getSouthWest();
    var ne = mapBounds.getNorthEast();
    var bounds = {
	'lat1': sw.lat(), 'lng1': sw.lng(),
	'lat2': ne.lat(), 'lng2': ne.lng()
    };
    return bounds;
};

Map.createMarker = function(map, title, lat, lng, draggable) {
    var marker = new google.maps.Marker({
	position: new google.maps.LatLng(lat, lng),
	map: map,
	title : title,
	draggable: draggable
    });
	mark = marker;
    return marker;
};

Map.createCircle = function(map, lat, lng, r, color) {
    var options = {
	strokeColor: color,
	strokeOpacity: 0.8,
	strokeWeight: 1,
	fillColor: color,
	fillOpacity: 0.35,
	map: map,
	center: new google.maps.LatLng(lat, lng),
	radius: r
    };
    var circle = new google.maps.Circle(options);
    return circle;
};
