# debug mode
 - To show grid hit letter 'd'


# Effect class
 - constructor parameters {canvas}
 - set an array to store particles
 - set limited amount of particle
 - create cell size ' to split the canvas to rows and cols
 - make rows and cols varibles ' calculated in init function'
 - initalize flow field array with empty
 - initalize curve variable
 - initalize zoom variable
 - adding window event listener
 - ## init function
    ### create flow field
    - create rows height / cellsize
    - create clos
    - reset flowField
    - ## nested for loops to cycle inside every row
        - makee angle with cos verticl distance  + sin horizontal distance
        - multiply x and y with zoom property
        - multiply angle with curve
        - fill flow field with values
        -
    ### init particle array
    - initalize particles
 - # render func
    - render all objects inside particle array
    - draw and update them
 - # resize
 - reset canvas height and width
 - reset width and height of the canvas
 - call init function




# Particle class
- pass effect object to particle class
- randomize x , y positions
- ### varibles
    - x,y volcity
    - make history array " to store last postion"
    - max lenght of a line ' max number of sequments --- update method to remove item from history array
    - speed modifier
    - timer ' max length * 2 '
- ## draw func
    - begin path
    - move to ' with the first item in history array'
    - for loop to make new lines with line to 'contains the next item in history array postion
   
- ## update func
 - increase speed
    - speed x + cos
    - speed y + sin
 - push new postion object inside history array
    - compare array length with max length to remove item from history array
 - if the timer is les or equal to 1 we animate
 - else start to remove lines  if the history array containes more then one
 - else call reset
 - ### flow field
 - let a temprory x , y postion to equal this.x,y  / cell size
 - make index variable to indecate the position inside the flow field
 - attach angle value to the flow field index
 -
- ## reset
    - asine x,y positions to a new random value after the animation ends
    - reset history array
    - reset timer
# animation function
- request animation frames to make animation
- clear canvas screen
