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
