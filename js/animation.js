
$(function() {
	$("#slider").slider({
		value: 100,
		min: 0,
		max: 100,
		step: 1,
		slide: function(event, ui) {
			$("#amount").val("$" + ui.value);
		}
	});
	$('button.play').button();
	$('button.pause').button();
	$("a", ".demo").click(function() { return false; });

});


var timer,
	years = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2036','2037','2038','2039','2040','2041','2042','2043','2044','2045','2046','2047','2048','2049','2050','2051','2052','2053','2054','2055','2056','2057','2058','2059','2060','2061','2062','2063','2064','2065','2066','2067','2068','2069','2070','2071','2072','2073','2074','2075','2076','2077','2078','2079','2080','2081','2082','2083','2084','2085','2086','2087','2088','2089','2090','2091','2092','2093','2094','2095','2096','2097','2098','2099','2100'];

$('#play').button({
	text: false,
	icons: { primary: "ui-icon-play" }
}).click(function() {

	var val = $('.slider').slider('value'),
		max = $('.slider').slider('option', 'max');

	if (val === max) {
		resetSlider();
		playSlider();
	}

	var options;
	if ($(this).text() === "Play") {
		options = {
			label: "Pause",
			icons: { primary: "ui-icon-pause" }
		};
		playSlider();
	} else {
		options = {
			label: "Play",
			icons: { primary: "ui-icon-play" }
		};
		pauseSlider();
	}
	$(this).button("option", options);
});

$('.slider').slider({
	value: 0,
	min: 0,
	max: 100,
	step: 1,
	slide: function(event, ui) {
		moveAnimation(ui.value);
	},
	change: function(event, ui) {
		moveAnimation(ui.value);
	},
	stop: function(event, ui) {
		pauseSlider();
	}
});

function moveAnimation(frame) {
	var frameWidth = $('.frame').css('width').split('px').join(''),
		newLeft = -(frameWidth * frame),
		year = years[frame];
	
	$('.frames').css('left', newLeft + 'px');
	$('#controls .date').html(year);
}

function playSlider() {
	clearInterval(timer);
	timer = setInterval(function() {
		var val = $('.slider').slider('value'),
			max = $('.slider').slider('option', 'max'),
			newVal = val < max ? val + 1 : 0;
		
		if (newVal === 0) {
			pauseSlider();
		} else {
			$('.slider').slider('value', newVal);
		}

	}, 250);
}

function pauseSlider() {

	clearInterval(timer);
	var frameWidth = $('.frame').css('width').split('px').join(''),
		oldLeft = $('.frames').css('left').split('px').join(''),
		year = years[Math.abs(oldLeft) / frameWidth];
		
	$('#controls .date').html(year);
	
	
	var options = {
			label: "Play",
			icons: { primary: "ui-icon-play" }
		};
	
	$('#play').button("option", options);

}

function resetSlider() {
	clearInterval(timer);
	
	var options = {
			label: "Play",
			icons: { primary: "ui-icon-play" }
		};
	
	$('#play').button("option", options);
	$('.slider').slider('value', 0);
}

