/* Utilisation du capteur Ultrason HC-SR04 */

// définition des broches utilisées
int trig = 2;
long lecture_echo;
long cm;

void setup()
{
  pinMode(trig, OUTPUT);
  digitalWrite(trig, LOW);
  pinMode(5, INPUT);
  pinMode(6, INPUT);
  pinMode(7, INPUT);
  pinMode(8, INPUT);
  pinMode(9, INPUT);
  pinMode(10, INPUT);
  Serial.begin(9600);
}

void loop()
{
  for (int echo = 5 ; echo <= 10; echo++){
    //int echo = 6;
    digitalWrite(trig, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig, LOW);
    lecture_echo = pulseIn(echo, HIGH, 2000);
    cm = lecture_echo / 58;
    //Serial.println(cm);
    if ((cm > 0) and (cm < 50)) {
       Serial.println(echo);
    }
  }
  delay(100);
}
