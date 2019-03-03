

#include<Arduino.h>
#include <LiquidCrystal.h>

// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

int nav = 9;
int select = 8;
const String menu[] = {"over flow", "not on curb", "no trash", "claw obstruction"};
int i = 0;


void setup()
{
  pinMode(nav, INPUT);
  pinMode(select, INPUT);

  // PIN3 is set for output
  Serial.begin(9600);                             // serial data rate is set for 9600bps(bits per second)
  lcd.begin(16, 2);
  // Print a message to the LCD.
  lcd.print("File report");
  lcd.setCursor(0, 0);
  lcd.print("Infraction type:");

}

void loop() {

  if (digitalRead(select) == HIGH) {
    lcd.clear();
    delay(500);
    i++;
  }
  if (digitalRead(nav) == HIGH) {
    lcd.clear();
    delay(500);
    i--;
  }

  lcd.setCursor(0, 0);
  lcd.print("Infraction type:");
  lcd.setCursor(0, 1);

  lcd.print(menu[abs(i) % 4]);

  if(digitalRead(select) == HIGH && digitalRead(nav) == HIGH){
    Serial.println(menu[abs(i) % 4]);
    delay(1000);
  }

}
