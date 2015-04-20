var myLatlng = new google.maps.LatLng(37.782547, -122.397890);



function adjust(){
	var mw = $('.thumb').width();
    $(".thumb").css({'height': mw + 'px'});
}

var image = 'images/whistle.png';

function initialize(loc) {
  
  var mapOptions = {
    zoom: 15,
    center: loc,
    disableDefaultUI: true,
    draggable: false, 
    zoomControl: false, 
    scrollwheel: false, 
    disableDoubleClickZoom: true
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);


  var marker = new google.maps.Marker({
    position: loc,
    map: map,
    icon: image
  });
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
  document.body.appendChild(script);
}

function resizeMap(){
	$('#testbutton').click(function() {
		$('#tick2').addClass('hidden');
		$('#alert').addClass('hidden');
		$('#logo').addClass('hidden');
		$('#closebutton').removeClass('hidden');
		$('#fullbanner').removeClass('hidden');
		$('#map').addClass('fullscreen').removeClass('thumb');
		$('#map-canvas').addClass('canvasfull').removeClass('canvasthumb');
		initialize(myLatlng);
	});
}

function closeMap(){
	$('#closebutton').click(function() {
		$('#tick2').removeClass('hidden');
		$('#alert').removeClass('hidden');
		$('#logo').removeClass('hidden');
		$('#closebutton').addClass('hidden');
		$('#fullbanner').addClass('hidden');
		$('#map').addClass('thumb').removeClass('fullscreen');
		$('#map-canvas').addClass('canvasthumb').removeClass('canvasfull');
		initialize(myLatlng);
	});
}

window.onload = loadScript;
var flag = true;

(function(){
      var myFirebaseRef = new Firebase("https://wstl.firebaseio.com");
      myFirebaseRef.on('child_changed', function(childSnapshot, prevChildName){
	      var num = childSnapshot.val()['value'];
	      var top = $('.thumb').height()/2-15 + 'px';
	      //console.log(top);
	      //console.log(num);
	      if((num > 700 || num < 260) && flag) {
	      	if($('#ripple1').css('opacity')== 0 && $('#ripple2').css('opacity') == 0 && $('#ripple3').css('opacity') == 0){
				TweenMax.to("#ripple1, #ripple2, #ripple3", .001, {'scale':1, 'opacity': 1});
				TweenMax.to("#ripple1", 2, {'scale':2, 'opacity': 0, ease: Power1.easeOut});
				TweenMax.to("#whistle", 2, {'opacity': 1, 'margin-top':top, ease: Power4.easeOut});
				TweenMax.to("#ripple2", 2, {'scale':1.8, 'opacity': 0, 'delay':.3, ease: Power1.easeOut});
				TweenMax.to("#ripple3", 2, {'scale':1.6, 'opacity': 0, 'delay':.5,ease: Power1.easeOut});
				TweenMax.to("#ripple1, #ripple2, #ripple3", .001, {'scale':1, 'delay':3.5});
				if($('.all').css('opacity')==0) {
					TweenMax.to(".all", 1, {'margin-top':'15px', 'opacity': 1});
					image = 'images/whistle.png';
					initialize(myLatlng);
				}
				flag = false;
			}
			else {
				//console.log("ready");
			}
			$('#tick3').text($('#tick2').text());
	      } else if(num >= 260 && num <= 700){
	      	flag = true;
	      	//console.log(flag);
	      }
	  });
})();


$(document).ready(function() {
	$('.thumb-ripple').css('height',$('.thumb-ripple').width());
	 adjust();
	// resizeMap();
	// closeMap();
	// initialize(myLatlng);
		

		var myFirebaseRef = new Firebase("https://wstl.firebaseio.com/");
		$('.button').on('click', function(){
				myFirebaseRef.child('Blow').update({"led": "true"});
				TweenMax.to("#ripple4", .001, {'scale':1, 'opacity': .8});
				TweenMax.to("#ripple4", 4, {'scale':1, 'opacity': 0,ease: Power1.easeOut});
				//console.log(childSnapshot.val()['led']);
				//console.log("!");
				console.log("!!!??????????");
			});

  //     	myFirebaseRef.on('child_changed', function(childSnapshot, prevChildName){
  //     		console.log('!!!!!!!!!!!!!!!!!!!!');
			
		// });
});

$(window).resize(function() {
	$('.thumb-ripple').css('height',$('.thumb-ripple').width());
	adjust();
	resizeMap();
	closeMap();
	initialize(myLatlng);
});



/*By JavaScript Kit
http://javascriptkit.com
Credit MUST stay intact for use
*/

function show2(){
	if (!document.all&&!document.getElementById)
	return
	thelement=document.getElementById? document.getElementById("tick2"): document.all.tick2
	var Digital=new Date()
	var hours=Digital.getHours()
	var minutes=Digital.getMinutes()
	var seconds=Digital.getSeconds()
	var dn="PM"
	if (hours<12)
	dn="AM"
	if (hours>12)
	hours=hours-12
	if (hours==0)
	hours=12
	if (minutes<=9)
	minutes="0"+minutes
	if (seconds<=9)
	seconds="0"+seconds
	var ctime=hours+":"+minutes+" "+dn
	thelement.innerHTML="<style='font-size:14;color:#398096;font-family: 'Dosis', sans-serif;font-weight:300;'>"+ctime+"</style>"
	setTimeout("show2()",1000)
}
window.onload=show2
