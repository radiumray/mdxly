'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.ColorDetPrepare_TCS3414 = function() {

  var TCS3414Include="#include <Microduino_ColorDetector.h>\n";
  TCS3414Include+="#define colorSUM 3\n";
  Blockly.Arduino.definitions_['var_TCS3414Include'] = TCS3414Include;

  var TCS3414Var='';
  TCS3414Var+='uint8_t redColor,greenColor,blueColor;\n';
  TCS3414Var+='uint16_t red,green,blue,clr;\n';
  TCS3414Var+='ColorDetector colorSensor;\n';

  Blockly.Arduino.definitions_['var_TCS3414defineVar'] = TCS3414Var;

  var TCS3414Init='';
  TCS3414Init+='colorSensor.begin();\n';
  Blockly.Arduino.setups_['setup_TCS3414Init'] = TCS3414Init;
  var code='';
  code+='colorSensor.getRGB(&red, &green, &blue, &clr);\n';
  code+='redColor = map(red, 0, clr * colorSUM, 0, 255);\n';
  code+='greenColor = map(green, 0, clr * colorSUM, 0, 255);\n';
  code+='blueColor = map(blue, 0, clr * colorSUM, 0, 255);\n';
  return code;
};


Blockly.Arduino.ColorGet_TCS3414 = function() {
  var getType = this.getFieldValue('getType');
  var code=getType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};