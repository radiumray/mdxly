'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.nRF_Init = function() {
  var Channel = this.getFieldValue('CHANNEL');
  // var Interval = this.getFieldValue('INTERVAL');
  var This_node = this.getFieldValue('BDNODE');
  var nRFBeginDefine='';
  nRFBeginDefine+='#include <RF24Network.h>\n';;
  nRFBeginDefine+='RF24 radio(9,10);\n';
  nRFBeginDefine+='RF24Network network(radio);\n';
  // nRFBeginDefine+='const unsigned long interval = '+Interval+';\n';
  // nRFBeginDefine+='unsigned long last_sent;\n';
  nRFBeginDefine+='\n';

  Blockly.Arduino.definitions_['define_nRFBeginDefine'] = nRFBeginDefine;

  var nRFSetup='';
  nRFSetup+='radio.begin();\n';
  nRFSetup+='network.begin(/*channel*/ '+Channel+', /*node address*/ '+This_node+');\n';
  Blockly.Arduino.setups_['setup_nRFSetup'] = nRFSetup;
  var code = '';
  return code;
};

Blockly.Arduino.nRF_Send = function() {
  var Other_node = this.getFieldValue('TONODE');
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  //var other_node = this.getFieldValue('NODE');


  // var nRFSender='';
  // nRFSender+='const uint16_t this_node = 1;\n';
  // nRFSender+='const uint16_t other_node = 0;\n';
  // Blockly.Arduino.definitions_['define_nRFSender'] = nRFSender;

  var code='network.update();';
  // code+='unsigned long now = millis();\n';
  // code+='if ( now - last_sent >= interval  ) {\n';
  // code+='last_sent = now;\n';
  code+=branch;
  code+='RF24NetworkHeader header(/*to node*/ '+Other_node+');\n';
  code+='bool sendok = network.write(header,&payload,sizeof(payload));\n';
  code+=' if (!sendok)  Serial.println("tingche send failed."); \n';
  //code+='}\n';

  return code;
};


Blockly.Arduino.nRF_SendState = function() {

  var code = 'sendok';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  //return code;
};


Blockly.Arduino.nRF_Read = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');


  var nRFReciver='';
  //nRFReciver+='const uint16_t this_node = 0;\n';
  //nRFReciver+='const uint16_t other_node = 1;\n';
  Blockly.Arduino.definitions_['define_nRFReciver'] = nRFReciver;

  var code='';
  code+='network.update();\n';
  code+='while ( network.available() ) {\n';
  code+='RF24NetworkHeader header;\n';
  code+='payload_t payload;\n';
  code+='network.read(header,&payload,sizeof(payload));\n';
  code+=branch;
  code+='}\n';
  code+='\n';

  return code;
};





// 'use strict';

// goog.provide('Blockly.Arduino.Microduino');

// goog.require('Blockly.Arduino');

// Blockly.Arduino.nRF_Init = function() {
//   var Channel = this.getFieldValue('CHANNEL');
//   var Interval = this.getFieldValue('INTERVAL');

//   var nRFBeginDefine='';
//   nRFBeginDefine+='#include <RF24Network.h>\n';;
//   nRFBeginDefine+='RF24 radio(9,10);\n';
//   nRFBeginDefine+='RF24Network network(radio);\n';
//   nRFBeginDefine+='const unsigned long interval = '+Interval+';\n';
//   nRFBeginDefine+='unsigned long last_sent;\n';
//   nRFBeginDefine+='\n';

//   Blockly.Arduino.definitions_['define_nRFBeginDefine'] = nRFBeginDefine;

//   var nRFSetup='';
//   nRFSetup+='radio.begin();\n';
//   nRFSetup+='network.begin(/*channel*/ '+Channel+', /*node address*/ this_node);\n';
//   Blockly.Arduino.setups_['setup_nRFSetup'] = nRFSetup;
//   var code = '';
//   return code;
// };

// Blockly.Arduino.nRF_Send = function() {

//   var branch = Blockly.Arduino.statementToCode(this, 'DO');



//   var nRFSender='';
//   nRFSender+='const uint16_t this_node = 1;\n';
//   nRFSender+='const uint16_t other_node = 0;\n';
//   Blockly.Arduino.definitions_['define_nRFSender'] = nRFSender;

//   var code='network.update();';
//   code+='unsigned long now = millis();\n';
//   code+='if ( now - last_sent >= interval  ) {\n';
//   code+='last_sent = now;\n';
//   code+=branch;
//   code+='RF24NetworkHeader header(/*to node*/ other_node);\n';
//   code+='bool ok = network.write(header,&payload,sizeof(payload));\n';
//   code+='}\n';

//   return code;
// };


// Blockly.Arduino.nRF_Read = function() {
//   var branch = Blockly.Arduino.statementToCode(this, 'DO');


//   var nRFReciver='';
//   nRFReciver+='const uint16_t this_node = 0;\n';
//   nRFReciver+='const uint16_t other_node = 1;\n';
//   Blockly.Arduino.definitions_['define_nRFReciver'] = nRFReciver;

//   var code='';
//   code+='network.update();\n';
//   code+='while ( network.available() ) {\n';
//   code+='RF24NetworkHeader header;\n';
//   code+='payload_t payload;\n';
//   code+='network.read(header,&payload,sizeof(payload));\n';
//   code+=branch;
//   code+='}\n';
//   code+='\n';

//   return code;
// };