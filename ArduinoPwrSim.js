
var $j = jQuery.noConflict();

var Vusb	= 0.00;
var Vbarrel = 0.00;
var Vin		= 0.00;
var V3		= 0.00;
var V5		= 0.00;

function calc5V(input) {
	if (input >= 6.5) {
		return input - (input - 5.0);	
	} else {
		return input - 1.7;
	}
}

function calc3V3(input) {
	if (input >= 4.5) {
		return input - (input - 3.3);	
	} else {
		return input - 1.2;
	}
	
}

function calculateNodes(state) {
	switch (state) {
		case 1: // #Vusb changed
			V5 = Vusb;
			V3 = calc3V3(V5);
			
			Vin = 0.00;
			Vbarrel = 0.00;
		break;
			
		case 2:  //#Vbarrel changed
			Vusb = 0.00;
			
			Vin = Vbarrel - 0.7;
			//V5 = Vin - (Vin - 5.0);
			V5 = calc5V(Vin);
			V3 = calc3V3(V5);
		break;
			
		case 3: //#Vin
			Vusb = 0.00;
			
			Vbarrel = Vin;
			//V5 = Vbarrel - (Vbarrel - 5.0);
			V5 = calc5V(Vbarrel);
			V3 = calc3V3(V5);
		break;
		
		case 4: // #3V3
			Vusb = 0.0;
			V5 = 0.0
			Vbarrel = 0.0;
			Vin = 0.0;
		break;
		
		case 5: // #5V0
			Vusb = V5;
			V3 = calc3V3(V5);
			Vbarrel = 0;
			Vin = 0;
		break;
	}	
	displayValues();
}

function displayValues() {
	$j("#Vusb").val(Vusb.toFixed(2));
	$j("#Vbarrel").val(Vbarrel.toFixed(2));
	$j("#Vin").val(Vin.toFixed(2));
	$j("#3V3").val(V3.toFixed(2));
	$j("#5V0").val(V5.toFixed(2));
}

$j(function(){
	// Hook into the input boxes changing.
	
	$j("#Vusb").blur(function() { 
		Vusb = parseFloat($j("#Vusb").val());
		calculateNodes(1);
	});
	
	$j("#Vbarrel").blur(function() { 
		Vbarrel = parseFloat($j("#Vbarrel").val());
		calculateNodes(2);
	});
	
	$j("#Vin").blur(function() { 
		Vin = parseFloat($j("#Vin").val());
		calculateNodes(3);

	});
	
	$j("#3V3").blur(function() { 
		V3 = parseFloat($j("#3V3").val());
	});
	
	$j("#5V0").blur(function() { 
		V5 = parseFloat($j("#5V0").val());
	});
	
});
