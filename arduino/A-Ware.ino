//---Library---
#include <Wire.h>
#include <AntaresESP8266HTTP.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
//---WiFi---
#define WIFISSID "modal ya"         // Ganti dengan SSID WiFi anda
#define PASSWORD "modalya123"     // Ganti dengan password WiFi anda
//---Pin---
DHT dht(D6, DHT22);
LiquidCrystal_I2C lcd(0x27,20,4);  // set the LCD address to 0x27 for a 16 chars and 2 line display
//---Antares---
#define ACCESSKEY "86de344c2859f09e:4fbf992fe0ca59d3"
#define projectName "AutomaticWarehouse"
#define deviceName "A-Ware"
AntaresESP8266HTTP antares(ACCESSKEY);

void setup() {
Serial.begin(115200);
antares.setDebug(true);
antares.wifiConnection(WIFISSID, PASSWORD);
//---lcd---
  lcd.init();                      // initialize the lcd 
  lcd.backlight();
//---dht---
  dht.begin();
}

void loop() {
//---DHT 22---
float kelembapan_udara= dht.readHumidity();
float suhu = dht.readTemperature();
//---lcd---
    lcd.setCursor(0,0);
    lcd.print ("Temperature:");
    lcd.print(suhu);
    lcd.print("°C");
    lcd.setCursor(9,0);
    lcd.print ("Humudity:");
    lcd.print(kelembapan_udara);
    lcd.print("%");
//---antares---
antares.add("Temperature", suhu);
antares.add("Humudity", kelembapan_udara);
antares.send(projectName, deviceName);
delay(4000);
}
