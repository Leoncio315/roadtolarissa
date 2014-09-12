
var height = 300;

var svg = d3.select('#newton')
  .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var points = d3.range(-1, 25.5, .05)

function phi(x){ return x*x - 5; }
function toCord(point){ return [x(point[0]), y(point[1])]; }
function xPosToCord(x){ return toCord([x, phi(x)]); }

function positionCircle(selection){
  selection.attr({cx: x(xPos), cy: y(phi(xPos))})
}

var x = d3.scale.linear()
    .domain(d3.extent(points))
    .range([0, width])

var y = d3.scale.linear()
    .domain(d3.extent(points, phi))
    .range([height, 0])

var sqrtLine = d3.svg.line()
    .x(x)
    .y(_.compose(y, Math.sqrt))

var quadLine = d3.svg.line()
    .x(x)
    //.y(_.compose(y, _.partialRight(Math.pow, 2)))
    .y(_.compose(y, phi))

var path = svg.append('path')
   // .attr('d', sqrtLine(points))

var path2 = svg.append('path')
    .attr('d', quadLine(points))

svg.append('path')
    .attr('d', ['M', [0, y(0)], 'L', [width, y(0)]].join(''))
svg.append('path')
    .attr('d', ['M', [x(0), 0], 'L', [x(0), height]].join(''))

var xPos = .1;
var activeCircle = svg.append('circle')
    .attr('r', 10)
    .call(positionCircle)
    .on('mouseenter', function(){
      update();
    })

function update(){
  var m = 2*xPos
  xNew = -phi(xPos)/m + xPos;

  svg.append('path')
      .attr('d', ['M', xPosToCord(xPos), 'L', xPosToCord(xNew)].join(''))

  xPos = xNew;
  console.log(xPos);
  activeCircle.transition()
      .call(positionCircle)
}

//todo add shawdo circle
//keep list of previous poinsts
//adjust function