#include <Arduino.h>
#line 1 "E:\\mdxlyHHH\\testArduino\\testArduino.ino"
#line 1 "E:\\mdxlyHHH\\testArduino\\testArduino.ino"
#line 1 "E:\\mdxlyHHH\\testArduino\\testArduino.ino"
void setup();
#line 5 "E:\\mdxlyHHH\\testArduino\\testArduino.ino"
void loop();
#line 1 "E:\\mdxlyHHH\\testArduino\\testArduino.ino"
void setup(){
  Serial.begin(9600);
}

void loop(){
  Serial.println(analogRead(A0));
  delay(1000);

}
