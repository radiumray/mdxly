'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.lm75 = function() {


	var lm75Include="#include <Microduino_Tem_Hum.h>\n";
	lm75Include+="Tem_D1  termo;\n";
	Blockly.Arduino.definitions_['var_lm75Include'] = lm75Include;
	Blockly.Arduino.setups_['var_lm75Setup'] = "termo.begin();\n";

	var code="termo.getTemperature()";
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};
