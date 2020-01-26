import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(24, GPIO.IN)

try:
    time.sleep(2)


    while True:
        if GPIO.input(24):
           print('OH NO SOMEONE IS LEAVING :O')
           break
        time.sleep(0.1)
except:
    GPIO.cleanup()
