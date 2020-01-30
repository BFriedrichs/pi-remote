# RPI IR Remote

* irrp.py from http://abyz.me.uk/rpi/pigpio/examples.html#Python_irrp_py

## To record
Record pin: 17
````
irrp.py -r -g<PIN> -f<FILE> <LIST OF KEYS>
````

## To control
Control pin: 18
````
irrp.py -p -g<PIN> -f<FILE> <LIST OF KEYS>
````

## Usage
````
usage: irrp.py [-h] (-p | -r) -g GPIO -f FILE [--freq FREQ] [--gap GAP]
               [--glitch GLITCH] [--post POST] [--pre PRE] [--short SHORT]
               [--tolerance TOLERANCE] [-v] [--no-confirm]
               id [id ...]

positional arguments:
  id                    IR codes

optional arguments:
  -h, --help            show this help message and exit
  -p, --play            play keys
  -r, --record          record keys
  -g GPIO, --gpio GPIO  GPIO for RX/TX
  -f FILE, --file FILE  Filename
  --freq FREQ           frequency kHz
  --gap GAP             key gap ms
  --glitch GLITCH       glitch us
  --post POST           postamble ms
  --pre PRE             preamble ms
  --short SHORT         short code length
  --tolerance TOLERANCE
                        tolerance percent
  -v, --verbose         Be verbose
  --no-confirm          No confirm needed
````