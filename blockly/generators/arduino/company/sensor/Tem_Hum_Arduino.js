'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_AM2321 = function() {
var Tem_Hum = this.getFieldValue('direction');


var am2321Def='#include <Microduino_Tem_Hum.h>\n';
am2321Def+='Tem_Hum  temHum;\n';
Blockly.Arduino.definitions_['def_AM2321'] = am2321Def;
Blockly.Arduino.setups_['setup_AM2321'] = 'temHum.begin();\n';

var code='';
	if(Tem_Hum=='1') {
		code+='temHum.getTemperature()';
	}else if(Tem_Hum=='2') {
		code+='temHum.getHumidity()';
	}
 return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};




Blockly.Arduino.mCookie_SHT2 = function() {
var Tem_Hum = this.getFieldValue('direction');

var defSHT2x='#include <Microduino_Tem_Hum.h>\n';
defSHT2x+='Tem_Hum_S2  temHum2X;\n';
Blockly.Arduino.definitions_['def_SHT2x'] = defSHT2x;


Blockly.Arduino.setups_['setup_sht2x'] = 'temHum2X.begin();\n';

 var code='';
 if(Tem_Hum=='1') {
 	code+='temHum2X.getTemperature()';
 } else if(Tem_Hum=='2') {
 	code+='temHum2X.getHumidity()';
 } 

 return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};