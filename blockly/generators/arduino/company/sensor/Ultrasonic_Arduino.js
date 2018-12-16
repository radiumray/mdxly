'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.MDUltrasonic = function() {

	var UltrasonicInclude="";
	UltrasonicInclude+="#include <Microduino_Ultrasonic.h>\n";
	Blockly.Arduino.definitions_['var_UltrasonicInclude'] = UltrasonicInclude;

	var UltrasonicVar='';
	UltrasonicVar+='Ultrasonic ultrasonic(ULTRASONIC_ADDR_1);\n';
	Blockly.Arduino.definitions_['var_UltrasonicVar'] = UltrasonicVar;

	var UltrasonicSetup='';
	UltrasonicSetup+='ultrasonic.begin();\n';
	Blockly.Arduino.setups_['setup_UltrasonicSetup'] = UltrasonicSetup;

  	var code='ultrasonic.requstDistance()';

  	return [code, Blockly.Arduino.ORDER_ATOMIC];

};
