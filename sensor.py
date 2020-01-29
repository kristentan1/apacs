import time
import board
import digitalio

pir_sensor = digitalio.DigitalInOut(board.D18)
pir_sensor.direction = digitalio.Direction.INPUT



print('unless...')
while True:
        if pir_sensor.value:
                print ("WOOOOOOOO")
        else:
            print('sad')
        time.sleep(0.5)

