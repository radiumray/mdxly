'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

// Blockly.Arduino.NFC_Format = function() {
//   var nfcDefine='';
//   nfcDefine+='#include <Microduino_NFC.h>\n';
//   nfcDefine+='NFC nfc;\n';
//   Blockly.Arduino.definitions_['MDNFC_define'] = nfcDefine;

// var setupNFC='';
// setupNFC+='  Serial.begin(115200);\n';
// setupNFC+='  uint32_t versiondata = nfc.begin();\n';
// setupNFC+='  if (! versiondata) {\n';
// setupNFC+='    Serial.print(\"Didn\'t find PN53x board\");\n';
// setupNFC+='    while (1);\n';
// setupNFC+='  }\n';
// setupNFC+='  Serial.print("Found chip PN5"); Serial.println((versiondata >> 24) & 0xFF, HEX);\n';
// setupNFC+='  Serial.print("Firmware ver. "); Serial.print((versiondata >> 16) & 0xFF, DEC);\n';
// setupNFC+='  Serial.print(\'.\'); Serial.println((versiondata >> 8) & 0xFF, DEC);\n';
// setupNFC+='  Serial.println("Waiting for an ISO14443A Card ...");\n';

//   Blockly.Arduino.setups_['setup_NFC'] = setupNFC;

//   var code = '';
//   code+='\n';

//   code+='uint8_t success;\n';
//   code+='uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };\n';
//   code+='uint8_t uidLength;\n';
//   code+='success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);\n';
//   code+='if (success) {\n';
//   code+='  delay(200);\n';
//   code+='  Serial.println("Found an ISO14443A card");\n';
//   code+='  Serial.print("  UID Length: "); Serial.print(uidLength, DEC); Serial.println(" bytes");\n';
//   code+='  Serial.print("  UID Value: ");\n';
//   code+='  nfc.PrintHex(uid, uidLength);\n';
//   code+='  Serial.println("");\n';
//   code+='  if (uidLength == 4) {\n';
//   code+='    Serial.println("Seems to be a Mifare Classic card (4 byte UID)");\n';
//   code+='    Serial.println("Trying to authenticate block 4 with default KEYA value");\n';
//   code+='    uint8_t keya[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };\n';
//   code+='    success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, 4, 0, keya);\n';
//   code+='    if (success) {\n';
//   code+='      Serial.println("Sector 1 (Blocks 4..7) has been authenticated");\n';
//   code+='      uint8_t data[16];\n';
//   code+='      success = nfc.mifareclassic_ReadDataBlock(4, data);\n';
//   code+='      if (success) {\n';
//   code+='        Serial.println("Reading Block 4:");\n';
//   code+='        nfc.PrintHexChar(data, 16);\n';
//   code+='        Serial.println("");\n';
//   code+='        delay(1000);\n';
//   code+='      } else {\n';
//   code+='        Serial.println("Ooops ... unable to read the requested block.  Try another key?");\n';
//   code+='      }\n';
//   code+='    } else {\n';
//   code+='      Serial.println("Ooops ... authentication failed: Try another key?");\n';
//   code+='    }\n';
//   code+='  }\n';
//   code+='  if (uidLength == 7) {\n';
//   code+='    Serial.println("Seems to be a Mifare Ultralight tag (7 byte UID)");\n';
//   code+='    Serial.println("Reading page 4");\n';
//   code+='    uint8_t data[32];\n';
//   code+='    success = nfc.mifareultralight_ReadPage (4, data);\n';
//   code+='    if (success) {\n';
//   code+='      nfc.PrintHexChar(data, 4);\n';
//   code+='      Serial.println("");\n';
//   code+='      delay(1000);\n';
//   code+='    } else {\n';
//   code+='      Serial.println("Ooops ... unable to read the requested page!?");\n';
//   code+='    }\n';
//   code+='  }\n';
//   code+='}\n';


//   return code;
// };


Blockly.Arduino.NFC_Read = function() {
  var nfcDefine='';
  nfcDefine+='#include <Microduino_NFC.h>\n';
  nfcDefine+='NFC nfc(D2);\n';
  nfcDefine+='uint16_t readNFCuid()\n';
  nfcDefine+='{\n';
  nfcDefine+='    boolean NFCsuccess;\n';
  nfcDefine+='    uint8_t uid[] = {0, 0, 0, 0, 0, 0, 0 };\n';
  nfcDefine+='    uint8_t uidLength;\n';
  nfcDefine+='    uint16_t NFCuid=0;\n';
  nfcDefine+='    NFCsuccess = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);\n';
  nfcDefine+='    if (NFCsuccess)\n';
  nfcDefine+='    {\n';
  nfcDefine+='        for (uint8_t i = 0; i < uidLength; i++)\n';
  nfcDefine+='        NFCuid += uid[i];\n';
  nfcDefine+='        return NFCuid;\n';
  nfcDefine+='    }\n';
  nfcDefine+='    else\n';
  nfcDefine+='    {\n';
  nfcDefine+='        return 0;\n';
  nfcDefine+='    }\n';
  nfcDefine+='}\n';

  Blockly.Arduino.definitions_['MDNFC_define'] = nfcDefine;

var setupNFC='';
setupNFC+='if (!nfc.begin())\n';
setupNFC+='{\n';
setupNFC+='    while (1);\n';
setupNFC+='}\n';
setupNFC+='nfc.setPassiveActivationRetries(0xFF);\n';

Blockly.Arduino.setups_['setup_NFC'] = setupNFC;

  var code = '';
  code+='readNFCuid()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  // return code;
};
