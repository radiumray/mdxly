'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



// Blockly.Arduino.mCookie_18B20 = function() {

// 	var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);


//   var 18b20Include="#include <OneWire.h>\n";
//   Blockly.Arduino.definitions_['var_18b20Include'] = 18b20Include;

//   Blockly.Arduino.definitions_['var_18b20defineVar'] = "OneWire  ds("+digitalPin+");\n";

//   var code="termo.getTemp()";
//   return [code, Blockly.Arduino.ORDER_ATOMIC];
// };



Blockly.Arduino.mCookie_18B20 = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var unit = this.getFieldValue('UNIT');
    Blockly.Arduino.definitions_['define_OneWire'] = '#include <OneWire.h>';
    Blockly.Arduino.definitions_['define_DallasTemperature'] = '#include <DallasTemperature.h>';
    Blockly.Arduino.definitions_['var_OneWire_oneWire_' + dropdown_pin] = 'OneWire oneWire_' + dropdown_pin + '(' + dropdown_pin + ');';
    Blockly.Arduino.definitions_['var_DallasTemperature_sensors_' + dropdown_pin] = 'DallasTemperature sensors_' + dropdown_pin + '(&oneWire_' + dropdown_pin + ');';
    Blockly.Arduino.definitions_['var_DeviceAddress_insideThermometer'] = 'DeviceAddress insideThermometer;';
    Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_getAddress'] = 'sensors_' + dropdown_pin + '.getAddress(insideThermometer, 0);';
    Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_setResolution'] = 'sensors_' + dropdown_pin + '.setResolution(insideThermometer, 9);';
    var funcName = 'ds18b20_' + dropdown_pin + '_getTemp';
    var code = 'float' + ' ' + funcName + '(int w) {\n'
	+ '  sensors_' + dropdown_pin + '.requestTemperatures();\n'
	+ '  if(w==0) {return sensors_' + dropdown_pin + '.getTempC(insideThermometer);}\n'
	+ '  else {return sensors_' + dropdown_pin + '.getTempF(insideThermometer);}\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return ['ds18b20_' + dropdown_pin + '_getTemp(' + unit + ')', Blockly.Arduino.ORDER_ATOMIC];
}