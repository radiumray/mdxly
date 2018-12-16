'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet='#6c91ac';


Blockly.Blocks.WiFiBlynk = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.WiFi);
    this.appendDummyInput()
    .appendField(Blockly.WiFiSSID)
    .appendField(new Blockly.FieldTextInput(Blockly.typeSSID), "SSID")
    this.appendDummyInput()
    .appendField(Blockly.WiFiPass)
    .appendField(new Blockly.FieldTextInput(Blockly.typePass), "WiFiPASS")
    this.appendDummyInput()
    .appendField(Blockly.AuthToken)
    .appendField(new Blockly.FieldTextInput(Blockly.TypeAuthToken), "authToken")
    //this.appendStatementInput("WiFiInput");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);
  }
};



Blockly.Blocks.BLYNK_READ = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.BLYNK_READ);
    this.appendDummyInput()
    .appendField(Blockly.virtualPort)
    .appendField(new Blockly.FieldTextInput("V0"), "virtualPort")
    this.appendValueInput("blynkReadInput", [Number,String])
    .setCheck([Number,String])
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.inputValue);
    var tip="发送数据到Blynk\n";
    tip+="发送频率请在你的APP中设置\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);
  }
};


Blockly.Blocks.BLYNK_WRITE = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.BLYNK_WRITE);
    this.appendDummyInput()
    .appendField(Blockly.virtualPort)
    .appendField(new Blockly.FieldTextInput("V0"), "virtualPort")
    this.appendStatementInput("blynkWriteInput");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);
  }
};


Blockly.Blocks.BLYNKParamOne = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.SoloParam)
        .appendField(Blockly.paramType)
        .appendField(new Blockly.FieldDropdown([[Blockly.BLYNKString, "asStr()"], 
            [Blockly.BLYNKInt, "asInt()"], [Blockly.BLYNKDouble, "asDouble()"]]),'paramType');

    var tip="获取一个来自Blynk的值\n";
    tip+="返回一个值\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};


Blockly.Blocks.BLYNKParamArray = {   
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.ArrayParam)
        .appendField(Blockly.paramType)
        .appendField(new Blockly.FieldDropdown([[Blockly.BLYNKString, "asStr()"], 
            [Blockly.BLYNKInt, "asInt()"], [Blockly.BLYNKDouble, "asDouble()"]]),'paramType');

    this.appendValueInput("paramNum", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.paramIndex);

    var tip="获取来自Blynk的数组值中的一个元素\n";
    tip+="返回一个值\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};


Blockly.Blocks.WiFiBlynkTimer = {   
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.BlynkTimer)
        .appendField(Blockly.timerName)
        .appendField(new Blockly.FieldTextInput("tempture"), "timerName")
        .appendField(Blockly.interval)
        .appendField(new Blockly.FieldTextInput("1000"), "duration");

    this.appendStatementInput("blynkTimerDoing");

    var tip="设置一个定时器用来上传数据到Blynk\n";
    tip+="\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true);
  }
};


Blockly.Blocks.WiFiBlynkVirtualWrite = {   
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(Blockly.BLYNK_READ)
        .appendField(Blockly.virtualPort)
        .appendField(new Blockly.FieldTextInput("V0"), "virtualPort");

    this.appendValueInput("senderDataToBlynk", [Number,String])
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.inputValue);

    var tip="上传数据到Blynk\n";
    tip+="\n";
    this.setTooltip(tip);

    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true);
  }
};




Blockly.Blocks.WiFimCottonATPre = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.WiFiATPre);

    // this.appendDummyInput()
    // .appendField(Blockly.WiFiSSID)
    // .appendField(new Blockly.FieldTextInput(Blockly.typeSSID), "SSID")

    // this.appendDummyInput()
    // .appendField(Blockly.WiFiPass)
    // .appendField(new Blockly.FieldTextInput(Blockly.typePass), "WiFiPASS")

    // this.appendDummyInput()
    // .appendField(Blockly.AuthToken)
    // .appendField(new Blockly.FieldTextInput(Blockly.TypeAuthToken), "authToken")

    //this.appendStatementInput("WiFiInput");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};


Blockly.Blocks.WiFiATOneTime = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MD_BTATExecuted);
    this.appendStatementInput("ATExecuted");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.WiFimCottonMqttConnect = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.WiFimCottonMQTT);
    this.appendDummyInput()
    .appendField(Blockly.WiFiSSID)
    .appendField(new Blockly.FieldTextInput(Blockly.typeSSID), "SSID")
    this.appendDummyInput()
    .appendField(Blockly.WiFiPass)
    .appendField(new Blockly.FieldTextInput(Blockly.typePass), "WiFiPASS")
    this.appendDummyInput()
    .appendField(Blockly.userID)
    .appendField(new Blockly.FieldTextInput(Blockly.typeUserID), "userID")
    this.appendDummyInput()
    .appendField(Blockly.userToken)
    .appendField(new Blockly.FieldTextInput(Blockly.typeToken), "userToken")
    //this.appendStatementInput("WiFiInput");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);
  }
};

Blockly.Blocks.WiFimCottonATBoolP0 = {
  init: function() {
    var controlTpye = [
                 [Blockly.WiFiATrestart, 'restart'],
                 [Blockly.WiFiATrestore, 'restore'],
                 [Blockly.WiFiATleaveAP, 'leaveAP'],
                 [Blockly.WiFiATsetOprToStation, 'setOprToStation'],
                 [Blockly.WiFiATsetOprToSoftAP, 'setOprToSoftAP'],
                 [Blockly.WiFiATsetOprToStationSoftAP, 'setOprToStationSoftAP'],
                 [Blockly.WiFiATenableMUX, 'enableMUX'],
                 [Blockly.WiFiATdisableMUX, 'disableMUX'],
                 [Blockly.WiFiATreleaseTCP, 'releaseTCP'],
                 [Blockly.WiFiATmqttDisconnect, 'mqttDisconnect'],
                 [Blockly.WiFiATmqttPub, 'mqttPub'],
                 [Blockly.WiFiATisMqttConnected, 'isMqttConnected'],
                 [Blockly.WiFiATisWiFiconnected, 'isWiFiconnected'],
                 [Blockly.WiFiATmqttDisconnect, 'mqttDisconnect']
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.WiFiATControl)
        .appendField(new Blockly.FieldDropdown(controlTpye), 'controlTpye');

    this.setOutput(true, Boolean);
    this.setTooltip("WiFi控制");
  }
};



Blockly.Blocks.WiFimCottonATStringP0 = {
  init: function() {
    var returnString = [
                 [Blockly.WiFiATgetVersion, 'getMVersion().c_str'],
                 [Blockly.WiFiATgetWifiModeList, 'getWifiModeList().c_str'],
                 [Blockly.WiFiATgetAPList, 'getAPList().c_str'],
                 [Blockly.WiFiATgetNowConecAp, 'getNowConecAp().c_str'],
                 [Blockly.WiFiATgetJoinedDeviceIP, 'getJoinedDeviceIP().c_str'],
                 [Blockly.WiFiATgetDHCP, 'getDHCP().c_str'],
                 [Blockly.WiFiATgetStationMac, 'getStationMac().c_str'],
                 [Blockly.WiFiATgetStationIp, 'getStationIp().c_str'],
                 [Blockly.WiFiATgetLocalIP, 'getLocalIP().c_str'],
                 [Blockly.WiFiATgetMqttJson, 'getMqttJson().c_str'],
                 [Blockly.WiFiATqueryWiFiInfo, 'queryWiFiInfo().c_str']
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.WiFiATGet)
        .appendField(new Blockly.FieldDropdown(returnString), 'returnString');

    this.setOutput(true, String);
    this.setTooltip("WiFi获取");
  }
};

Blockly.Blocks.WiFimCottonATBoolPBool = {
  init: function() {
    var setMode = [
                 [Blockly.WiFiATsetAutoConnect, 'setAutoConnect'],
                 [Blockly.WiFiATstartSmartConfig, 'startSmartConfig']
              ];

    var trueFalse = [
                 ['true', 'true'],
                 ['false', 'false']
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.WiFiATSet)
        .appendField(new Blockly.FieldDropdown(setMode), 'setMode')
        .appendField(new Blockly.FieldDropdown(trueFalse), 'trueFalse');

    this.setOutput(true, Boolean);
    this.setTooltip("WiFi 设置");
  }
};



Blockly.Blocks.WiFimCottonATBoolPInput = {
  init: function() {
    this.setColour(colorSet);

    var setMode = [
                 [Blockly.WiFiATsetUart, 'setUart'],
                 [Blockly.WiFiATmqttSetSubscrib, 'mqttSetSubscrib'],
                 [Blockly.WiFiATmqttSetTopic, 'mqttSetTopic']
              ];

this.appendDummyInput()
    .appendField(Blockly.WiFiATSet)
    .appendField(new Blockly.FieldDropdown(setMode), 'setMode')
    .appendField(new Blockly.FieldTextInput("115200"), "input");

    this.setInputsInline(true);

    this.setOutput(true, Boolean);

  }
};



Blockly.Blocks.WiFimCottonATBoolPString = {
  init: function() {
    this.setColour(colorSet);

    var setMode = [
                 [Blockly.WiFiATmqttPublishM, 'mqttPublishM'],
                 [Blockly.WiFiATmqttSetMessage, 'mqttSetMessage']
              ];

this.appendDummyInput()
    .appendField(Blockly.WiFiATSet)
    .appendField(new Blockly.FieldDropdown(setMode), 'setMode');

this.appendValueInput('StringInput')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.WiFiATmqttContext);

    this.setOutput(true, Boolean);

  }
};




Blockly.Blocks.WiFimCottonJsonPrase = {
  init: function() {
    this.setColour(colorSet);

this.appendDummyInput()
    .appendField(Blockly.WiFiATmqttJsonPrase);


this.appendValueInput('StringInput')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('name:')
        .appendField(new Blockly.FieldTextInput("button"), "input");

    this.setInputsInline(true);
    this.setOutput(true, String);

  }
};

Blockly.Blocks.WiFimCottonJsonPraseAI = {
  init: function() {
    this.setColour(colorSet);

  this.appendDummyInput()
    .appendField(Blockly.WiFiATmqttJsonPrase)
    .appendField(Blockly.MDAIJsonSize)
    .appendField(new Blockly.FieldTextInput("500"), "input");

    this.setInputsInline(true);
    this.appendStatementInput("jsonPrase");
    this.setPreviousStatement(true);
    this.setNextStatement(true);

  }
};


Blockly.Blocks.WiFiJsonObject = {
      init: function() {
    this.setColour(colorSet);
    this.appendValueInput('addInput') 
     .setCheck(String,Number)
     .setAlign(Blockly.ALIGN_RIGHT)
     .appendField(Blockly.MDAIJsonObject)
     .appendField(new Blockly.FieldTextInput('root'),'jsonName');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    this.setTooltip("获取JsonObject");

  }
};


Blockly.Blocks.WiFiJsonPraseObject = {
    init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
      .appendField(Blockly.MDAIJsonAll);
    this.setOutput(true, String);
  }
};

Blockly.Blocks.JsonObjectVerify = {
    init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
      .appendField(Blockly.MDAIJsonVerify)
      .appendField(new Blockly.FieldTextInput('root'),'jsonName');
    this.setOutput(true, Boolean);
  }
};


Blockly.Blocks.JsonObjectPraseItem = {
    init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
      .appendField(Blockly.MDAIJsonObject)
      .appendField(new Blockly.FieldTextInput('root'),'jsonObj')
      .appendField(Blockly.MDAIJsonItem)
      .appendField(new Blockly.FieldTextInput('item'),'item');
    this.setOutput(true, String,Number);
  }
};

Blockly.Blocks.JsonObjectPraseItemArray = {
    init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
      .appendField(Blockly.MDAIJsonObject)
      .appendField(new Blockly.FieldTextInput('root'),'jsonObj')
      .appendField(Blockly.MDAIJsonItem)
      .appendField(new Blockly.FieldTextInput('item'),'item');

    this.appendValueInput('numInput')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MDAIJsonIndex);
    this.setInputsInline(true);
    this.setOutput(true, String,Number);
  }
};


Blockly.Blocks.WiFimCottonATBoolP2Input = {
  init: function() {
    this.setColour(colorSet);

    var setMode = [
                 [Blockly.WiFiATjoinAP, 'joinAP'],
                 [Blockly.WiFiATcreateTCP, 'createTCP'],
                 [Blockly.WiFiATmqttSetDiveceIDToken, 'mqttSetDiveceIDToken'],
                 [Blockly.WiFiATmqttSetServer, 'mqttSetServer']
              ];


this.appendDummyInput()
    .appendField(Blockly.WiFiATSet)
    .appendField(new Blockly.FieldDropdown(setMode), 'setMode')
    .appendField(new Blockly.FieldTextInput("\"microduino\""), "input1")
    .appendField(new Blockly.FieldTextInput("\"makermodule\""), "input2");

    this.setInputsInline(true);

    this.setOutput(true, Boolean);

  }
};



Blockly.Blocks.WiFiTCPSend = {
  init: function() {
    this.setColour(colorSet);

  this.appendDummyInput()
    .appendField(Blockly.WiFiATTCPSend)

  this.appendValueInput('StringInput')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.WiFiATmqttContext);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setOutput(true, Boolean);
    this.setTooltip("内容里填写String变量");

  }
};




Blockly.Blocks.WiFiMqttJsonBuilderS = {
  init: function() {
    this.setColour(colorSet);

this.appendDummyInput()
    .appendField(Blockly.WiFiATmqttJsonBuiler)
    .appendField('name:')
    .appendField(new Blockly.FieldTextInput("\"door\""), "input");

this.appendValueInput('StringInput')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.WiFiATmqttContextS)
        .appendField(Blockly.WiFiATmqttContext);

    this.setInputsInline(true);
    this.setOutput(true, String);

  }
};

Blockly.Blocks.WiFiMqttJsonBuilderI = {
  init: function() {
    this.setColour(colorSet);

this.appendDummyInput()
    .appendField(Blockly.WiFiATmqttJsonBuiler)
    .appendField('name:')
    .appendField(new Blockly.FieldTextInput("\"tempture\""), "input");

this.appendValueInput('numInput')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.WiFiATmqttContextI)
        .appendField(Blockly.WiFiATmqttContext);

    this.setInputsInline(true);
    this.setOutput(true, String);

  }
};



Blockly.Blocks.WiFiMqttPublish = {
  init: function() {
    this.setColour(colorSet);

this.appendDummyInput()
    .appendField(Blockly.WiFiATmqttPublish)
    .appendField('Topic:')
    .appendField(new Blockly.FieldTextInput("\"publishTopic\""), "input");

this.appendValueInput('StringInput')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.WiFiATmqttContext);

    this.setInputsInline(true);
    this.setOutput(true, Boolean);

  }
};




Blockly.Blocks.WiFimCottonATMqttConnect = {
  init: function() {
    this.setColour(colorSet);

this.appendDummyInput()
    .appendField(Blockly.WiFiATMqttConnect)
    .appendField(new Blockly.FieldTextInput("\"ID\""), "ID")
    .appendField(new Blockly.FieldTextInput("\"user\""), "user")
    .appendField(new Blockly.FieldTextInput("\"pass\""), "pass");

    this.setInputsInline(true);

    this.setOutput(true, Boolean);

  }
};


Blockly.Blocks.WiFimCottonSetstate = {
  init: function() {
    var setMode = [
                 [Blockly.WiFiATsetWiFiState, 'setWiFiconnected'],
                 [Blockly.WiFiATsetmqttState, 'setMqttConnected']
              ];

    var trueFalse = [
                 ['true', 'true'],
                 ['false', 'false']
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.WiFiATSet)
        .appendField(new Blockly.FieldDropdown(setMode), 'setMode')
        .appendField(new Blockly.FieldDropdown(trueFalse), 'trueFalse');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setOutput(true, Boolean);
    this.setTooltip("WiFi 设置");
  }
};


Blockly.Blocks.WiFiATGetOprMode = {
  init: function() {

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.WiFiATGetOprMode);

    this.setOutput(true, Number);
    this.setTooltip("WiFi模式获取");
  }
};