/******
 Arduino Power Simulator.  This code is inteded to help new users understand how
 different power schemes work on an Arduino (Uno).

 Created by:  James C Lewis  (JamesC4S)
 Contact:  james@cmiyc.com
 GTalk:  byerly0503@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

var $j = jQuery.noConflict();

var Vusb	= 0.00;
var Vbarrel = 0.00;
var Vin		= 0.00;
var V3		= 0.00;
var V5		= 0.00;

var VusbCheck = false;
var BarrelCheck = false;
var V3Check = false;
var V5Check = false;
var VinCheck = false;

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
	$j("#V3").val(V3.toFixed(2));
	$j("#V5").val(V5.toFixed(2));
}

function getButtonValues() {
	VusbCheck = $j("#VusbCheck").is(':checked');
	BarrelCheck = $j("#BarrelCheck").is(':checked');
	V3Check = $j("#V3Check").is(':checked');
	V5Check = $j("#V5Check").is(':checked');
	VinCheck = $j("#VinCheck").is(':checked');
	updateSouceButtons();
}

function updateSouceButtons() {
	$j("#VusbCheck").attr('checked', VusbCheck).button("refresh");
	$j("#Vusb").attr('disabled', !VusbCheck);
	
	$j("#BarrelCheck").attr('checked', BarrelCheck).button("refresh");
	$j("#Vbarrel").attr('disabled', !BarrelCheck);
		
	$j("#V3Check").attr('checked', V3Check).button("refresh");
	$j("#V3").attr('disabled', !V3Check);
		
	$j("#V5Check").attr('checked', V5Check).button("refresh");
	$j("#V5").attr('disabled', !V5Check);
		
	$j("#VinCheck").attr('checked', VinCheck).button("refresh");
	$j("#Vin").attr('disabled', !VinCheck);
}

function setAllSources(toggleValue) {
	if (toggleValue == "toggle") {
		VusbCheck = !VusbCheck;
		BarrelCheck = !BarrelCheck;
		V3Check = !V3Check;
		V5Check = !V5Check;
		VinCheck = !VinCheck;
	} else {
		VusbCheck = toggleValue;
		BarrelCheck = toggleValue;
		V3Check = toggleValue;
		V5Check = toggleValue;
		VinCheck = toggleValue;
	}
	updateSouceButtons();
}

$j(function(){
	// Setup UI ELements
	$j("#ResetAll").button().click(function() {
		setAllSources(false);
	});
	
	
	$j( "#VusbCheck" ).button({
            icons: {
                primary: "ui-icon-power"
            },
            text: false
		}).click(function() {
			getButtonValues();
	});
	$j("#BarrelCheck").button({
	            icons: {
	                primary: "ui-icon-power"
	            },
	            text: false
		}).click(function() {
			getButtonValues();
	});
	$j("#V3Check").button({
	            icons: {
	                primary: "ui-icon-power"
	            },
	            text: false
		}).click(function() {
			getButtonValues();
	});
	$j("#V5Check").button({
	            icons: {
	                primary: "ui-icon-power"
	            },
	            text: false
		}).click(function() {
			getButtonValues();
	});
	$j("#VinCheck").button({
	            icons: {
	                primary: "ui-icon-power"
	            },
	            text: false
		}).click(function() {
			getButtonValues();
	});
	
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
	
	$j("#V3").blur(function() { 
		V3 = parseFloat($j("#V3").val());
		calculateNodes(4);
	});
	
	$j("#V5").blur(function() { 
		V5 = parseFloat($j("#V5").val());
		calculateNodes(5);
	});
	
	// Initilize UI controls just the way I like them
	setAllSources(false);
});

