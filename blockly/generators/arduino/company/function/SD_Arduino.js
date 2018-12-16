'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.SD_Write = function() {
  var File_Name = Blockly.Arduino.valueToCode(this, 'File_Name', Blockly.Arduino.ORDER_ATOMIC);
  var Content = Blockly.Arduino.valueToCode(this, 'Content', Blockly.Arduino.ORDER_ATOMIC);

  var MDSDInclude='';
  MDSDInclude+='#include <SPI.h>\n';
  MDSDInclude+='#include <SD.h>\n';
  Blockly.Arduino.definitions_['define_MDSDInclude'] = MDSDInclude;

  var MDSDVar='';
  MDSDVar+='File myFile;\n';
  MDSDVar+='String contentString;\n';
  Blockly.Arduino.definitions_['define_MDSDVar'] = MDSDVar;
  
  var MDSDSteup='';
  MDSDSteup+='SD.begin(7);\n';
  Blockly.Arduino.setups_['setup_MDSDInit'] = MDSDSteup;

  var code='';
  code+='myFile = SD.open('+File_Name+', FILE_WRITE);\n';
  code+='if (myFile) {\n';
  code+='  myFile.println('+Content+');\n';
  code+='  myFile.close();\n';
  code+='}\n';
  return code;
};

Blockly.Arduino.SD_Read = function() {
  var File_Name = Blockly.Arduino.valueToCode(this, 'File_Name', Blockly.Arduino.ORDER_ATOMIC);

  var MDSDInclude='';
  MDSDInclude+='#include <SPI.h>\n';
  MDSDInclude+='#include <SD.h>\n';
  Blockly.Arduino.definitions_['define_MDSDInclude'] = MDSDInclude;

  var MDSDVar='';
  MDSDVar+='File myFile;\n';
  MDSDVar+='String contentString;\n';
  Blockly.Arduino.definitions_['define_MDSDVar'] = MDSDVar;
  
  var MDSDSteup='';
  MDSDSteup+='SD.begin(7);\n';
  Blockly.Arduino.setups_['setup_MDSDInit'] = MDSDSteup;

  var code='myFile = myFile = SD.open('+File_Name+');\n';
  code+='if (myFile) {\n';
  code+='contentString="";\n';
  code+=' while (myFile.available()) {\n';
  code+='   contentString+=char(myFile.read());\n';
  code+=' }\n';
  code+='}\n';

  // return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.SD_ReadString = function() {

  var code='contentString';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
