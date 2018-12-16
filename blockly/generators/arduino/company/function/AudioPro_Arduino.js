'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.audioProPrepare = function() {

	var getType = this.getFieldValue('getType');

	var audioProDefine='';
	audioProDefine+='#include <Microduino_AudioPro.h>\n';
	audioProDefine+='AudioPro midiPlayer;\n';
	Blockly.Arduino.definitions_['define_AudioPro'] = audioProDefine;

	var audioProSetup='';
	audioProSetup+='if (!midiPlayer.begin()) {\n';
	audioProSetup+='	while (1);\n';
	audioProSetup+='}\n';
	audioProSetup+='midiPlayer.applyPatch(MIDIPatch, sizeof(MIDIPatch) / sizeof(uint16_t));\n';
	audioProSetup+='midiPlayer.midiSetVolume(0, 127);\n';
	audioProSetup+='midiPlayer.midiSetBank(0, VS1053_BANK_DEFAULT);\n';
	audioProSetup+='midiPlayer.midiSetInstrument(0, VS1053_GM1_ELECTRIC_GRAND_PIANO);\n';

	Blockly.Arduino.setups_['setup_AudioPro'] = audioProSetup;

	var code='';
	return code;
};

Blockly.Arduino.audioProInstrument = function() {
  var getType = this.getFieldValue('getType');
  var code='midiPlayer.midiSetInstrument(0, '+getType+');\n';
  return code;
};

Blockly.Arduino.audioProControl = function() {

	var getType = this.getFieldValue('getType');

	var audioProMelody = Blockly.Arduino.valueToCode(this, 'audioProMelody', Blockly.Arduino.ORDER_ATOMIC);
	var audioProVolume = Blockly.Arduino.valueToCode(this, 'audioProVolume', Blockly.Arduino.ORDER_ATOMIC);
	var audioProDuration = Blockly.Arduino.valueToCode(this, 'audioProDuration', Blockly.Arduino.ORDER_ATOMIC);
	var code='';

	code+=getType+'(0, '+audioProMelody+', '+audioProVolume+');\n';
	code+='delay('+audioProDuration+');\n';

	return code;
};



Blockly.Arduino.audioProSDPrepare = function() {

	var MAXSongNum = Blockly.Arduino.valueToCode(this, 'MAXSongNum', Blockly.Arduino.ORDER_ATOMIC);

	var volume = Blockly.Arduino.valueToCode(this, 'volume', Blockly.Arduino.ORDER_ATOMIC);

	var audioProSDDefine='';
	audioProSDDefine+='#include <Microduino_AudioPro.h>\n';
	audioProSDDefine+='#include <SD.h>\n';
	audioProSDDefine+='AudioPro_FilePlayer musicPlayer =  AudioPro_FilePlayer(SD);\n';
	Blockly.Arduino.definitions_['define_AudioProSD'] = audioProSDDefine;

	var audioProSDFun='';

	// audioProSDFun+='#define MUSIC_MAX '+MAXSongNum+'\n';
	// audioProSDFun+='String FileName[MUSIC_MAX] = {\n';

	// for (var i=0;i<MAXSongNum;i++)
	// {
	// 	audioProSDFun+='"'+i+'.mp3",\n';
	// }
	// audioProSDFun+='};\n';
	audioProSDFun+='uint8_t fileNum = 0;\n';
	audioProSDFun+='void playNum(uint8_t num) {\n';


	// audioProSDFun+='	if (!musicPlayer.paused() || !musicPlayer.stopped()) {\n';
	// audioProSDFun+='		musicPlayer.stopPlaying();\n';
	// audioProSDFun+='	}\n';
	// audioProSDFun+='musicPlayer.playMP3( FileName[num]);\n';
	// audioProSDFun+='}\n';
	// audioProSDFun+='void playSongByName(String songname) {\n';
	// audioProSDFun+='	if (!musicPlayer.paused() || !musicPlayer.stopped()) {\n';
	// audioProSDFun+='		musicPlayer.stopPlaying();\n';
	// audioProSDFun+='	}\n';
	// audioProSDFun+='musicPlayer.playMP3(songname);\n';


	audioProSDFun+='	if (num > musicPlayer.getMusicNum() - 1) {\n';
	audioProSDFun+='		return;\n';
	audioProSDFun+='	}\n';
	audioProSDFun+='	if (!musicPlayer.paused() || !musicPlayer.stopped()) {\n';
	audioProSDFun+='		musicPlayer.stopPlaying();\n';
	audioProSDFun+='	}\n';
	// audioProSDFun+='	musicPlayer.flushCancel(both);\n';
	audioProSDFun+='	String _name = musicPlayer.getMusicName(num);\n';
	audioProSDFun+='	Serial.print(F("Playing:"));\n';
	audioProSDFun+='	if (!musicPlayer.playMP3(_name)) {\n';
	audioProSDFun+='		Serial.println(F("ERROR"));\n';
	audioProSDFun+='	}\n';
	audioProSDFun+='	else {\n';
	audioProSDFun+='		Serial.print(F("OK \t File: "));\n';
	audioProSDFun+='		Serial.println(_name);\n';
	audioProSDFun+='	}\n';

	audioProSDFun+='}\n';
	Blockly.Arduino.definitions_['define_AudioProSDFun'] = audioProSDFun;

	var audioProSDSetup='';
	audioProSDSetup+='pinMode(SD_PIN_SEL, OUTPUT);\n';
	audioProSDSetup+='digitalWrite(SD_PIN_SEL, HIGH);\n';
	audioProSDSetup+='delay(500);\n';
	audioProSDSetup+='if (! musicPlayer.begin()) {\n';
	audioProSDSetup+='	while (1);\n';
	audioProSDSetup+='}\n';
	audioProSDSetup+='if (!SD.begin(SD_PIN_SEL)) {\n';
	audioProSDSetup+='	return;\n';
	audioProSDSetup+='}\n';
	// audioProSDSetup+='musicPlayer.midiSetVolume('+volume+', '+volume+');\n';
	audioProSDSetup+='musicPlayer.setVolume('+volume+');\n';
	// audioProSDSetup+='musicPlayer.useInterrupt(VS1053_PIN_DREQ);\n';

	Blockly.Arduino.setups_['setup_AudioProSD'] = audioProSDSetup;

	var code='';
	code+='\n';
	return code;
};

Blockly.Arduino.audioProSDControl = function() {
	var getType = this.getFieldValue('getType');
	var code='';
		code+='musicPlayer.'+getType+'();\n';
	return code;
};


Blockly.Arduino.audioProSDControlSetBool = function() {
	var setMode = this.getFieldValue('setMode');
	var trueFalse = this.getFieldValue('trueFalse');
	var code = '';
	code +='musicPlayer.'+setMode+'('+trueFalse+');\n';
	return code;
};


Blockly.Arduino.audioProSDPlayByName = function() {
 var songName = Blockly.Arduino.valueToCode(this, 'songName', Blockly.Arduino.ORDER_ATOMIC);
	var code='';
	code+='musicPlayer.playMP3('+songName+');\n';
	return code;
};

Blockly.Arduino.audioProSDPlayByNum = function() {
 var songNum = Blockly.Arduino.valueToCode(this, 'songNum', Blockly.Arduino.ORDER_ATOMIC);
	var code='';
	code+='playNum('+songNum+');\n';
	return code;
};

Blockly.Arduino.audioProSDGetState = function() {
  var getType = this.getFieldValue('getType');
  var code='musicPlayer.'+getType+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};


Blockly.Arduino.audioProSDControlPNum = function() {
	var getType = this.getFieldValue('getType');
	var controlNum = Blockly.Arduino.valueToCode(this, 'controlNum', Blockly.Arduino.ORDER_ATOMIC);
	var code='';
		code+='musicPlayer.'+getType+'('+controlNum+');\n';
	return code;
};