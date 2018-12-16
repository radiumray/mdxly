#include <Arduino.h>
#include "mQBot.h"

#if defined(ESP32)
mQBot::mQBot(HardwareSerial *ser, int _rx, int _tx)
{
  common_init();
  carHwSerial = ser;
  uartRxstep = STEP_WAIT_AA;
  pinRX = _rx;
  pinTX = _tx;
}
#elif defined(__AVR__)
mQBot::mQBot(SoftwareSerial *ser)
{
  common_init();
  carSwSerial = ser;
  uartRxstep = STEP_WAIT_AA;
}

mQBot::mQBot(HardwareSerial *ser)
{
  common_init();
  carHwSerial = ser;
  uartRxstep = STEP_WAIT_AA;
}
#endif

void mQBot::common_init(void)
{
#if defined(__AVR__)
  carSwSerial = NULL;
#endif
  carHwSerial = NULL;
}

boolean mQBot::begin(uint32_t _baud)
{
#if defined(ESP32)
  carHwSerial->begin(_baud, SERIAL_8N1, pinRX, pinTX);
#elif defined(__AVR__)
  if (carHwSerial)
  {
    carHwSerial->begin(_baud);
  }
  else if (carSwSerial)
  {
    carSwSerial->begin(_baud);
  }
#endif
  delay(100);
  if (connectionErr())
  {
    return false;
  }
  setSpeed(0, 0);
  noTone();
  return true;
}

uint8_t mQBot::getChecksum(uint8_t _cmd, uint8_t *_data, uint8_t _len)
{
  uint8_t checksum = 0;
  checksum ^= _cmd;
  checksum ^= _len;
  for (uint8_t i = 0; i < _len; i++)
    checksum ^= _data[i];
  return checksum;
}

boolean mQBot::parse(uint8_t _inByte)
{
  if (uartRxstep == STEP_WAIT_AA)
  { //等待接收0x7A
    if (_inByte == HEADA)
      uartRxstep = STEP_WAIT_BB;
  }
  else if (uartRxstep == STEP_WAIT_BB)
  {
    if (_inByte == HEADB)
    { //等待接收0x7B
      uartRxstep = STEP_SET_CMD;
    }
    else if (_inByte == HEADC)
    { //等待接收0x7C
      uartRxstep = STEP_WAIT_CMD;
    }
    else
    {
      uartRxstep = STEP_WAIT_AA;
    }
  }
  else if (uartRxstep == STEP_WAIT_CMD)
  { //等待接收get命令
    datacmd = _inByte;
    uartRxstep = STEP_WAIT_LEN;
  }
  else if (uartRxstep == STEP_WAIT_LEN)
  { //等待接收get长度
    datalen = _inByte;
    uartRxindex = 0;
    uartRxstep = STEP_WAIT_DATA;
  }
  else if (uartRxstep == STEP_WAIT_DATA)
  { //等待接收get数据
    uartdata[uartRxindex++] = _inByte;
    if (uartRxindex >= datalen)
    {
      uartRxstep = STEP_WAIT_BCC;
    }
  }
  else if (uartRxstep == STEP_WAIT_BCC)
  { //等待校验get数据
    uartRxstep = STEP_WAIT_AA;
    if (getChecksum(datacmd, uartdata, datalen) == _inByte)
    {
      return true;
    }
  }
  else if (uartRxstep == STEP_SET_CMD)
  { //等待set命令
    if (_inByte == MOTORCMD || _inByte == BUZZERCMD || _inByte == LINEFINDERCMD || _inByte == COLORDISCERNCMD || _inByte == SETCOLORCMD || _inByte == SETBAUDCMD)
    {
      uartRxstep = STEP_SET_RES;
    }
    else
    {
      uartRxstep = STEP_WAIT_AA;
    }
  }
  else if (uartRxstep == STEP_SET_RES)
  { //判断set结果
    uartRxstep = STEP_WAIT_AA;
    if (_inByte)
    {
      return true;
    }
  }
  return false;
}

boolean mQBot::available()
{
  uint8_t inChar = 0x00;
  if (carHwSerial)
  {
    if (carHwSerial->available() > 0)
    {
      inChar = carHwSerial->read();
      if (parse(inChar))
      {
        return true;
      }
    }
  }
#if defined(__AVR__)
  else
  {
    if (carSwSerial->available() > 0)
    {
      inChar = carSwSerial->read();
      if (parse(inChar))
      {
        return true;
      }
    }
#endif
    return false;
  }
}

void mQBot::readBytes(uint8_t *_data, uint8_t _len)
{
  memcpy(_data, uartdata, _len);
}

void mQBot::readWords(int16_t *_data, uint8_t _len)
{
  readBytes((uint8_t *)_data, _len * 2);
}

void mQBot::write(uint8_t cmd, uint8_t *_data, uint8_t _len)
{
  if (carHwSerial)
  {
    carHwSerial->write(HEADA);
    carHwSerial->write(HEADB);
    carHwSerial->write(cmd);
    carHwSerial->write(_len);
    carHwSerial->write(_data, _len);
    carHwSerial->write(getChecksum(cmd, _data, _len));
  }
#if defined(__AVR__)
  else
  {
    carSwSerial->write(HEADA);
    carSwSerial->write(HEADB);
    carSwSerial->write(cmd);
    carSwSerial->write(_len);
    carSwSerial->write(_data, _len);
    carSwSerial->write(getChecksum(cmd, _data, _len));
  }
#endif
}

void mQBot::getData(uint8_t _cmd)
{
  if (carHwSerial)
  {
    carHwSerial->write(HEADA);
    carHwSerial->write(HEADC);
    carHwSerial->write(_cmd);
  }
#if defined(__AVR__)
  else
  {
    carSwSerial->write(HEADA);
    carSwSerial->write(HEADC);
    carSwSerial->write(_cmd);
  }
#endif
}

void mQBot::setColorLED(uint8_t _cmd, uint8_t ar, uint8_t ag, uint8_t ab, uint8_t br, uint8_t bg, uint8_t bb)
{
  if (ar > 255)
    ar = 255;
  if (ag > 255)
    ag = 255;
  if (ab > 255)
    ab = 255;
  if (br > 255)
    br = 255;
  if (bg > 255)
    bg = 255;
  if (bb > 255)
    bb = 255;
  colorledData[0] = ar;
  colorledData[1] = ag;
  colorledData[2] = ab;
  colorledData[3] = br;
  colorledData[4] = bg;
  colorledData[5] = bb;
  last_time = millis();
  write(_cmd, colorledData, 6);
  while (!available())
  {
    connectionSta = 0;
    if (millis() - last_time > TIMEOUT)
    {
      connectionSta = _cmd;
      last_time = millis();
      break;
    }
  }
}

void mQBot::setColorLEDA(uint8_t ar, uint8_t ag, uint8_t ab)
{
  colorledDataCache[0] = ar;
  colorledDataCache[1] = ag;
  colorledDataCache[2] = ab;
  setColorLED(SETCOLORCMD, ar, ag, ab, colorledDataCache[3], colorledDataCache[4], colorledDataCache[5]);
}

void mQBot::setColorLEDB(uint8_t br, uint8_t bg, uint8_t bb)
{
  colorledDataCache[3] = br;
  colorledDataCache[4] = bg;
  colorledDataCache[5] = bb;
  setColorLED(SETCOLORCMD, colorledDataCache[0], colorledDataCache[1], colorledDataCache[2], br, bg, bb);
}

void mQBot::setColorLEDA(uint32_t _rgb)
{
  colorledDataCache[0] = _rgb >> 16;
  colorledDataCache[1] = _rgb >> 8 & 0xFF;
  colorledDataCache[2] = _rgb & 0xFF;
  setColorLED(SETCOLORCMD, colorledDataCache[0], colorledDataCache[1], colorledDataCache[2], colorledDataCache[3], colorledDataCache[4], colorledDataCache[5]);
}

void mQBot::setColorLEDB(uint32_t _rgb)
{
  colorledDataCache[3] = _rgb >> 16;
  colorledDataCache[4] = _rgb >> 8 & 0xFF;
  colorledDataCache[5] = _rgb & 0xFF;
  setColorLED(SETCOLORCMD, colorledDataCache[0], colorledDataCache[1], colorledDataCache[2], colorledDataCache[3], colorledDataCache[4], colorledDataCache[5]);
}

void mQBot::setAllLED(uint32_t _rgb)
{
  setColorLEDA(_rgb);
  setColorLEDB(_rgb);
}

void mQBot::setAllLED(uint8_t ar, uint8_t ag, uint8_t ab)
{
  setColorLEDA(ar, ag, ab);
  setColorLEDB(ar, ag, ab);
}

void mQBot::setSpeed(int16_t left, int16_t right)
{
  if (left != BRAKE && right != BRAKE)
  {
    if (left < -MAXSPEED)
      left = -MAXSPEED;
    if (left > MAXSPEED)
      left = MAXSPEED;
    if (right < -MAXSPEED)
      right = -MAXSPEED;
    if (right > MAXSPEED)
      right = MAXSPEED;
    if (left > 0)
      left = map(left, 1, MAXSPEED, MINSPEED, MAXSPEED);
    else if (left < 0)
      left = map(left, -1, -MAXSPEED, -MINSPEED, -MAXSPEED);
    if (right > 0)
      right = map(right, 1, MAXSPEED, MINSPEED, MAXSPEED);
    else if (right < 0)
      right = map(right, -1, -MAXSPEED, -MINSPEED, -MAXSPEED);
  }
  carmotorData[0] = right & 0xFF;
  carmotorData[1] = right >> 8;
  carmotorData[2] = (-left) & 0xFF;
  carmotorData[3] = (-left) >> 8;
  last_time = millis();
  write(MOTORCMD, carmotorData, 4);
  while (!available())
  {
    connectionSta = 0;
    if (millis() - last_time > TIMEOUT)
    {
      connectionSta = MOTORCMD;
      last_time = millis();
      break;
    }
  }
}

void mQBot::setSpeedA(int16_t left)
{
  motorspeed[0] = left;
  setSpeed(motorspeed[0], motorspeed[1]);
}

void mQBot::setSpeedB(int16_t right)
{
  motorspeed[1] = right;
  setSpeed(motorspeed[0], motorspeed[1]);
}

void mQBot::tone(int16_t _fre, int16_t _time)
{
  if (_fre < MINFRE || _fre > MAXFRE)
    _fre = 0;
  buzzerData[0] = _fre & 0xFF;
  buzzerData[1] = _fre >> 8;
  buzzerData[2] = _time & 0xFF;
  buzzerData[3] = _time >> 8;
  last_time = millis();
  write(BUZZERCMD, buzzerData, 4);
  while (!available())
  {
    connectionSta = 0;
    if (millis() - last_time > TIMEOUT)
    {
      connectionSta = BUZZERCMD;
      last_time = millis();
      break;
    }
  }
}

void mQBot::tone(int16_t _fre)
{
  tone(_fre, 0xFFFF);
}

void mQBot::noTone()
{
  tone(0, 0);
}

uint8_t mQBot::getVersion()
{
  last_time = millis();
  getData(VERSIONCMD);
  while (!available())
  {
    connectionSta = 0;
    if (millis() - last_time > TIMEOUT)
    {
      connectionSta = VERSIONCMD;
      last_time = millis();
      break;
    }
  }

  if (!connectionSta)
  {
    readBytes(&version, VERSION_LEN);
  }
  else
  {
    version = 0;
  }

  return version;
}

void mQBot::getLineAlone(uint8_t *_array, uint8_t _colorA, uint8_t _colorB)
{
  memset(colorledline, 0, 6);
  if (_colorA != BLACK)
  {
    colorledline[_colorA - 1] = 255;
  }
  if (_colorB != BLACK)
  {
    colorledline[3 + _colorB - 1] = 255;
  }

  setColorLED(LINEFINDERCMD, colorledline[0], colorledline[1], colorledline[2], colorledline[3], colorledline[4], colorledline[5]);

  last_time = millis();
  getData(GETLINECMD);
  while (!available())
  {
    connectionSta = 0;
    if (millis() - last_time > TIMEOUT)
    {
      connectionSta = GETLINECMD;
      last_time = millis();
      break;
    }
  }
  if (!connectionSta)
  {
    readBytes(_array, DATA_RXLINE_LEN);
  }
}

void mQBot::getLine(uint8_t *_array, uint8_t _color)
{
  getLineAlone(_array, _color, _color);
}

uint8_t mQBot::getLineA(uint8_t _color)
{
  setlineLED[0] = _color;
  getLineAlone(linefilter, setlineLED[0], setlineLED[1]);
  return linefilter[0];
}

uint8_t mQBot::getLineB(uint8_t _color)
{
  setlineLED[1] = _color;
  getLineAlone(linefilter, setlineLED[0], setlineLED[1]);
  return linefilter[1];
}

void mQBot::getLineLowpassFilter(uint8_t *_array, uint8_t _color, float _num)
{
  getLine(linefilter, _color);
  _array[0] += (linefilter[0] - _array[0]) * _num;
  _array[1] += (linefilter[1] - _array[1]) * _num;
}

void mQBot::getLineAverageFilter(uint8_t *_array, uint8_t _color, uint8_t len)
{
  uint32_t filter_sum[2];
  for (uint8_t i = 0; i < len; i++)
  {
    getLine(linefilter, _color);
    filter_sum[0] += linefilter[0];
    filter_sum[1] += linefilter[1];
  }
  _array[0] = filter_sum[0] / len;
  _array[1] = filter_sum[1] / len;
}

void mQBot::getColorRaw(uint8_t *_array, uint8_t _ar, uint8_t _ag, uint8_t _ab, uint8_t _br, uint8_t _bg, uint8_t _bb)
{
  setColorLED(COLORDISCERNCMD, _ar, _ag, _ab, _br, _bg, _bb);
  getData(GETCOLORCMD);
  while (!available())
  {
    connectionSta = 0;
    if (millis() - last_time > TIMEOUT)
    {
      connectionSta = GETCOLORCMD;
      last_time = millis();
      break;
    }
  }
  if (!connectionSta)
  {
    readBytes(_array, DATA_RXCOLOR_LEN);
  }
}

void mQBot::getColorRawLowpassFilter(uint8_t *_array, float _num)
{
  getColorRaw(colorfilter);
  for (uint8_t i = 0; i < 6; i++)
  {
    _array[i] += (colorfilter[i] - _array[i]) * _num;
  }
}

void mQBot::getColor(uint8_t *_array)
{
  getColorRaw(cachecolor);
  for (uint8_t i = 0; i < 2; i++)
  {
    if (cachecolor[3 * i + 0] >= 220 && cachecolor[3 * i + 1] < 100 && cachecolor[3 * i + 2] < 100)
    {
      _array[i] = 1;
    }
    else if (cachecolor[3 * i + 0] < 165 && cachecolor[3 * i + 1] >= 175 && cachecolor[3 * i + 2] < 165)
    {
      _array[i] = 2;
    }
    else if (cachecolor[3 * i + 0] < 135 && cachecolor[3 * i + 1] < 165 && cachecolor[3 * i + 2] >= 165 || (cachecolor[3 * i + 0] < 200 && cachecolor[3 * i + 1] < 200 && cachecolor[3 * i + 2] > 225))
    {
      _array[i] = 3;
    }
    else if (cachecolor[3 * i + 0] >= 200 && cachecolor[3 * i + 1] >= 150 && cachecolor[3 * i + 2] < 120)
    {
      _array[i] = 4;
    }
    else if (cachecolor[3 * i + 0] >= 150 && cachecolor[3 * i + 1] < 145 && cachecolor[3 * i + 2] >= 135)
    {
      _array[i] = 5;
    }
    else if (cachecolor[3 * i + 0] < 150 && cachecolor[3 * i + 1] >= 180 && cachecolor[3 * i + 2] >= 160)
    {
      _array[i] = 6;
    }
    else if (cachecolor[3 * i + 0] > 110 && cachecolor[3 * i + 0] <= 150 && cachecolor[3 * i + 1] > 110 && cachecolor[3 * i + 1] <= 150 && cachecolor[3 * i + 2] > 110 && cachecolor[3 * i + 2] <= 150)
    {
      _array[i] = 7;
    }
    else if (cachecolor[3 * i + 0] >= 200 && cachecolor[3 * i + 1] >= 200 && cachecolor[3 * i + 2] >= 200)
    {
      _array[i] = 8;
    }
    else
    {
      _array[i] = 0;
    }
  }
}

uint8_t mQBot::getColorA()
{
  ledcolor[0]=255;
  ledcolor[1]=255;
  ledcolor[2]=255;
  getColorRaw(cachecolor,ledcolor[0],ledcolor[1],ledcolor[2],ledcolor[3],ledcolor[4],ledcolor[5]);
  if (cachecolor[0] >= 220 && cachecolor[1] < 100 && cachecolor[2] < 100)
  {
    aloneColor[0] = 1;
  }
  else if (cachecolor[0] < 165 && cachecolor[1] >= 175 && cachecolor[2] < 165)
  {
    aloneColor[0] = 2;
  }
  else if (cachecolor[0] < 135 && cachecolor[1] < 165 && cachecolor[2] >= 165 || (cachecolor[0] < 200 && cachecolor[1] < 200 && cachecolor[2] > 225))
  {
    aloneColor[0] = 3;
  }
  else if (cachecolor[0] >= 200 && cachecolor[1] >= 150 && cachecolor[2] < 120)
  {
    aloneColor[0] = 4;
  }
  else if (cachecolor[0] >= 150 && cachecolor[1] < 145 && cachecolor[2] >= 135)
  {
    aloneColor[0] = 5;
  }
  else if (cachecolor[0] < 150 && cachecolor[1] >= 180 && cachecolor[2] >= 160)
  {
    aloneColor[0] = 6;
  }
  else if (cachecolor[0] > 110 && cachecolor[0] <= 150 && cachecolor[1] > 110 && cachecolor[1] <= 150 && cachecolor[2] > 110 && cachecolor[2] <= 150)
  {
    aloneColor[0] = 7;
  }
  else if (cachecolor[0] >= 200 && cachecolor[1] >= 200 && cachecolor[2] >= 200)
  {
    aloneColor[0] = 8;
  }
  else
  {
    aloneColor[0] = 0;
  }
  return aloneColor[0];
}

uint8_t mQBot::getColorB()
{
  ledcolor[3]=255;
  ledcolor[4]=255;
  ledcolor[5]=255;
  getColorRaw(cachecolor,ledcolor[0],ledcolor[1],ledcolor[2],ledcolor[3],ledcolor[4],ledcolor[5]);
  if (cachecolor[3] >= 220 && cachecolor[4] < 100 && cachecolor[5] < 100)
  {
    aloneColor[1] = 1;
  }
  else if (cachecolor[3] < 165 && cachecolor[4] >= 175 && cachecolor[5] < 165)
  {
    aloneColor[1] = 2;
  }
  else if (cachecolor[3] < 135 && cachecolor[4] < 165 && cachecolor[5] >= 165 || (cachecolor[3] < 200 && cachecolor[4] < 200 && cachecolor[5] > 225))
  {
    aloneColor[1] = 3;
  }
  else if (cachecolor[3] >= 200 && cachecolor[4] >= 150 && cachecolor[5] < 120)
  {
    aloneColor[1] = 4;
  }
  else if (cachecolor[3] >= 150 && cachecolor[4] < 145 && cachecolor[5] >= 135)
  {
    aloneColor[1] = 5;
  }
  else if (cachecolor[3] < 150 && cachecolor[4] >= 180 && cachecolor[5] >= 160)
  {
    aloneColor[1] = 6;
  }
  else if (cachecolor[3] > 110 && cachecolor[3] <= 150 && cachecolor[4] > 110 && cachecolor[4] <= 150 && cachecolor[5] > 110 && cachecolor[5] <= 150)
  {
    aloneColor[1] = 7;
  }
  else if (cachecolor[3] >= 200 && cachecolor[4] >= 200 && cachecolor[5] >= 200)
  {
    aloneColor[1] = 8;
  }
  else
  {
    aloneColor[1] = 0;
  }
  return aloneColor[1];
}

void mQBot::getColorLowpassFilter(uint8_t *_array, float _num)
{
  getColorLowpassFilter(cachecolor, _num);
  for (uint8_t i = 0; i < 2; i++)
  {
    if (cachecolor[3 * i + 0] >= 220 && cachecolor[3 * i + 1] < 100 && cachecolor[3 * i + 2] < 100)
    {
      _array[i] = 1;
    }
    else if (cachecolor[3 * i + 0] < 165 && cachecolor[3 * i + 1] >= 175 && cachecolor[3 * i + 2] < 165)
    {
      _array[i] = 2;
    }
    else if (cachecolor[3 * i + 0] < 135 && cachecolor[3 * i + 1] < 165 && cachecolor[3 * i + 2] >= 165 || (cachecolor[3 * i + 0] < 200 && cachecolor[3 * i + 1] < 200 && cachecolor[3 * i + 2] > 225))
    {
      _array[i] = 3;
    }
    else if (cachecolor[3 * i + 0] >= 200 && cachecolor[3 * i + 1] >= 150 && cachecolor[3 * i + 2] < 120)
    {
      _array[i] = 4;
    }
    else if (cachecolor[3 * i + 0] >= 150 && cachecolor[3 * i + 1] < 145 && cachecolor[3 * i + 2] >= 135)
    {
      _array[i] = 5;
    }
    else if (cachecolor[3 * i + 0] < 150 && cachecolor[3 * i + 1] >= 180 && cachecolor[3 * i + 2] >= 160)
    {
      _array[i] = 6;
    }
    else if (cachecolor[3 * i + 0] > 110 && cachecolor[3 * i + 0] <= 150 && cachecolor[3 * i + 1] > 110 && cachecolor[3 * i + 1] <= 150 && cachecolor[3 * i + 2] > 110 && cachecolor[3 * i + 2] <= 150)
    {
      _array[i] = 7;
    }
    else if (cachecolor[3 * i + 0] >= 200 && cachecolor[3 * i + 1] >= 200 && cachecolor[3 * i + 2] >= 200)
    {
      _array[i] = 8;
    }
    else
    {
      _array[i] = 0;
    }
  }
}

uint8_t mQBot::connectionErr()
{
  if (millis() - last_time > 10)
  {
    getVersion();
    last_time = millis();
  }
  return connectionSta;
}