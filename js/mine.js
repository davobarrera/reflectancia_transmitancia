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
for(var i = 0, x = 0; i < 90; i += 0.1 ){
	noventa[x] = x;
	r_per[x] = [i,ec_r_per(1,2.43,i)];
	t_per[x] = [i,ec_t_per(1,2.43,i)];
	r_par[x] = [i,ec_r_par(1,2.43,i)];
	t_par[x] = [i,ec_t_par(1,2.43,i)];
	x++;
}
calcular_r_per = function () {
	for(var i = 0, x = 0; i < 90; i += 0.01 ){
		noventa[x] = x;
		r_per[x] = [i,ec_r_per(1,2.43,i)];
		x++;
	}
	return r_per;
}
var data_r_per,options_r_per, data_t_per,options_t_per, data_r_par,options_r_par, data_t_par,options_t_par;
drawCharts = function () {
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
	data_r_per.addColumn('number', 'Índice de reflectancia');
	data_r_per.addRows(r_per);

	options_r_per = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
			title: 'Índice de reflectancia'
		},
		colors: ['#a52714', '#097138']
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
	data_t_per.addColumn('number', 'Índice de reflectancia');
	data_t_per.addRows(t_per);

	options_t_per = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
			title: 'Índice de reflectancia'
		},
		colors: ['#a52714', '#097138']
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
	data_r_par.addColumn('number', 'Índice de reflectancia');
	data_r_par.addRows(r_par);

	options_r_par = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
			title: 'Índice de reflectancia'
		},
		colors: ['#a52714', '#097138']
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
	data_t_par.addColumn('number', 'Índice de reflectancia');
	data_t_par.addRows(t_par);

	options_t_par = {
		hAxis: {
			title: 'Angulo incidente'
		},
		vAxis: {
			title: 'Índice de reflectancia'
		},
		colors: ['#a52714', '#097138']
	};
//***********************************************
//***********************************************
	drawCharts();
};
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(onLoadedLibGoogleCharts);