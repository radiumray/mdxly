'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.WiFiBlynk = function() {
  var SSID = this.getFieldValue('SSID');
  var WiFiPASS = this.getFieldValue('WiFiPASS');
  var authToken = this.getFieldValue('authToken');

  //var branch = Blockly.Arduino.statementToCode(this, 'WiFiInput');

  // var WiFiDefine='#define BLYNK_PRINT Serial\n';
  // WiFiDefine+='#include <ESP8266_HardSer.h>\n';
  // WiFiDefine+='#include <BlynkSimpleShieldEsp8266_HardSer.h>\n';
  
  // WiFiDefine+='#define EspSerial Serial1\n';
  // WiFiDefine+='ESP8266 wifi(EspSerial);\n';
  // WiFiDefine+='char auth[] = "'+authToken+'";\n';
  // WiFiDefine+='\n';
  // WiFiDefine+='\n';

    /*********************test******************************/
  var  WiFiDefine='#include <ESP8266_Lib.h>\n';
  WiFiDefine+='#include <BlynkSimpleShieldEsp8266.h>\n';
  WiFiDefine+='#if defined(__AVR_ATmega32U4__)\n';
  WiFiDefine+='#define BLYNK_PRINT Serial\n';
  WiFiDefine+='#define EspSerial Serial1\n';
  WiFiDefine+='#else if defined(__AVR_ATmega328P__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  WiFiDefine+='#include <SoftwareSerial.h>\n';
  WiFiDefine+='SoftwareSerial mySerial(2, 3); // RX, TX\n';
  WiFiDefine+='#define BLYNK_PRINT mySerial\n';
  WiFiDefine+='#define EspSerial Serial\n';
  WiFiDefine+='#endif\n';
  WiFiDefine+='ESP8266 wifi(&EspSerial);\n';
  WiFiDefine+='char auth[] = "'+authToken+'";\n';
  WiFiDefine+='\n';
  WiFiDefine+='\n';
  /*********************test^*****************************/

  Blockly.Arduino.definitions_['var_WiFiBlynkDefine'] = WiFiDefine;

  var WiFiInit='EspSerial.begin(115200);\n';
  WiFiInit+='delay(10);\n';
  WiFiInit+='Blynk.begin(auth, wifi, "'+SSID+'", "'+WiFiPASS+'");\n';
  Blockly.Arduino.setups_['setup_WiFiBlynkInit'] = WiFiInit;


  var code='Blynk.run();\n';
  code+='\n';
  //code+=branch;
  code+='\n';
  
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.BLYNK_READ = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  var blynkReadInput = Blockly.Arduino.valueToCode(this, 'blynkReadInput', Blockly.Arduino.ORDER_ATOMIC)
  var BlynkRead='';
  BlynkRead+='BLYNK_READ('+virtualPort+') {\n';
  BlynkRead+='\n';
  BlynkRead+='  Blynk.virtualWrite('+virtualPort+', '+blynkReadInput+');\n';
  BlynkRead+='}\n';
  Blockly.Arduino.definitions_['var_BlynkRead'+virtualPort] = BlynkRead;
  var code='';
  return code;
};

Blockly.Arduino.BLYNK_WRITE = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  //var blynkReadInput = Blockly.Arduino.valueToCode(this, 'blynkReadInput', Blockly.Arduino.ORDER_ATOMIC)
  var branch = Blockly.Arduino.statementToCode(this, 'blynkWriteInput');

  var BlynkWrite='';
  BlynkWrite+='BLYNK_WRITE('+virtualPort+') {\n';
  BlynkWrite+=branch;
  BlynkWrite+='\n';
  BlynkWrite+='}\n';
  Blockly.Arduino.definitions_['var_BlynkWrite'+virtualPort] = BlynkWrite;
  var code='';
  return code;
};

Blockly.Arduino.BLYNKParamOne = function() {
  var paramType = this.getFieldValue('paramType');
  var code='';
  code+='param.'+paramType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.BLYNKParamArray = function() {
  var paramNum = Blockly.Arduino.valueToCode(this, 'paramNum', Blockly.Arduino.ORDER_ATOMIC)
  var paramType = this.getFieldValue('paramType');
  var code='';
  code+='param['+paramNum+'].'+paramType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.WiFiBlynkTimer = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'blynkTimerDoing');
  Blockly.Arduino.definitions_['BlynkTimerInclude'] = '#include <SimpleTimer.h>';
  var timerName = this.getFieldValue('timerName');
  var duration = this.getFieldValue('duration');
  
  Blockly.Arduino.definitions_['BlynkTimerDefine'+timerName] = 'SimpleTimer '+timerName+'Timer;';

  Blockly.Arduino.setups_['setup_BlynkTimer'+timerName+'Timer'] = timerName+'Timer.setInterval('+duration+'L, Sender'+timerName+');';

  var timerFun='';
  timerFun+='void Sender'+timerName+'() {\n';
  timerFun+=branch;
  timerFun+='}\n';

  Blockly.Arduino.definitions_['BlynkTimerFunction'+timerName] = timerFun;


  var code='';
  code+=timerName+'Timer.run();\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.WiFiBlynkVirtualWrite = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  var senderDataToBlynk = Blockly.Arduino.valueToCode(this, 'senderDataToBlynk', Blockly.Arduino.ORDER_ATOMIC)

  var code='';
  code+='Blynk.virtualWrite('+virtualPort+', '+senderDataToBlynk+');\n';
  return code;
};


Blockly.Arduino.WiFimCottonATPre = function() {
  // var SSID = this.getFieldValue('SSID');
  // var WiFiPASS = this.getFieldValue('WiFiPASS');
  // var authToken = this.getFieldValue('authToken');

  var  WiFiATDefine='#include <ESP8266.h>\n';
  WiFiATDefine+='#include <ArduinoJson.h>\n';
  WiFiATDefine+='//CoreUSB UART Port: [Serial1] [D0,D1]\n';
  WiFiATDefine+='//Core+ UART Port: [Serial1] [D2,D3]\n';
  WiFiATDefine+='#if defined(__AVR_ATmega32U4__) || defined(__AVR_ATmega1284P__) || defined (__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  WiFiATDefine+='#define EspSerial Serial1\n';
  WiFiATDefine+='#define UARTSPEED  115200\n';
  WiFiATDefine+='#endif\n';
  WiFiATDefine+='//Core UART Port: [SoftSerial] [D2,D3]\n';
  WiFiATDefine+='#if defined (__AVR_ATmega168__) || defined (__AVR_ATmega328__) || defined (__AVR_ATmega328P__)\n';
  WiFiATDefine+='#include <SoftwareSerial.h>\n';
  WiFiATDefine+='SoftwareSerial mySerial(2, 3);\n';
  
  WiFiATDefine+='#define EspSerial mySerial\n';
  WiFiATDefine+='#define UARTSPEED  19200\n';
  WiFiATDefine+='#endif\n';
  WiFiATDefine+='ESP8266 wifi(&EspSerial);\n';

  Blockly.Arduino.definitions_['var_WiFiATDefine'] = WiFiATDefine;

  var WiFiATInit='delay(100);\n';
  WiFiATInit+='WifiInit(EspSerial, UARTSPEED);\n';
  WiFiATInit+='wifi.restore();\n';
  WiFiATInit+='delay(2000);\n';
  Blockly.Arduino.setups_['setup_WiFiATInit'] = WiFiATInit;


  var code='';
  // code+='\n';
  // //code+=branch;
  // code+='\n';
  
  return code;
};



Blockly.Arduino.WiFiATOneTime = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'ATExecuted');
  var oneTime = '';
  oneTime+='bool ATOneTime=false;\n';
  Blockly.Arduino.definitions_['ATOneTime'] = oneTime; 

  var code = '';
  code+='if(!ATOneTime) {\n';
  code+=branch;
  code+='ATOneTime=true;\n';
  code+='}\n';

  return code;
};


Blockly.Arduino.WiFimCottonMqttConnect = function() {
  var SSID = this.getFieldValue('SSID');
  var WiFiPASS = this.getFieldValue('WiFiPASS');
  var userID = this.getFieldValue('userID');
  var userToken = this.getFieldValue('userToken');

  // var WiFimCottonInit='Serial.begin(9600);\n';
  // Blockly.Arduino.setups_['setup_WiFiBlynkInit'] = WiFimCottonInit;


  var code='\n';
  code+=' Serial.println(wifi.getVersion().c_str());\n';
  code+=' Serial.println(wifi.setOprToStation());\n';
  code+=' Serial.print("joinAP:");\n';
  code+=' Serial.println(wifi.joinAP("'+SSID+'","'+WiFiPASS+'"));\n';
  code+=' Serial.print("mqttSetServer:");\n';
  code+=' Serial.println(wifi.mqttSetServer("mCotton.microduino.cn",1883));\n';
  code+=' Serial.print("mqttConnect:");\n';
  code+=' Serial.println(wifi.mqttConnect("'+userID+'","'+userID+'","'+userToken+'"));\n';
  code+=' Serial.print("mqttSetDiveceIDToken:");\n';
  code+=' Serial.println(wifi.mqttSetDiveceIDToken("'+userID+'","'+userToken+'"));\n';
  code+=' Serial.print("ca:");\n';
  code+=' Serial.println(wifi.mqttSetSubscrib("ca/'+userID+'"));\n';
  code+=' Serial.print("cp:");\n';
  code+=' Serial.println(wifi.mqttSetSubscrib("cp/'+userID+'"));\n';
  code+='\n';
  
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.WiFimCottonATBoolP0 = function() {
  var controlTpye = this.getFieldValue('controlTpye');
  var code = '';
  code +='wifi.'+controlTpye+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.WiFimCottonATStringP0 = function() {
  var returnString = this.getFieldValue('returnString');
  var code = '';
  code +='wifi.'+returnString+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.WiFimCottonATBoolPBool = function() {
  var setMode = this.getFieldValue('setMode');
  var trueFalse = this.getFieldValue('trueFalse');
  var code = '';
  code +='wifi.'+setMode+'('+trueFalse+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.WiFimCottonATBoolPInput = function() {
  var input = this.getFieldValue('input');
  var setMode = this.getFieldValue('setMode');
  var code='wifi.'+setMode+'('+input+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.WiFimCottonATBoolPString = function() {
  var StringInput = Blockly.Arduino.valueToCode(this, 'StringInput', Blockly.Arduino.ORDER_ATOMIC);
  var setMode = this.getFieldValue('setMode');
  var code='wifi.'+setMode+'('+StringInput+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};



Blockly.Arduino.WiFimCottonJsonPrase = function() {
  var input = this.getFieldValue('input');
  var StringInput = Blockly.Arduino.valueToCode(this, 'StringInput', Blockly.Arduino.ORDER_ATOMIC);


  var jsonPrase='';
  jsonPrase+='String solution(String _sta, char *c)\n';
  jsonPrase+='{\n';
  jsonPrase+='  String data;\n';
  jsonPrase+='  _sta.trim();\n';
  jsonPrase+='  if (_sta.startsWith("{") && _sta.endsWith("}"))\n';
  jsonPrase+='  {\n';
  jsonPrase+='    _sta = _sta.substring(1, _sta.length() - 1);\n';
  jsonPrase+='    _sta.replace("\\\"", "");\n';
  jsonPrase+='    uint8_t _length = _sta.length();\n';
  jsonPrase+='    char buf[_length];\n';
  jsonPrase+='    char c_all[30] = "";\n';
  jsonPrase+='    char data1[] = ":%s";\n';
  jsonPrase+='    strcat(c_all, c);\n';
  jsonPrase+='    strcat(c_all, data1);\n';
  jsonPrase+='    sscanf(_sta.c_str(), c_all, &buf);\n';
  jsonPrase+='    data = String(buf);\n';
  jsonPrase+='  }\n';
  jsonPrase+='  if (data != NULL)\n';
  jsonPrase+='    return data;\n';
  jsonPrase+='}\n';

  Blockly.Arduino.definitions_['var_WiFiATJsonPrase'] = jsonPrase;

  var code='solution('+StringInput+', '+input+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.WiFimCottonJsonPraseAI = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'jsonPrase');
  var input = this.getFieldValue('input');

  var wifiAIDefine='';
  wifiAIDefine+='const static uint16_t buffSize = '+input+';\n';
  wifiAIDefine+='uint16_t index = 0;\n';
  wifiAIDefine+='char jsonAI[buffSize] = { 0x00 };\n';
  wifiAIDefine+="const static char endFlag='\\n';\n";
  wifiAIDefine+='\n';

  wifiAIDefine+='void praseDoing() {\n';
  wifiAIDefine+='  StaticJsonBuffer<buffSize> jsonBuffer;\n';
  wifiAIDefine+=branch;
  wifiAIDefine+='}\n';

  Blockly.Arduino.definitions_['var_WiFiAIDefine'] = wifiAIDefine;

  var code='';
  code+='if (wifi.getUart()->available() > 0) {\n';
  code+='  char c = wifi.getUart()->read();\n';
  code+='  if (index == 0) { //clear\n';
  code+='    for (uint16_t i = 0; i < buffSize; i++) {\n';
  code+='      jsonAI[i] = 0x00;\n';
  code+='    }\n';
  code+='  }\n';
  code+='  if (c != endFlag) {\n';
  code+='    jsonAI[index] = c;\n';
  code+='    index++;\n';
  code+='  } else {\n';
  code+='    index = 0;\n';
  code+='    if(jsonAI[0]==0x7B) {\n';
  code+='      praseDoing();\n';
  code+='    } else {\n';
  code+='      Serial.println(jsonAI);\n';
  code+='    }\n';
  code+='  }\n';
  code+='}\n';
  return code;
};


Blockly.Arduino.WiFiJsonObject = function() {
  var addInput = Blockly.Arduino.valueToCode(this, 'addInput', Blockly.Arduino.ORDER_ATOMIC) || '';
  var jsonName=this.getFieldValue('jsonName');
  var code = '';
  code+='JsonObject& '+jsonName+'=';
  if(addInput!='') {
    code+=addInput+';\n';
  }
  return code;
};


Blockly.Arduino.WiFiJsonPraseObject = function() {
  var code = '';
  code+='jsonBuffer.parseObject(jsonAI)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.JsonObjectVerify = function() {
  var jsonName=this.getFieldValue('jsonName');
  var code = '';
  code+=jsonName+'.success()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.JsonObjectPraseItem = function() {
  var jsonObj=this.getFieldValue('jsonObj');
  var item=this.getFieldValue('item');
  var code = '';
  code+=jsonObj+'["'+item+'"]';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.JsonObjectPraseItemArray = function() {
  var jsonObj=this.getFieldValue('jsonObj');
  var item=this.getFieldValue('item');
  var numInput = Blockly.Arduino.valueToCode(this, 'numInput', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  code+=jsonObj+'["'+item+'"]['+numInput+']';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.WiFimCottonATBoolP2Input = function() {
  var input1 = this.getFieldValue('input1');
  var input2 = this.getFieldValue('input2');
  var setMode = this.getFieldValue('setMode');
  var code='wifi.'+setMode+'('+input1+','+input2+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.WiFiTCPSend = function() {
  var StringInput = Blockly.Arduino.valueToCode(this, 'StringInput', Blockly.Arduino.ORDER_ATOMIC);
  var code='';
  code+='const char *postArray = '+StringInput+'.c_str();\n';
  code+='wifi.send((const uint8_t*)postArray, strlen(postArray));\n';
  code+='postArray=NULL;\n';
  return code;
};


Blockly.Arduino.WiFiMqttJsonBuilderS = function() {


  var jsonPrase='';
  jsonPrase+='String uploadData(String _st, String _data) {\n';
  jsonPrase+='  String send_data = "";\n';
  jsonPrase+='  send_data = "{\\"";\n';
  jsonPrase+='  send_data += _st;\n';
  jsonPrase+='  send_data += "\\":\\"";\n';
  jsonPrase+='  send_data += _data;\n';
  jsonPrase+='  send_data += "\\"}";\n';
  jsonPrase+='  return send_data;\n';
  jsonPrase+='}\n';

Blockly.Arduino.definitions_['var_WiFiATJsonUPS'] = jsonPrase;


  var input = this.getFieldValue('input');
  var StringInput = Blockly.Arduino.valueToCode(this, 'StringInput', Blockly.Arduino.ORDER_ATOMIC);
  var code='uploadData('+input+', '+StringInput+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.WiFiMqttJsonBuilderI = function() {

  var jsonPrase='';
  jsonPrase+='String uploadData(char* _st, int _data) {\n';
  jsonPrase+='  String send_data = "";\n';
  jsonPrase+='  send_data = "{\\"";\n';
  jsonPrase+='  send_data += _st;\n';
  jsonPrase+='  send_data += "\\":\\"";\n';
  jsonPrase+='  send_data += _data;\n';
  jsonPrase+='  send_data += "\\"}";\n';
  jsonPrase+='  return send_data;\n';
  jsonPrase+='}\n';

  Blockly.Arduino.definitions_['var_WiFiATJsonUPI'] = jsonPrase;

  var input = this.getFieldValue('input');
  var numInput = Blockly.Arduino.valueToCode(this, 'numInput', Blockly.Arduino.ORDER_ATOMIC);
  var code='uploadData('+input+', '+numInput+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.WiFiMqttPublish = function() {
  var input = this.getFieldValue('input');
  var StringInput = Blockly.Arduino.valueToCode(this, 'StringInput', Blockly.Arduino.ORDER_ATOMIC);
  var code='wifi.mqttPublish('+input+', '+StringInput+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};




Blockly.Arduino.WiFimCottonATMqttConnect = function() {
  var ID = this.getFieldValue('ID');
  var user = this.getFieldValue('user');
  var pass = this.getFieldValue('pass');
  var code='wifi.mqttConnect('+ID+','+user+','+pass+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.WiFimCottonSetstate = function() {
  var trueFalse = this.getFieldValue('trueFalse');
  var setMode = this.getFieldValue('setMode');
  var code = '';
  code +='wifi.'+setMode+'('+trueFalse+');\n';
  return code;
};

Blockly.Arduino.WiFiATGetOprMode = function() {
  var code = '';
  code +='wifi.getOprMode()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};