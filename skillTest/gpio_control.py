from flask import Flask
from flask_ask import Ask, statement, convert_errors
import RPi.GPIO as GPIO
import logging

GPIO.setmode(GPIO.BCM)

app = Flask(__name__)
ask = Ask(app, '/')

logging.getLogger("flask_ask").setLevel(logging.DEBUG)

@ask.intent('GPIOControl', mapping={'status': 'status', 'pin': 'pin'})
def gpio_control(status, pin):

    try:
        pinNum = int(pin)
    except Exception as e:
        return statement('Pin number not valid.')

    GPIO.setup(pinNum, GPIO.IN)

    if status in ['on', 'start']:
        while status == 'on':
            if GPIO.input(24):
                print ('OH NO SOMEONE IS LEAVING :0')
                return statement('Someone is trying to leave')
        time.sleep(0.1)

    return statement('Turning pin {} {}'.format(pin, status))

if __name__ == '__main__':
  port = 5000 #the custom port you want
  app.run(host='localhost', port=port)
