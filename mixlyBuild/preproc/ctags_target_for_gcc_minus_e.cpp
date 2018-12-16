# 1 "E:\\mdxlyHHH\\testArduino\\testArduino.ino"
# 1 "E:\\mdxlyHHH\\testArduino\\testArduino.ino"
void setup(){
  Serial.begin(9600);
}

void loop(){
  Serial.println(analogRead(A0));
  delay(1000);

}
