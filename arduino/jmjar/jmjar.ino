/* Utilisation du capteur Ultrason HC-SR04 */

// définition des broches utilisées
int trig = 11;
int echo = 12;
long lecture_echo;
long cm;

void setup()
{
  pinMode(trig, OUTPUT);
  digitalWrite(trig, LOW);
  pinMode(echo, INPUT);
  Serial.begin(9600);
}

void loop()
{
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);
  lecture_echo = pulseIn(echo, HIGH);
  cm = lecture_echo / 58;
  if (cm < 8) {
    Serial.println("Do");
  }
  else if (cm < 16) {
    Serial.println("Re");
  }
  else if (cm < 30) {
    Serial.println("Mi");
  }
  delay(100);
}
