//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }

            var canvas = new BuildingCanvas($content.find(".explanation")[0]);
            canvas.createCanvas(checkioInput);
            canvas.animateCanvas(checkioInput, explanation);


            this_e.setAnimationHeight($content.height() + 60);

        });


        function BuildingCanvas(dom) {
            var format = Raphael.format;
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var cell = 20;
            var N = 12;
            var fullSizeX = N * cell,
                fullSizeY = N * cell * 2 + cell;

            var delay = 500;
            var stepDelay = delay * 1.2;

            var paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);

            var attrAxis = {"stroke-width": 2, "stroke": colorBlue4, "arrow-end": "classic-wide-long"};
            var attrRect = {"stroke-width": 2, "stroke": colorBlue4, "fill": colorBlue1};
            var attrText = {"stroke": colorBlue4, "font-size": cell * 0.6, "font-family": "verdana"};

            this.createCanvas = function (buildings) {
                paper.path(format("M0,{0}V0", fullSizeX)).attr(attrAxis);
                paper.path(format("M0,{0}H{0}", fullSizeX)).attr(attrAxis);
                paper.path(format("M0,{0}V{1}", fullSizeY, fullSizeY - N * cell)).attr(attrAxis);
                paper.path(format("M0,{0}H{1}", fullSizeY, fullSizeX)).attr(attrAxis);

                for (var i = 0; i < buildings.length; i++) {
                    var b = buildings[i];
                    var h = (b[3] - b[1]) * cell;
                    var w = (b[2] - b[0]) * cell;
                    paper.rect(
                        b[0] * cell,
                        fullSizeY - (b[3] * cell),
                        w,
                        h
                    ).attr(attrRect);
                    paper.text(b[0] * cell + w / 2, fullSizeY - (b[3] * cell - h / 2), b[4]).attr(attrText);
                }
            };

            this.animateCanvas = function (buildings, order) {
                if (!order) {
                    order = [];
                    for (var i = 0; i < buildings.length; i++) {
                        order.push(i);
                    }
                    order.sort(function(a, b) {
                        return buildings[b][1] - buildings[a][1];
                    })
                }

                var heights = [];
                for (i = 0; i < buildings.length; i++) {
                    heights.push(buildings[i][4]);
                }
                var maxHeight = Math.max.apply(Math, heights);
                var unit = cell * 11 / maxHeight;
                for (i = 0; i < order.length; i++) {
                    setTimeout(function(){
                        var j = order[i];
                        var x = buildings[j][0] * cell;
                        var w = (buildings[j][2] - buildings[j][0]) * cell;
                        var h = buildings[j][4] * unit;
                        return function(){
                            paper.rect(x, fullSizeX, w, 0).attr(attrRect).animate({"y": fullSizeX - h, "height": h}, delay);
                        }
                    }(), stepDelay * i);
                }
            }

        }


    }
);
