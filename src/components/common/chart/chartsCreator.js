import * as d3 from 'd3';
import d3tip from 'd3-tip';
import moment from 'moment';
import _ from 'lodash';
import './styles/style.less';


export function LineChart (element, options, nature, parentWidth) {
    let self = this;

    let tip;
    let linesLayer;


    options.isHover = options.isHover || false;
    options.clickable = options.isHover || false;

    let dateDomain = options.dateDomain || [];

    let maxWidth = options.maxWidth || 500;

    //maxWidth = maxWidth - 50;

    //let _width = $(element).parent().width();
    let _width = parentWidth;

    if (_width < maxWidth) {
        _width = maxWidth;
    }
    // for add low and hight...



    options.margin = options.margin || {top: 50, right: 20, bottom: 50, left: 50};
    options.height = options.height || 280;

    let margin = options.margin || {top: 50, right: 20, bottom: 50, left: 50};

    let optionMarginLeftNew = options.margin.left;
    if(nature == 'Risk2'){
        optionMarginLeftNew +=50;
    }
    let width =  _width - optionMarginLeftNew - options.margin.right,
        height = options.height - options.margin.top - options.margin.bottom;


    let data;
    //let segment = $(element).parent().width();
    //let segment = parentWidth;

    //let element = element;

    //$(element).css("background", options.bgColor);
    //$(element).css("background", options.bgColor);

    //let parseDate = d3.time.format("%d-%b-%y").parse;
    let x = d3.time.scale()
        .range([0, width]);

    let y = d3.scale.linear()
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        //.tickSize(0)
        //.tickPadding(25)
        //.ticks(5)
        .orient("bottom");


    //let yAxis;
    let yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .tickFormat(d3.format("d"))
        .tickPadding(10)
        .orient("left");

    //let yAxis = d3.svg.axis()
    //    .scale(y)
    //    .tickSize(0)
    //    .tickFormat(d3.format("d"))
    //    .tickPadding(10)
    //    .orient("left");


    let line = d3.svg.line()
        .x(function (d) { return x(d.x); })
        .y(function (d) { return y(d.y); });


    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let uniqid = randLetter + Date.now();

    let originalWidth = width + optionMarginLeftNew + options.margin.right;
    let widthLeftPanelRight = originalWidth*0.1;
    let widthLeftPanel = originalWidth*0.9;

    /*let svgLeftPannel = d3.select(element).append("svg")
     .attr("class", "svg")
     .attr('id', 'chart' + uniqid)
     .attr("width", widthLeftPanelRight)
     .attr("height", height + options.margin.top + options.margin.bottom);
     */
    let svg = d3.select(element).append("svg")
        .attr("class", "svg")
        .attr('id', 'chart' + uniqid)
        .attr("width", widthLeftPanel)
        .attr("height", height + options.margin.top + options.margin.bottom);



    //let newMarginLeft = options.margin.left+widthLeftPanelRight;
    svg = svg.append("g")

        .attr("transform", "translate(" + optionMarginLeftNew + "," + options.margin.top + ")");


    addTooltip();

    self.render = function () {

        let maxValue = d3.max(data, function(d) { return d.y; }),
            minValue = d3.min(data, function(d) {
                return d.y;
            });


        if(_.isEmpty(dateDomain)) {
            x.domain(self._calcDateDomain(data));
        } else {
            x.domain(dateDomain);
        }

        y.domain([0, maxValue]);

        /* svg.append("rect")
         //.attr("class", "background")
         .attr('style', 'fill: #ffffff')
         .attr("rx", "5px")
         .attr("ry", "5px") //.attr('x',-30+'px').attr('y',-30+'px')
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom);*/

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + (0) + "," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);


        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("stroke", options.hash[options.type])
            .attr("d", line);

        // add label
        // Todo
        if(nature && nature == 'Risk2'){
            svg.append("text")
                .attr("class", "y axis")
                .attr("fill", '#cccccc')
                .attr("y", height)
                .attr("x", -100)
                .text("Low risk");

            svg.append("text")
                .attr("class", "y axis")
                .attr("fill", '#cccccc')
                .attr("y", 0)
                .attr("x", -100)
                .text("High risk");
        }




        //let topLine, midLine, bottomLine;
        //let maxValue = d3.max(data, function(d) { return d.y; });

        // Bottom line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", height)
            .attr("x2", width)
            .attr("y2", height)
            .attr("class", "grid-line")
            .attr("id", "bottom-line" + uniqid)
            .style("opacity", 0.1);

        // Mid line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", height/2)
            .attr("x2", width)
            .attr("y2", height/2)
            .attr("class", "grid-line")
            .attr("id", "mid-line" + uniqid)
            .style("opacity", 0.1);

        // bottom line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("class", "grid-line")
            .attr("id", "top-line" + uniqid)
            .style("opacity", 0.1);

        updateCircles();


    };

    self.onClick = function (i) {
        return;
    };


    self.update = function (__width) {

        // update width
        //width = parseInt(d3.select(element).style('width'), 10) || __width;
        width = window.innerWidth ||  __width;
        //debugger;

        width = width - optionMarginLeftNew - options.margin.right;


        if (width < maxWidth) {
            return;
        }

        // resize the chart
        x.range([0, width]);

        // get max value
        let maxValue = d3.max(data, function(d) {
                return d.y;
            }),
            minValue = d3.min(data, function(d) {
                return d.y;
            });

        //x.domain(d3.extent(data, function(d) {
        //    return d.x;
        //}));
        x = d3.time.scale()
            .range([0, width]);

        y = d3.scale.linear()
            .range([height, 0]);

        if(_.isEmpty(dateDomain)) {
            x.domain(self._calcDateDomain(data));
        } else {
            x.domain(dateDomain);
        }


        y.domain([0, maxValue]);


        // update axes
        xAxis = d3.svg.axis()
            .scale(x)
            //.tickPadding(25)
            //.ticks(5)
            //.tickSize(0)
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .tickPadding(10)
            .tickFormat(d3.format("d"))
            .orient("left");

        line.x(function (d) { return x(d.x); })
            .y(function (d) { return y(d.y); });




        svg.select(".x.axis")
            .call(xAxis);

        svg.select(".y.axis")
            .call(yAxis);

        svg.select(".line")
            .datum(data)
            .attr("d", line)
            .style('width', (width + optionMarginLeftNew + options.margin.right));

        //svg.select(".background")
        // .attr("width", width + margin.left + margin.right);

        d3.select('#chart' + uniqid)
            .attr("width", width + optionMarginLeftNew + options.margin.right);

        // update axes
        svg.select(".x.axis").call(xAxis.orient('bottom'));

        updateGridLines();
        updateCircles();

    };

    self._calcDateDomain = function(data) {
        let minmax = d3.extent(data, function(d) {
            return d.x;
        });
        minmax[0] = moment(minmax[0]).subtract('days', 3).toDate();
        minmax[1] = new Date();//moment(minmax[1]).add('days', 3).toDate();
        return minmax;
    };


    function updateGridLines() {
        let maxValue = d3.max(data, function(d) { return d.y; });

        // Bottom line

        let bottomLine = d3.select('#top-line' +uniqid)
            .attr("x1", 0)
            .attr("y1", height)
            .attr("x2", width)
            .attr("y2", height);

        // Mid line
        let midLine = d3.select('#mid-line' +uniqid)
            .attr("x1", 0)
            .attr("y1", height/2)
            .attr("x2", width)
            .attr("y2", height/2);

        // bottom line
        //let midLine = d3.select('#bottom-line' +uniqid)
        d3.select('#bottom-line' +uniqid)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0);


    }
    // add circles
    function updateCircles() {
        // circle layer
        let circleLayer = svg.selectAll('.circle-container')
            .data(data);

        let trx = 5;
        let trxTrans = x(trx);
        //UPDATE
        circleLayer.select('.outer-circle')
            .attr('cx', function (d) {
                let originX = d.x;
                let tranX = x(d.x);
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); });

        circleLayer.select('.inner-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); });

        circleLayer.select('.inner-dot-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); });




        //NEW
        // circles container
        let circleContainer = circleLayer
            .enter()
            .append('g')
            .attr("class", 'circle-container');



        function getColor(d,i) {
            if (d.isAlert) {
                return "red";
            } else {
                return options.hash[options.type];
            }
        }

        function getDotOpacticy(d, i) {
            if (d.isAlert) {
                return 1;
            } else {
                if (!options.isHover) {
                    return 1;
                }
            }

            return 0;
        }

        function getDotColor(d, i) {
            if (d.isAlert) {
                return "red";
            } else {
                return options.dotColor;
            }
        }

        function getdotSize(d, i, orignalRadius) {
            if (d.isAlert) {
                return orignalRadius + 2;
            }
            return orignalRadius;
        }

        function getStrokeWidth(d, i, orignalWidth) {
            if (d.isAlert) {
                return orignalWidth + 1;
            }
            return orignalWidth;
        }


        // wrapper circle
        circleContainer.append('circle')
            .attr("class", 'outer-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); })
            .attr('r', function (d, i) { return getdotSize(d,i,8); })
            .style('stroke', options.bgColor)
            .attr('fill', options.bgColor);

        circleContainer.append('circle')
            .attr("class", 'inner-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); })
            .attr('r', function (d, i) { return getdotSize(d,i,6); })
            .attr('fill', options.bgColor)
            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,1.5); })
            .attr('stroke', function (d, i) { return getColor(d,i); })
            .attr("id", function (d, i) { return "point_" + uniqid + "_" + i; } );




        // innner dot - opacity will change upon over events
        circleContainer.append('circle')
            .attr("class", 'inner-dot-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); })
            .attr('r', function (d, i) { return getdotSize(d,i,4);})
            .style('stroke', options.bgColor)
            .style('opacity', function (d, i) { return getDotOpacticy(d,i); } )
            .style('fill', function (d, i) { return getDotColor(d,i); })
            .attr("id", function (d, i) { return "inner_point_" + uniqid + "_" + i; } )
            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,1.5); });

        // circles events
        circleContainer
            .on("click", function(d,i) {
                tip.hide(d, d, this);
                let fn = self.onClick();
                if(fn) {
                    fn.apply(null, [d, i]);
                }
            })
            .on("mouseover", function(d, i) {

                if (options.isHover) {

                    if (!d.isAlert)	{
                        d3.select("#point_" + uniqid + "_" + i)
                            .attr("r", function (d, i) { return getdotSize(d,i,6);} )
                            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,2); });

                        d3.select("#inner_point_" + uniqid + "_" + i).style('opacity', '1');
                    }
                    tip.show(d, d, this);
                }

            })
            .on("mouseout", function(d, i) {

                if (options.isHover) {
                    if (!d.isAlert)	{
                        d3.select('#point_' + uniqid + "_" + i)
                            .attr("r", function (d, i) { return getdotSize(d,i,6);})
                            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,1.5); });

                        d3.select("#inner_point_" + uniqid + "_" + i).style('opacity', '0');
                    }
                    tip.hide(d, d, this);
                }
            });


        //EXIT
        circleLayer.exit().remove();

    }

    function formatGraphDate(date) {
        return moment(date).format("dddd, MMM D");
    }
    // Add tooltip  it is sow the data point at graph!!!
    function addTooltip() {
        //tip = d3.tip()
        tip = d3tip()
            .offset([-15,0])
            .attr("class", 'd3-tip ' + options.type)
            .attr('id', 'd3-tip')
            .style('background',options.hash[options.type])
            .style('white-space', 'pre')
            .style('text-align', 'center')
            .html(function(d) {
                if(d.y || d.y === 0)
                    return "<span>"+formatGraphDate(d.x)+"</span>"+"<br><br>"+"<span style='font-size: 25px'>"+ d.y+"</span>";
                else
                    return "<span>"+formatGraphDate(d.x)+"</span>";
            });
        //.html(function(d) { return d.y +'\n'+ formatGraphDate(d.x); });

        //console.log("THE ALL DATA IS: ", d);

        d3.select('.d3-tip').select('::after').style('background',options.hash[options.type]);
        svg.call(tip);
    }






    self.setOnClick = function(_) {
        if(_) self.onClick = _ || self.onClick;
        return self;
    };



    self.setData = function(_) {
        if(_) data = _;
        return self;

    };
    self.setDataDomain = function(_){
        if(_) dateDomain = _;
        return self;
    };

    self.setWidth = function(_) {
        if(_) _width = _;
        return self;

    };


    self.resize = function(width) {

        self.update(width);
    };


}

export function TwoLineChart (element, options, nature, parentWidth) {
    let self = this;

    let tip;
    let linesLayer;


    options.isHover = options.isHover || false;
    options.clickable = options.isHover || false;

    let dateDomain = options.dateDomain || [];
    if(dateDomain.length){
        let aaa = dateDomain;
    }
    let maxWidth = options.maxWidth || 500;


    //let _width = $(element).parent().width();
    let _width = parentWidth;

    if (_width < maxWidth) {
        _width = maxWidth;
    }


    options.margin = options.margin || {top: 50, right: 20, bottom: 50, left: 50};
    options.height = options.height || 280;

    let margin = options.margin || {top: 50, right: 20, bottom: 50, left: 50};

    let optionMarginLeftNew = options.margin.left;
    if (nature == 'Risk2') {
        optionMarginLeftNew += 50;
    }
    let width = _width - optionMarginLeftNew - options.margin.right,
        height = options.height - options.margin.top - options.margin.bottom;


    //////////**********************////////////////////////////////////////////////////////
    let data;
    let data2;
    //let segment = $(element).parent().width();
    //let element = element;

    //$(element).css("background", options.bgColor);
    //let parseDate = d3.time.format("%d-%b-%y").parse;

    let x = d3.time.scale()
        .range([0, width]);

    let y = d3.scale.linear()
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        //.tickSize(0)
        //.tickPadding(25)
        //.ticks(5)
        .orient("bottom");


    //let yAxis;
    let yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .tickFormat(d3.format("d"))
        .tickPadding(10)
        .orient("left");


    // paint the all lines in the graph!
    let line = d3.svg.line()
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y(d.y);
        });

    /*let line2 = d3.svg.line()
     .x(function (d) {
     return x(d.x);
     })
     .y(function (d) {
     return y(d.y);
     });*/


    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let uniqid = randLetter + Date.now();

    let originalWidth = width + optionMarginLeftNew + options.margin.right;
    let widthLeftPanel = originalWidth * 0.9;

    let svg = d3.select(element).append("svg")
        .attr("class", "svg")
        .attr('id', 'chart' + uniqid)
        .attr("width", widthLeftPanel)
        .attr("height", height + options.margin.top + options.margin.bottom);


    svg = svg.append("g")

        .attr("transform", "translate(" + optionMarginLeftNew + "," + options.margin.top + ")");


    addTooltip();

    self.render = function () {

        //let maxValueSec;
        //if(dataSec){
        //
        //    maxValueSec = d3.max(dataSec, function (d) {
        //        return d.y;
        //    });
        //}
        //let maxValue = null;
        //let minValue = null;
        let maxValue1 = null;
        let maxValue2 = null;
        let minValue1 = null;
        let minValue2 = null;
        if(data){
            maxValue1 = d3.max(data, function (d) {
                return d.y;
            }),
                minValue1 = d3.min(data, function (d) {
                    return d.y;
                });
        }
        if(data2){
            maxValue2 = d3.max(data2, function (d) {
                return d.y;
            }),
                minValue2 = d3.min(data2, function (d) {
                    return d.y;
                });
        }

        let maxValue = d3.max([maxValue1, maxValue2], function(d){
            return d;
        });
        let minValue = d3.min([minValue1, minValue2], function(d){
            return d;
        });


        if (_.isEmpty(dateDomain)) {
            x.domain(self._calcDateDomain(data, data2));
        } else {
            x.domain(dateDomain);
        }

        y.domain([0, maxValue]);


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + (0) + "," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);


        // paint the line of the first array!
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("stroke", options.hash[options.type])
            .attr("d", line);

        // paint the seconde line!
        svg.append("path")
            .datum(data2)
            .attr("class", "line line2")
            .attr("stroke", options.hash[options.type2])
            .attr("d", line);

        let circleContainier1 = svg.append("circle1");
        let circleContainier2 = svg.append("circle2");
        // add label
        if (nature && nature == 'Risk2') {
            svg.append("text")
                .attr("class", "y axis")
                .attr("fill", '#cccccc')
                .attr("y", height)
                .attr("x", -100)
                .text("Low risk");

            svg.append("text")
                .attr("class", "y axis")
                .attr("fill", '#cccccc')
                .attr("y", 0)
                .attr("x", -100)
                .text("High risk");
        }


        //let maxValue = d3.max(data, function (d) {
        //    return d.y;
        //});

        // Bottom line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", height)
            .attr("x2", width)
            .attr("y2", height)
            .attr("class", "grid-line")
            .attr("id", "bottom-line" + uniqid)
            .style("opacity", 0.1);

        // Mid line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", height / 2)
            .attr("x2", width)
            .attr("y2", height / 2)
            .attr("class", "grid-line")
            .attr("id", "mid-line" + uniqid)
            .style("opacity", 0.1);

        // bottom line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("class", "grid-line")
            .attr("id", "top-line" + uniqid)
            .style("opacity", 0.1);

        updateCircles();


    };


    self.onClick = function (i) {
        return;
    };


    self.update = function (__width) {

        // update width
        width = parseInt(d3.select(element).style('width'), 10) || __width;
        width = width - optionMarginLeftNew - options.margin.right;


        if (width < maxWidth) {
            return;
        }

        // resize the chart
        x.range([0, width]);

        // get max value
        /*let maxValue = d3.max(data, function (d) {
         return d.y;
         }),
         minValue = d3.min(data, function (d) {
         return d.y;
         });*/

        //////////////////////////////////////////


        let maxValue1 = null;
        let maxValue2 = null;
        let minValue1 = null;
        let minValue2 = null;
        if(data){
            maxValue1 = d3.max(data, function (d) {
                return d.y;
            }),
                minValue1 = d3.min(data, function (d) {
                    return d.y;
                });
        }
        if(data2){
            maxValue2 = d3.max(data2, function (d) {
                return d.y;
            }),
                minValue2 = d3.min(data2, function (d) {
                    return d.y;
                });
        }

        let maxValue = d3.max([maxValue1, maxValue2], function(d){
            return d;
        });
        let minValue = d3.min([minValue1, minValue2], function(d){
            return d;
        });



        //////////////////////////////////////////
        //x.domain(d3.extent(data, function(d) {
        //    return d.x;
        //}));
        x = d3.time.scale()
            .range([0, width]);

        y = d3.scale.linear()
            .range([height, 0]);

        if (_.isEmpty(dateDomain)) {
            x.domain(self._calcDateDomain(data, data2));
        } else {
            x.domain(dateDomain);
        }


        y.domain([0, maxValue]);

        // update axes
        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .tickPadding(10)
            .tickFormat(d3.format("d"))
            .orient("left");

        line.x(function (d) {
                return x(d.x);
            })
            .y(function (d) {
                return y(d.y);
            });

        svg.select(".x.axis")
            .call(xAxis);

        svg.select(".y.axis")
            .call(yAxis);

        svg.select(".line")
            .datum(data)
            .attr("d", line)
            .style('width', (width + optionMarginLeftNew + options.margin.right));

        svg.select(".line2")
            .datum(data2)
            .attr("d", line)
            .style('width', (width + optionMarginLeftNew + options.margin.right));



        d3.select('#chart' + uniqid)
            .attr("width", width + optionMarginLeftNew + options.margin.right);

        // update axes
        svg.select(".x.axis").call(xAxis.orient('bottom'));

        updateGridLines();
        updateCircles();

    };

    self._calcDateDomain = function (data, data2) {
        let mergeArr = data.concat(data2);
        let minmax = d3.extent(mergeArr, function (d) {
            return d.x;
        });
        minmax[0] = moment(minmax[0]).subtract('days', 3).toDate();
        minmax[1] = new Date();//moment(minmax[1]).add('days', 3).toDate();
        return minmax;
    };


    function updateGridLines() {
        let maxValue = d3.max(data, function (d) {
            return d.y;
        });

        // Bottom line

        let bottomLine = d3.select('#top-line' + uniqid)
            .attr("x1", 0)
            .attr("y1", height)
            .attr("x2", width)
            .attr("y2", height);

        // Mid line
        let midLine = d3.select('#mid-line' + uniqid)
            .attr("x1", 0)
            .attr("y1", height / 2)
            .attr("x2", width)
            .attr("y2", height / 2);

        // bottom line
        d3.select('#bottom-line' + uniqid)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0);


    }


    // add circles
    function updateCircles() {
        // delete the all old circle!!!!
        svg.selectAll(".circle-container").remove();
        svg.selectAll(".outer-circle").remove();
        svg.selectAll(".inner-circle").remove();

        _.forEach(data, function(d){
            d.color = options.hash[options.type];
            d.dotColor = options.hash[options.type];
            d.type = "typ1";

        });
        _.forEach(data2, function(d){
            d.color = options.hash[options.type2];
            d.dotColor = options.hash[options.type2];
            d.type = "typ2";

        });

        let dataTwoLines = data.concat(data2);
        _.forEach(data, function(d){
            dataTwoLines.push(d);
        });
        _.forEach(data2, function(d){
            dataTwoLines.push(d);
        });

        let circleLayer = svg.selectAll('.circle-container')
            .data(dataTwoLines);



        //UPDATE
        circleLayer.select('.outer-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) {
                return y(d.y);
            });

        circleLayer.select('.inner-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) {
                return y(d.y);
            });

        circleLayer.select('.inner-dot-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) {
                return y(d.y);
            });


        //NEW
        //circles container
        let circleContainer = circleLayer
            .enter()
            .append('g')
            .attr('class', 'circle-container');


        function getColor(d, i) {
            if (d.isAlert) {
                return "red";
            } else {
                //return options.hash[options.type]
                return d.color;
            }
        }

        function getDotColor(d, i) {
            if (d.isAlert) {
                return "red";
            } else {
                return d.dotColor;
            }
        }

        function getDotOpacticy(d, i) {
            if (d.isAlert) {
                return 1;
            } else {
                if (!options.isHover) {
                    return 1;
                }
            }

            return 0;
        }


        function getdotSize(d, i, orignalRadius) {
            if (d.isAlert) {
                return orignalRadius + 2;
            }
            return orignalRadius;
        }

        function getStrokeWidth(d, i, orignalWidth) {
            if (d.isAlert) {
                return orignalWidth + 1;
            }
            return orignalWidth;
        }


        // wrapper circle
        circleContainer.append('circle')
            .attr('class', 'outer-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) {
                return y(d.y);
            })
            .attr('r', function (d, i) {
                return getdotSize(d, i, 8);
            })
            .style('stroke', options.bgColor)
            .attr('fill', options.bgColor);

        circleContainer.append('circle')
            .attr('class', 'inner-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) {
                return y(d.y);
            })
            .attr('r', function (d, i) {
                return getdotSize(d, i, 6);
            })
            .attr('fill', options.bgColor)
            .attr('stroke-width', function (d, i) {
                return getStrokeWidth(d, i, 1.5);
            })
            .attr('stroke', function (d, i) {
                return getColor(d, i);
            })
            .attr("id", function (d, i) {
                return "point_" + uniqid + "_" + i;
            });


        // innner dot - opacity will change upon over events
        circleContainer.append('circle')
            .attr('class', 'inner-dot-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) {
                return y(d.y);
            })
            .attr('r', function (d, i) {
                return getdotSize(d, i, 4);
            })
            .style('stroke', options.bgColor)
            .style('opacity', function (d, i) {
                return getDotOpacticy(d, i);
            })
            .style('fill', function (d, i) {
                return getDotColor(d, i);
            })
            .attr("id", function (d, i) {
                return "inner_point_" + uniqid + "_" + i;
            })
            .attr('stroke-width', function (d, i) {
                return getStrokeWidth(d, i, 1.5);
            });

        // circles events
        circleContainer
            .on("click", function (d, i) {
                tip.hide(d, d, this);
                let fn = self.onClick();
                if (fn) {
                    fn.apply(null, [d, i]);
                }
            })
            .on("mouseover", function (d, i) {
                if (options.isHover) {
                    if (!d.isAlert) {
                        d3.select("#point_" + uniqid + "_" + i)
                            .attr("r", function (d, i) {
                                return getdotSize(d, i, 6);
                            })
                            .attr('stroke-width', function (d, i) {
                                return getStrokeWidth(d, i, 2);
                            });

                        d3.select("#inner_point_" + uniqid + "_" + i).style('opacity', '1');
                    }
                    tip.style('background', d.color);
                    tip.show(d, d, this);
                }

            })
            .on("mouseout", function (d, i) {

                if (options.isHover) {
                    if (!d.isAlert) {
                        d3.select('#point_' + uniqid + "_" + i)
                            .attr("r", function (d, i) {
                                return getdotSize(d, i, 6);
                            })
                            .attr('stroke-width', function (d, i) {
                                return getStrokeWidth(d, i, 1.5);
                            });

                        d3.select("#inner_point_" + uniqid + "_" + i).style('opacity', '0');
                    }
                    tip.hide(d, d, this);
                }
            });


        //EXIT
        circleLayer.exit().remove();
    }

    function formatGraphDate(date) {
        return moment(date).format("dddd, MMM D");
    }
    // Add tooltip  it is sow the data point at graph!!!
    function getStyle(d){
        return 'font-size: 25px';
    }
    function addTooltip() {
        tip = d3tip()
            .offset([-15, 0])
            .attr('class', 'd3-tip ' + options.type)
            .attr('id', 'd3-tip')
            .style('white-space', 'pre')
            .style('text-align', 'center')
            .html(function (d) {
                if (d.y || d.y === 0)
                    return "<span>" + formatGraphDate(d.x) + "</span>" + "<br><br>" + "<span style='font-size: 25px'>" + d.y + "</span>";
                else
                    return "<span>" + formatGraphDate(d.x) + "</span>";
            });
        //.html(function(d) { return d.y +'\n'+ formatGraphDate(d.x); });


        d3.select('.d3-tip').select('::after').style('background', options.hash[options.type]);
        svg.call(tip);
    }

    self.setOnClick = function (_) {
        if (_) self.onClick = _ || self.onClick;
        return self;
    };


    self.setData = function (d) {
        if (d) {
            data = _.cloneDeep(d.arr1);
            data2 = _.cloneDeep(d.arr2);
        }
        return self;
    };
    self.setDataDomain = function(_){
        if(_) dateDomain = _;
        return self;
    };

    self.setWidth = function (_) {
        if (_) _width = _;
        return self;
    };


    self.resize = function (width) {

        self.update(width);
    };

    /////////////////////////////////////////////////////


    //////////////******************************************************************/////////////

    //////////////******************************************************************/////////////

}

export function stickChart (element, options, nature, parentWidth) {
    let self = this;

    let tip;
    let linesLayer;


    options.isHover = options.isHover || false;
    options.clickable = options.isHover || false;

    let dateDomain = options.dateDomain || [];

    let maxWidth = options.maxWidth || 500;

    let _width = parentWidth;

    if (_width < maxWidth) {
        _width = maxWidth;
    }


    options.margin = options.margin || {top: 50, right: 20, bottom: 50, left: 50};
    options.height = options.height || 280;

    let margin = options.margin || {top: 50, right: 20, bottom: 50, left: 50};

    let width =  _width - options.margin.left - options.margin.right,
        height = options.height - options.margin.top - options.margin.bottom;


    let data;
    //let segment = $(element).parent().width();
    //let element = element;

    //$(element).css("background", options.bgColor);
    //let parseDate = d3.time.format("%d-%b-%y").parse;

    let x = d3.time.scale()
        .range([0, width]);

    let y = d3.scale.linear()
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        //.tickSize(0)
        //.tickPadding(25)
        //.ticks(5)
        .orient("bottom");


    let yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .tickFormat(d3.format("d"))
        .tickPadding(10)
        .orient("left");


    let line = d3.svg.line()
        .x(function (d) { return x(d.x); })
        .y(function (d) { return y(d.y); });


    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let uniqid = randLetter + Date.now();

    let svg = d3.select(element).append("svg")
        .attr("class", "svg")
        .attr('id', 'chart' + uniqid)
        .attr("width", width + options.margin.left + options.margin.right)
        .attr("height", height + options.margin.top + options.margin.bottom);




    svg = svg.append("g")
        .attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");


    addTooltip();

    self.render = function () {

        let maxValue = d3.max(data, function(d) { return d.y; }),
            minValue = d3.min(data, function(d) {
                return d.y;
            });


        if(_.isEmpty(dateDomain)) {
            x.domain(self._calcDateDomain(data));
        } else {
            x.domain(dateDomain);
        }

        y.domain([0, maxValue]);


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + (0) + "," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);










        //let maxValue = d3.max(data, function(d) { return d.y; });

        // Bottom line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", height)
            .attr("x2", width)
            .attr("y2", height)
            .attr("class", "grid-line")
            .attr("id", "bottom-line" + uniqid)
            .style("opacity", 0.1);

        // Mid line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", height/2)
            .attr("x2", width)
            .attr("y2", height/2)
            .attr("class", "grid-line")
            .attr("id", "mid-line" + uniqid)
            .style("opacity", 0.1);


        // bottom line
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("class", "grid-line")
            .attr("id", "top-line" + uniqid)
            .style("opacity", 0.1);

        updateCircles();
        updateLineData();


    };

    self.onClick = function (i) {
        return;
    };


    self.update = function (__width) {

        // update width
        width = parseInt(d3.select(element).style('width'), 10) || __width;
        width = width - options.margin.left - options.margin.right;


        if (width < maxWidth) {
            return;
        }

        // resize the chart
        x.range([0, width]);

        // get max value
        let maxValue = d3.max(data, function(d) {
                return d.y;
            }),
            minValue = d3.min(data, function(d) {
                return d.y- d.total;
            });

        //x.domain(d3.extent(data, function(d) {
        //    return d.x;
        //}));
        if(_.isEmpty(dateDomain)) {
            x.domain(self._calcDateDomain(data));
        } else {
            x.domain(dateDomain);
        }


        y.domain([0, maxValue]);

        // update axes
        xAxis = d3.svg.axis()
            .scale(x)
            //.tickPadding(25)
            //.ticks(5)
            //.tickSize(0)
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .tickPadding(10)
            .tickFormat(d3.format("d"))
            .orient("left");

        //line.x(function (d) { return x(d.x); })
        //    .y(function (d) { return y(d.y); });




        svg.select(".x.axis")
            .call(xAxis);

        svg.select(".y.axis")
            .call(yAxis);


        d3.select('#chart' + uniqid)
            .attr("width", width + options.margin.left + options.margin.right);

        // update axes
        svg.select(".x.axis").call(xAxis.orient('bottom'));


        updateGridLines();
        updateCircles();
        updateLineData();

    };

    self._calcDateDomain = function(data) {
        let minmax = d3.extent(data, function(d) {
            return d.x;
        });
        minmax[0] = moment(minmax[0]).subtract('days', 3).toDate();
        minmax[1] = new Date();//moment(minmax[1]).add('days', 3).toDate();
        return minmax;
    };


    function updateGridLines() {

        // here I paint the line between the height value and low value!!


        //let maxValue = d3.max(data, function(d) { return d.y; });

        // Bottom line

        d3.select('#top-line' +uniqid)
            .attr("x1", 0)
            .attr("y1", height)
            .attr("x2", width)
            .attr("y2", height);

        // Mid line
        d3.select('#mid-line' +uniqid)
            .attr("x1", 0)
            .attr("y1", height/2)
            .attr("x2", width)
            .attr("y2", height/2);


        // bottom line
        d3.select('#bottom-line' +uniqid)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0);


    }



    function updateLineData(){
        //lineLayer.exit().remove();

        // circle layer
        let lineData = [];
        _.forEach(data, function(d){
            lineData.push({'x1': d.x, 'y1': d.y-8, 'x2':d.x, 'y2': d.y - d.total+8});
        });

        let lineLayer = svg.selectAll('.line-container')
            .data(lineData);

        lineLayer.select('.outer-line')
            .attr('x1', function(d){ return x(d.x1);})
            .attr('y1', function(d){ return y(d.y1);})
            .attr('x2', function(d){ return x(d.x2);})
            .attr('y2', function(d){ return y(d.y2);})
            .attr('stroke', options.hash[options.type])
            .attr('stroke-width', '3.5px');

        let lineContainer = lineLayer
            .enter()
            .append('g')
            .attr('class', 'line-container');

        lineContainer.append('line')
            .attr('class', 'outer-line')
            .attr('x1', function(d){ return x(d.x1);})
            .attr('y1', function(d){ return y(d.y1);})
            .attr('x2', function(d){ return x(d.x2);})
            .attr('y2', function(d){ return y(d.y2);})
            .attr('stroke', options.hash[options.type])
            .attr('stroke-width', '3.5px');






        //UPDATE



        //NEW
        // circles container


        //EXIT delete old data...
        lineLayer.exit().remove();

    }


    // add circles
    function updateCircles() {

        // circle layer
        let lowerCircleData = _.cloneDeep(data);
        _.forEach(data, function(d){
            let newY = d.y - d.total;
            lowerCircleData.push({'x': d.x, 'y': newY, 'type': 'dia'});
        });

        let circleLayer = svg.selectAll('.circle-container')
            .data(lowerCircleData);

        //UPDATE
        circleLayer.select('.outer-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); });

        circleLayer.select('.inner-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); });

        circleLayer.select('.inner-dot-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); });




        //NEW
        // circles container
        let circleContainer = circleLayer
            .enter()
            .append('g')
            .attr('class', 'circle-container');



        function getColor(d,i) {
            if (d.isAlert) {
                return "red";
            } else {
                return options.hash[options.type];
            }
        }

        function getDotOpacticy(d, i) {
            if (d.isAlert) {
                return 1;
            } else {
                if (!options.isHover) {
                    return 1;
                }
            }

            return 0;
        }

        function getDotColor(d, i) {
            if (d.isAlert) {
                return "red";
            } else {
                return options.dotColor;
            }
        }

        function getdotSize(d, i, orignalRadius) {
            if (d.isAlert) {
                return orignalRadius + 2;
            }
            return orignalRadius;
        }

        function getStrokeWidth(d, i, orignalWidth) {
            if (d.isAlert) {
                return orignalWidth + 1;
            }
            return orignalWidth;
        }


        // wrapper circle
        circleContainer.append('circle')
            .attr('class', 'outer-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); })
            .attr('r', function (d, i) { return getdotSize(d,i,8); })
            .style('stroke', options.bgColor)
            .attr('fill', options.bgColor);

        circleContainer.append('circle')
            .attr('class', 'inner-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); })
            .attr('r', function (d, i) { return getdotSize(d,i,6); })
            .attr('fill', options.bgColor)
            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,1.5); })
            .attr('stroke', function (d, i) { return getColor(d,i); })
            .attr("id", function (d, i) { return "point_" + uniqid + "_" + i;} );




        // innner dot - opacity will change upon over events
        circleContainer.append('circle')
            .attr('class', 'inner-dot-circle')
            .attr('cx', function (d) {
                return x(d.x);
            })
            .attr('cy', function (d) { return y(d.y); })
            .attr('r', function (d, i) { return getdotSize(d,i,4);})
            .style('stroke', options.bgColor)
            .style('opacity', function (d, i) { return getDotOpacticy(d,i); } )
            .style('fill', function (d, i) { return getDotColor(d,i); })
            .attr("id", function (d, i) { return "inner_point_" + uniqid + "_" + i; } )
            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,1.5); });

        // circles events
        circleContainer
            .on("click", function(d,i) {
                tip.hide(d, d, this);
                let fn = self.onClick();
                if(fn) {
                    fn.apply(null, [d, i]);
                }
            })
            .on("mouseover", function(d, i) {

                if (options.isHover) {

                    if (!d.isAlert)	{
                        d3.select("#point_" + uniqid + "_" + i)
                            .attr("r", function (d, i) { return getdotSize(d,i,6);} )
                            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,2); });

                        d3.select("#inner_point_" + uniqid + "_" + i).style('opacity', '1');
                    }
                    tip.show(d, d, this);
                }

            })
            .on("mouseout", function(d, i) {

                if (options.isHover) {
                    if (!d.isAlert)	{
                        d3.select('#point_' + uniqid + "_" + i)
                            .attr("r", function (d, i) { return getdotSize(d,i,6);})
                            .attr('stroke-width', function (d, i) { return getStrokeWidth(d,i,1.5); });

                        d3.select("#inner_point_" + uniqid + "_" + i).style('opacity', '0');
                    }
                    tip.hide(d, d, this);
                }
            });


        //EXIT
        circleLayer.exit().remove();

    }

    function formatGraphDate(date) {
        return moment(date).format("dddd, MMM D");
    }
    // Add tooltip  it is sow the data point at graph!!!
    function addTooltip() {
        tip = d3tip()
            .offset([-15,0])
            .attr('class', 'd3-tip ' + options.type)
            .attr('id', 'd3-tip')
            .style('background',options.hash[options.type])
            .style('white-space', 'pre')
            .style('text-align', 'center')
            .html(function(d) {
                if(d.y)
                    return "<span>"+formatGraphDate(d.x)+"</span>"+"<br><br>"+"<span style='font-size: 25px'>"+ d.y+" "+"<div style='font-size: 15px'>"+d.type+"</div>"+"</span>";
                else
                    return "<span>"+formatGraphDate(d.x)+"</span>";
            });
        //.html(function(d) { return d.y +'\n'+ formatGraphDate(d.x); });

        //console.log("THE ALL DATA IS: ", d);

        d3.select('.d3-tip').select('::after').style('background',options.hash[options.type]);
        svg.call(tip);
    }






    self.setOnClick = function(_) {
        if(_) self.onClick = _ || self.onClick;
        return self;
    };



    // .datum(data.slice(i, i+2))
    self.setData = function(_) {
        if(_) data = _;
        return self;

    };
    self.setDataDomain = function(_){
        if(_) dateDomain = _;
        return self;
    };

    self.setWidth = function(_) {
        if(_) _width = _;
        return self;

    };


    self.resize = function(width) {

        self.update(width);
    };


}