# Table HTML
- Usually Table -> Caption(optional) -> colGroup(for grouping the column format, Usually
  apply style on the entire column) (optional) -> thead(optional) ->
  tfoot(optional) -> tbody(can be ommitted if the first inside table is tr right away)
  -> tfoot (only have tr in it)

- tr followed either by th if it is in the thead or td
- colgroup within will have col tag that you can set each column in the table


# CSS STuff
- [box-sizing](https://css-tricks.com/international-box-sizing-awareness-day/) : when setting up width and height of the content it is only
added to the element content not including the border and the padding, but
if there is a padding, then it will added to the width and the height of the
box that is rendered to the screen.
  - content-box: default, if you set the element content width to 100 pixel,
  and the width of the padding will be added to the rendered width.
  - border-box: tells the browser to account for any border and padding in
  the value you specify for width and height. If you set width for 100 pixel,
  then that 100 pixels will included the border padding that you add it.


# JS STuff
- removeEnventListener or addEventListener for capture parameter the difference,
is that event are execute on how they are defined.
- Capturing: the event goes down to the element
  - The last argument if it is true then it is capturing phase, if it is false then bubling phase
- Bubbling: When an event happens on an element, it first runs the handlers on it,
then on its parent, then all the way up on other ancestors.
- event.target, the most deeply nested element that cause the event is called
a target element, accessible as event.target
- Any event handler can stop the event by calling event.stopPropagation()


# Minimax STuff
- [minimax article](https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37)
- [Tic-tac-toe Tutorial](https://www.youtube.com/watch?v=P2TcQ3h0ipQ)
