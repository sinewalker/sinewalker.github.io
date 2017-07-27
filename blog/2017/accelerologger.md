<!-- 
.. title: Help with Accelerologger
.. slug: accelerologger
.. date: 2017-07-28 06:46:44 UTC+10:00
.. tags: code, tip, hacking, hardware, children
.. category: 
.. link: 
.. description: EJBlogger asked for some code help on Bob's Drone Blog. Here is my input
.. type: text
-->

One of the Huon kids over at [Bob's Drone Blog](http://www.mrelliott.info/droneblog/) has a really cool Scientific Investigation Awards project - an Accelerometer data logger, or "Accelerologger" (I like the name too!). He's stuck with a small coding bug and has [asked for help](http://www.mrelliott.info/droneblog/2017/07/27/accelerologger-accelerometer-datalogger-help-needed-with-code/).  I think I see the problem. Wisely, Bob's disabled comments without a login (see my [Computing Rule 5](/blog/2015/4-bit-rules-of-computing-part-2.html)), so I'm adding notes here on my own blog.

<!-- TEASER_END -->
----


Here's EJBlogger's Arduino `loop` function, which contains the bug:

```c
void loop() {
  int x, y, z;
  adxl.readAccel(&x, &y, &z);
  switchState = digitalRead(switchPin);

  if (switchState == HIGH) {
    ctr++;
    if (ctr > threshold) {
      if (myFile) {
        myFile.println(y);
        Serial.println(y);
      }
      // if the file didn’t open, print an error:
      else {
        Serial.println("error opening test.txt");
      }
    }
    ctr = 0;
  } else
    {
      myFile.close();
      Serial.println("closed");
    }
}
```

The problem is that the `println(y)` statements never execute.  It is difficult to see why. Let's break it down a bit.

 * The code sets up some `x`,`y`,`z` variables and a `switchState`, and then reads in the values from the accelerometer and a switch.

 * When the `switchState` is `HIGH`:
   * Increment `ctr`
   * If the `ctr` is over `threshold` then print the `y` accelerometer reading
   * reset the counter

 * When the `switchState` is not `HIGH` (i.e. it's `LOW`):
   * close the logging file

You can probably already see the logic error now. If I Annotate EJBlogger's code with comments (gasp!, but see [Rule 0](/pg/4-bit-rules.html)) then it should really pop out:


```c
void loop() {
  int x, y, z;
  adxl.readAccel(&x, &y, &z);
  switchState = digitalRead(switchPin);

  if (switchState == HIGH) {
    ctr++;
    if (ctr > threshold) {
      if (myFile) {
        myFile.println(y);
        Serial.println(y);
      }
      else {  // the file didn’t open, print an error:
        Serial.println("error opening test.txt");
      }
      ctr = 0;
    } // ctr <= threshold
  } 
  else  // switchState != HIGH
    {
      myFile.close();
      Serial.println("closed");
    }
}
```

That's a little trick my high-school teacher showed me (back when they taught Pascal at school so it didn't look so uncouth): use comments to balance the code blocks when you're debugging logic errors.

It's clear that the `ctr` gets reset **each time the `switchState` is tested** and so it can never be greater than the `threshold`.   Instead, the `ctr` needs to be reset after printing the readouts but still within the `if (ctr > threshold)` block:


```c
void loop() {
  int x, y, z;
  adxl.readAccel(&x, &y, &z);
  switchState = digitalRead(switchPin);

  if (switchState == HIGH) {
    ctr++;
    if (ctr > threshold) {
      if (myFile) {
        myFile.println(y);
        Serial.println(y);
      }
      // if the file didn’t open, print an error:
      else {
        Serial.println("error opening test.txt");
      }
      ctr = 0;
    }
  } else
    {
      myFile.close();
      Serial.println("closed");
    }
}
```


----


## Some more insights

Why is EJBlogger using a counter here to only print every `threshold`th reading?  If he wanted to print fewer numbers he could instead `sleep` to slow it down.  I think the reason is that the `threshold` (set to 1,500 in the `setup` function, not reproduced here) is meant to smooth out the readings from the accelerometer, which can be a bit erratic.

But printing only every 1,500th reading doesn't smooth anything, it just takes a sample at that time.  Instead I think he should be *averaging* the values and then printing the average every `threshold`:


```c
void loop() {
  //define int x, y, z in setup instead
  // also define int sumX, sumY, sumZ in setup
  adxl.readAccel(&x, &y, &z);
  sumX += x;
  sumY += y;
  sumZ += z;
  
  switchState = digitalRead(switchPin);

  if (switchState == HIGH) {
    ctr++;
    if (ctr > threshold) {
      if (myFile) {
        myFile.println(sumY/threshold);
        Serial.println(sumY/threshold);
      }
      else {
        Serial.println("error opening test.txt");
      }
      sumX = 0;
      sumY = 0;
      sumZ = 0;
      ctr = 0;
    }
    
  } else //switchState != HIGH
    {
      myFile.close();
      Serial.println("closed");
    }
}
```


A [moving average](https://en.wikipedia.org/wiki/Moving_average) is probably a more correct approach than this simple average, but is more complex to calculate and probably involves arrays or a circular list -- too much to think about on the bus in to work.

One final observation: if you flip the switch `LOW` then the file is closed.  Flipping it back `HIGH` again will only cause the `Serial.println("error opening test.txt")` to occur because this code doesn't re-open the file from within the `loop`.  You'd have to reset the arduino so that `setup` runs again (re-opening the file and losing the previous recording). It might be worth thinking about a way to replace the error text with code to open the closed file or a fresh file with the date and time in its name.  Probably a new fuction that returns a `File` would be good, and you could replace 

```c
    else {
        Serial.println("error opening test.txt");
    }
```

with

```c
    else {
        myFile = openLoggingFile(theTime);
    }
```

Have a lot of fun!
