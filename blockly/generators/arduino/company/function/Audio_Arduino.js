'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_Audio_Serial = function() {

  var DEVICE = this.getFieldValue('PIN1');
  var MODE = this.getFieldValue('PIN2');
  var Voice = Blockly.Arduino.valueToCode(this, 'Vol', Blockly.Arduino.ORDER_ATOMIC);

  var defineMDAudio='';
  defineMDAudio+='#include <Microduino_Audio.h>\n';
  defineMDAudio+='//Core UART Port: [SoftSerial] [D2,D3]\n';
  defineMDAudio+='#if defined (__AVR_ATmega168__) || defined (__AVR_ATmega328__) || defined (__AVR_ATmega328P__) || defined(__AVR_ATmega32U4__)\n';
  defineMDAudio+='#include <SoftwareSerial.h>\n';
  defineMDAudio+='SoftwareSerial mySerial(2, 3);\n';
  defineMDAudio+='#define AudioSerial mySerial\n';
  defineMDAudio+='#endif\n';
  defineMDAudio+='\n';
  defineMDAudio+='//Core+ UART Port: [Serial1] [D2,D3]\n';
  defineMDAudio+='#if defined(__AVR_ATmega1284P__) || defined (__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  defineMDAudio+='#define AudioSerial Serial1\n';
  defineMDAudio+='#endif\n';
  defineMDAudio+='\n';
  defineMDAudio+='Audio AUDIO(&AudioSerial);\n';

  Blockly.Arduino.definitions_['define_MDAudio'] = defineMDAudio;

  var AudioInit='AUDIO.begin('+DEVICE+','+MODE+','+Voice+');\n';
  AudioInit+='AUDIO.chooseMusic(1);\n';
  AudioInit+='AUDIO.pauseMusic();\n';

  Blockly.Arduino.setups_['setup_Audio_Init'] = AudioInit;

  var code='';
  return code;
};

Blockly.Arduino.mCookie_Audio_Control = function() {

  var getType = this.getFieldValue('getType');

  var code='AUDIO.'+getType+';\n';

  return code;
};

Blockly.Arduino.mCookie_Audio_Choose = function() {
  var audioNumber = Blockly.Arduino.valueToCode(this, 'audioNumber', Blockly.Arduino.ORDER_ATOMIC);

  var code='';
  code+='AUDIO.chooseMusic('+audioNumber+');\n';

  return code;
};