'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');




Blockly.Arduino.NumberTubePre = function() {

  var indexNum = Blockly.Arduino.valueToCode(this, 'indexNum', Blockly.Arduino.ORDER_ATOMIC);
  var upsideDown = this.getFieldValue('upsideDown');

  var NumberTubeInclude="";
  NumberTubeInclude+="#include <Microduino_Number.h>\n";
  NumberTubeInclude+="#include <SoftwareSerial.h>\n";

  NumberTubeInclude+='#define NumberSerial mySerialS\n';
  Blockly.Arduino.definitions_['var_NumberTubeInclude'] = NumberTubeInclude;

  var ss = this.getFieldValue('ss');

  var NumberTubeVar='';
  NumberTubeVar+='//Core UART Port: [SoftSerial] [D2,D3]\n';
  NumberTubeVar+='#if defined (__AVR_ATmega168__) || defined (__AVR_ATmega328__) || defined (__AVR_ATmega328P__)\n';
  

  if(ss==2) {
    NumberTubeVar+='SoftwareSerial mySerialS(2, 3);\n';
  } else if(ss==4) {
    NumberTubeVar+='SoftwareSerial mySerialS(4, 5);\n';
  } else if(ss==6) {
    NumberTubeVar+='SoftwareSerial mySerialS(6, 7);\n';
  } else if(ss==8) {
    NumberTubeVar+='SoftwareSerial mySerialS(8, 9);\n';
  } else if(ss==10) {
    NumberTubeVar+='SoftwareSerial mySerialS(10, 11);\n';
  } else if(ss=1) {
    NumberTubeVar+='SoftwareSerial mySerialS(-1, 9);\n';
  }


  // NumberTubeVar+='SoftwareSerial mySerialS(2, 3);\n';
  // NumberTubeVar+='#define NumberSerial mySerialS\n';
  NumberTubeVar+='#endif\n';
  NumberTubeVar+='//Core+ UART Port: [Serial1] [D2,D3]\n';
  NumberTubeVar+='#if defined(__AVR_ATmega1284P__) || defined (__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  



  if(ss==2) {
    NumberTubeVar+='#define NumberSerial Serial1\n';
  } else if(ss==4) {
    NumberTubeVar+='SoftwareSerial mySerialS(4, 5);\n';
  } else if(ss==6) {
    NumberTubeVar+='SoftwareSerial mySerialS(6, 7);\n';
  } else if(ss==8) {
    NumberTubeVar+='SoftwareSerial mySerialS(8, 9);\n';
  } else if(ss==10) {
    NumberTubeVar+='SoftwareSerial mySerialS(10, 11);\n';
  } else if(ss=1) {
    NumberTubeVar+='SoftwareSerial mySerialS(-1, 9);\n';
  }



  // NumberTubeVar+='#define NumberSerial Serial1\n';
  NumberTubeVar+='#endif\n';
  NumberTubeVar+='\n';
  NumberTubeVar+='Number LED('+indexNum+', &NumberSerial);\n';
  Blockly.Arduino.definitions_['var_NumberTubeVar'] = NumberTubeVar;

  var NumberTubeSetup='';
  NumberTubeSetup+='LED.begin();\n';
  NumberTubeSetup+='LED.direction('+upsideDown+');\n';
  Blockly.Arduino.setups_['setup_NumberTubeSetup'] = NumberTubeSetup;


  var code='';

  return code;

};



Blockly.Arduino.NumberTubeSet = function() {

var index = Blockly.Arduino.valueToCode(this, 'index', Blockly.Arduino.ORDER_ATOMIC);
var number = Blockly.Arduino.valueToCode(this, 'number', Blockly.Arduino.ORDER_ATOMIC);
var light = Blockly.Arduino.valueToCode(this, 'light', Blockly.Arduino.ORDER_ATOMIC);
var pointHas = this.getFieldValue('pointHas');

  var code='';
  code+='LED.setNumber('+index+', '+number+', '+light+');\n';
  code+='LED.setPoint('+index+', '+pointHas+');\n';
  // code+='LED.show();\n';
  return code;

};


Blockly.Arduino.NumberTubeShow = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var code='';
  code+=branch;
  code+='LED.show();\n';
  code+='delay(30);\n';
  return code;
};




Blockly.Arduino.NumberTubeArray = function() {

var number = Blockly.Arduino.valueToCode(this, 'number', Blockly.Arduino.ORDER_ATOMIC);
var light = Blockly.Arduino.valueToCode(this, 'light', Blockly.Arduino.ORDER_ATOMIC);

  var code='';
  code+='LED.setScreen('+number+', '+light+');\n';
  return code;

};
