function uuidv4() {
    return ([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g, function (c) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        }
	)
}
var removeLi = function (_uuid,col_name) {
    $(_uuid).remove();
    // getColumnLabel
    for(var i_l = 0; i_l < data_t_per.getNumberOfColumns(); i_l++){
        if(data_t_per.getColumnLabel(i_l) === col_name){
            data_r_per.removeColumn(i_l);
            data_t_per.removeColumn(i_l);
            data_r_par.removeColumn(i_l);
            data_t_par.removeColumn(i_l);
            options_r_per.colors.splice(i_l-1,1);
            options_t_per.colors.splice(i_l-1,1);
            options_r_par.colors.splice(i_l-1,1);
            options_t_par.colors.splice(i_l-1,1);
            for(var i = 0, x = 0; i < 90; i += 0.1 ){
                r.r_per[x].splice(i_l-1,1);
                r.t_per[x].splice(i_l-1,1);
                r.r_par[x].splice(i_l-1,1);
                r.t_par[x].splice(i_l-1,1);
                x++;
                r.size = x;
            }
            drawCharts();
			return;
        }
    }
}
function toRadians (angle) {
	return angle * (Math.PI / 180);
}
var ec_r_per = function (n1,n2,theta_i) {
	theta_i = toRadians(theta_i);
	return	(n1*Math.cos(theta_i) - n2*Math.cos(
			Math.asin(
				n1*Math.sin(theta_i)
				/
				n2
			)
			)
		)
		/
		(n1*Math.cos(theta_i) + n2*Math.cos(
				Math.asin(
					n1*Math.sin(theta_i)
					/
					n2
				)
			)
		)
};
var ec_t_per = function (n1,n2,theta_i) {
	theta_i = toRadians(theta_i);
	return	(2*n1*Math.cos(theta_i)
			)
		/
		(n1*Math.cos(theta_i) + n2*Math.cos(
				Math.asin(
					n1*Math.sin(theta_i)
					/
					n2
				)
			)
		)
};
var ec_r_par = function (n1,n2,theta_i) {
	theta_i = toRadians(theta_i);
	return	(n2*Math.cos(theta_i) - n1*Math.cos(
			Math.asin(
				n1*Math.sin(theta_i)
				/
				n2
			)
			)
		)
		/
		(n2*Math.cos(theta_i) + n1*Math.cos(
				Math.asin(
					n1*Math.sin(theta_i)
					/
					n2
				)
			)
		)
};
var ec_t_par = function (n1,n2,theta_i) {
	theta_i = toRadians(theta_i);
	return	(2*n1*Math.cos(theta_i)
			)
		/
		(n2*Math.cos(theta_i) + n1*Math.cos(
				Math.asin(
					n1*Math.sin(theta_i)
					/
					n2
				)
			)
		)
};

var noventa = [];
var r_per = [];
var t_per = [];
var r_par = [];
var t_par = [];
var r = {
    r_per : [],
    t_per : [],
    r_par : [],
    t_par : [],
    size: 0
};
for(var i = 0, x = 0; i < 90; i += 0.1 ){
    noventa[x] = x;
    r.r_per[x] = [i];
    r.t_per[x] = [i];
    r.r_par[x] = [i];
    r.t_par[x] = [i];
    x++;
    r.size = x;
}
calcular = function (n1,n2,index) {

    for(var i = 0, x = 0; i < 90; i += 0.1 ){
        r.r_per[x].push(ec_r_per(n1,n2,i));
        r.t_per[x].push(ec_t_per(n1,n2,i));
        r.r_par[x].push(ec_r_par(n1,n2,i));
        r.t_par[x].push(ec_t_par(n1,n2,i));
        x++;
        r.size = x;
    }
    return r;
}
var data_r_per,options_r_per, data_t_per,options_t_per, data_r_par,options_r_par, data_t_par,options_t_par;
drawCharts = function () {
	if(data_t_per.getNumberOfColumns()<2){
        $('#r_per').html('');
        $('#t_per').html('');
        $('#r_par').html('');
        $('#t_par').html('');
		return;
	}
	var chart_r_per = new google.visualization.LineChart(document.getElementById('r_per'));
	chart_r_per.draw(data_r_per, options_r_per);
	var chart_t_per = new google.visualization.LineChart(document.getElementById('t_per'));
	chart_t_per.draw(data_t_per, options_t_per);
	var chart_r_par = new google.visualization.LineChart(document.getElementById('r_par'));
	chart_r_par.draw(data_r_par, options_r_par);
	var chart_t_par = new google.visualization.LineChart(document.getElementById('t_par'));
	chart_t_par.draw(data_t_par, options_t_par);
}
onLoadedLibGoogleCharts = function () {
//***********************************************
//***********************************************
//*				r perpendicular					*
//***********************************************
//***********************************************

	data_r_per = new google.visualization.DataTable();
	data_r_per.addColumn('number', 'Angulo Incidente');
	options_r_per = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
			title: 'Coeficiente de reflexión'
		},
        colors: []
	};

//***********************************************
//***********************************************


//***********************************************
//***********************************************
//*				t perpendicular					*
//***********************************************
//***********************************************


	data_t_per = new google.visualization.DataTable();
	data_t_per.addColumn('number', 'Angulo Incidente');

	options_t_per = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
            title: 'Coeficiente de transmisión'
		},
        colors: []
	};
//***********************************************
//***********************************************


//***********************************************
//***********************************************
//*				r paralelo						*
//***********************************************
//***********************************************

	data_r_par = new google.visualization.DataTable();
	data_r_par.addColumn('number', 'Angulo Incidente');

	options_r_par = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
            title: 'Coeficiente de reflexión'
		},
        colors: []
	};
//***********************************************
//***********************************************


//***********************************************
//***********************************************
//*				t paralelo						*
//***********************************************
//***********************************************

	data_t_par = new google.visualization.DataTable();
	data_t_par.addColumn('number', 'Angulo Incidente');

	options_t_par = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
            title: 'Coeficiente de transmisión'
		},
        colors: []
	};
//***********************************************
//***********************************************
	drawCharts();
};
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(onLoadedLibGoogleCharts);
$().ready(function () {
	$('#medio_1_selector').change(function () {
        var v = $('#medio_1_selector').val()

        $('#medio_1_label').text('Medio 1 - ' + v)
    })
    $('#medio_2_selector').change(function () {
        var v = $('#medio_2_selector').val()

        $('#medio_2_label').text('Medio 2 - ' + v)
    })
	$('#addBtn').click(function () {
		var colorSelector = $('#colorSelector').val()
        var v1 = $('#medio_1_selector').val()
        var v2 = $('#medio_2_selector').val()
        var t1 = $('#medio_1_selector option:selected').text()
        var t2 = $('#medio_2_selector option:selected').text()
        var col_name = t1+' - '+v1+' *** '+t2+' - '+v2;
		for(var i_l = 0; i_l < data_t_per.getNumberOfColumns(); i_l++){
            if(data_t_per.getColumnLabel(i_l) === col_name){
            	alert('Ya existe es combinación');
            	return;
			}
		}
		if(v1 !== 'null' && v2 !== 'null'){
            var index = data_r_per.getNumberOfColumns() - 1;
			var r = calcular(v1,v2,index);
            data_r_per.removeRows(0,data_r_per.getNumberOfRows());
            data_t_per.removeRows(0,data_t_per.getNumberOfRows());
            data_r_par.removeRows(0,data_r_par.getNumberOfRows());
            data_t_par.removeRows(0,data_t_par.getNumberOfRows());

            data_r_per.addColumn('number', col_name);
            data_r_per.addRows(r.r_per);

            data_t_per.addColumn('number', col_name);
            data_t_per.addRows(r.t_per);

            data_r_par.addColumn('number', col_name);
            data_r_par.addRows(r.r_par);

            data_t_par.addColumn('number', col_name);
            data_t_par.addRows(r.t_par);

            var _uuid = uuidv4();
            options_r_par.colors.push(colorSelector);
            options_t_par.colors.push(colorSelector);
            options_r_per.colors.push(colorSelector);
            options_t_per.colors.push(colorSelector);
            drawCharts();
            var obj =
                '<li class="list-group-item" style="background: '+colorSelector+'; opacity: 0.9" id="'+_uuid+'">'+
                '<div class="row">'+
                '<span class="col-sm-11">'+col_name+'</span>'+
                '<div class="col-sm-1">'+
                '<button type="button" class="btn btn-outline-danger btn-sm" onclick="removeLi(\'#'+_uuid+'\',\''+col_name+'\')">X</button>'+
                '</div>'+
                '</div>'+
                '</li>';
            $('#mediosSeleccionados').append(obj)
		}

    })
})