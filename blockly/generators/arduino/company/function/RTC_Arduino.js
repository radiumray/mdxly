'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.mCookie_RTC_time = function() {

  var rtcDefineInit='';
  rtcDefineInit+='#include <Microduino_RTC.h>\n';
  rtcDefineInit+='RTC rtc;\n';
  rtcDefineInit+='DateTime dateTime;\n';
  Blockly.Arduino.definitions_['define_RTC_Init'] = rtcDefineInit;

  var rtcBegin='';
  rtcBegin+='rtc.begin();\n';
  Blockly.Arduino.setups_['setup_RTC_time_begin'] = rtcBegin;

  var code='';
  // code+='rtc.formatTime();\n';
  // code+='rtc.formatDate();\n';
  code+='rtc.getDateTime(&dateTime);\n';

  return code;
};




Blockly.Arduino.mCookie_RTC_set = function() {
	var Year = Blockly.Arduino.valueToCode(this, 'Year', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Mouth = Blockly.Arduino.valueToCode(this, 'Mouth', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Day = Blockly.Arduino.valueToCode(this, 'Day', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Week = Blockly.Arduino.valueToCode(this, 'Week', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Hour = Blockly.Arduino.valueToCode(this, 'Hour', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Minute = Blockly.Arduino.valueToCode(this, 'Minute', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Second = Blockly.Arduino.valueToCode(this, 'Second', Blockly.Arduino.ORDER_ATOMIC) || '0';



  var rtcDefineInit='';
  rtcDefineInit+='#include <Microduino_RTC.h>\n';
  rtcDefineInit+='RTC rtc;\n';
  rtcDefineInit+='DateTime dateTime;\n';
  Blockly.Arduino.definitions_['define_RTC_Init'] = rtcDefineInit;

  var rtcBegin='';
  rtcBegin+='rtc.begin();\n';
  Blockly.Arduino.setups_['setup_RTC_time_begin'] = rtcBegin;


  var rtcSetup='';
  rtcSetup+='dateTime = {'+Year+', '+Mouth+', '+Week+', '+Day+', '+Hour+', '+Minute+', '+Second+'};\n';
  rtcSetup+='rtc.clearAll();\n';
  rtcSetup+='rtc.setDateTime(dateTime);\n';

  Blockly.Arduino.setups_['setup_RTC_time'] = rtcSetup;


  var code='';
  // code+='rtc.formatTime();\n';
  // code+='rtc.formatDate();\n';
  // code+='dateTime = rtc.getDateTime();\n';

  return code;
};




Blockly.Arduino.mCookie_RTC_date = function() {

  var code='rtc.formatDate()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| 'String(\"\")';
};



Blockly.Arduino.mCookie_RTC_Week = function() {
  var code='rtc.getWeekday()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Hour = function() {
  var code='rtc.getHour()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Minute = function() {
  var code='rtc.getMinute()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Second = function() {
  var code='rtc.getSecond()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};


Blockly.Arduino.mCookie_RTC_Output = function() {

  var getType = this.getFieldValue('getType');
  var code='dateTime.'+getType;
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};