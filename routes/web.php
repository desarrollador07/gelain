<?php

use App\Http\Controllers\testController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



 Route::get('migration', function () {
    Artisan::call('migrate');
 });


 Auth::routes();
 Route::get('all', 'testController@index');
 Route::post('create', 'testController@store');
 Route::put('update/{id}', 'testController@update');
 Route::delete('delete/{id}', 'testController@destroy');
 
 Route::get('allp', 'pruebaController@index');
 Route::post('createp', 'pruebaController@store');
 Route::put('updatep/{id}', 'pruebaController@update');
 Route::delete('deletep/{id}', 'pruebaController@destroy');
 
 Route::get('allEmpresa', 'empresaController@index');
 Route::post('createEmpresa', 'empresaController@store');
 Route::put('updateEmpresa/{id}', 'empresaController@update');
 Route::delete('deleteEmpresa/{id}', 'empresaController@destroy');
 Route::get('getnobEmpresa/{idEmp}', 'empresaController@buscaridempresa');
 
 Route::get('allEmpleados', 'empleadosController@index');
 Route::get('allEmpleadosReportes/{idEmp}', 'empleadosController@indexReportes');
 Route::post('createEmpleados', 'empleadosController@store');
 Route::put('updateEmpleados/{id}', 'empleadosController@update');
 Route::delete('deleteEmpleados/{id}', 'empleadosController@destroy');
 Route::get('getid/{idEmp}', 'empleadosController@buscarid');
 Route::get('getidEmp/{idEmp}', 'empleadosController@buscaridEmp');
 Route::get('getidAreaEmp/{idEmp}/{idArea}', 'empleadosController@buscarIdAreaEmp');
 
 Route::get('TotalGeneral/{idEmp}', 'empleadosController@TotalGeneral');
 Route::get('TotalGeneralByFecha/{idEmp}/{fecha1}/{fecha2}', 'empleadosController@TotalGeneralByFecha');
 
 Route::get('updateEstado/{id}', 'empleadosController@updateEstado');
 Route::get('buscarEmpleadosFecha/{idEmp}/{fecha1}/{fecha2}', 'empleadosController@buscarEmpleadosFecha');
 
 Route::get('allArea', 'areaController@index');
 Route::post('createArea', 'areaController@store');
 Route::put('updateArea/{id}', 'areaController@update');
 Route::delete('deleteArea/{id}', 'areaController@destroy');
 Route::get('getideArea/{idEmp}', 'areaController@buscarid');
 Route::put('editArea/{id}', 'areaController@edit');
 
 
 
 Route::get('allformatoA', 'formatoAController@index');
 Route::post('createformatoA', 'formatoAController@store');
 Route::put('updateformatoA/{id}', 'formatoAController@update');
 Route::delete('deleteformatoA/{id}', 'formatoAController@destroy');
 Route::get('getideForA/{idEmp}', 'formatoAController@buscarid');

 Route::get('liderazgoRelacionesA/{idEmp}', 'formatoAController@liderazgoRelacionesA');
 Route::get('liderazgoRelacionesAByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoAController@liderazgoRelacionesAByFecha');
 
Route::get('controlSobreRol/{idEmp}', 'formatoAController@controlSobreRol');
Route::get('controlSobreRolByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoAController@controlSobreRolByFecha');

Route::get('DemandasTrabajo/{idEmp}', 'formatoAController@DemandasTrabajo');
Route::get('DemandasTrabajoByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoAController@DemandasTrabajoByFecha');

Route::get('recompensas/{idEmp}', 'formatoAController@recompensas');
Route::get('recompensasByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoAController@recompensasByFecha');
 
 Route::get('allformatoB', 'formatoBController@index');
 Route::post('createformatoB', 'formatoBController@store');
 Route::put('updateformatoB/{id}', 'formatoBController@update');
 Route::delete('deleteformatoB/{id}', 'formatoBController@destroy');
 Route::get('getideForB/{idEmp}', 'formatoBController@buscarid');
 
  Route::get('liderazgoRelacionesB/{idEmp}', 'formatoBController@liderazgoRelacionesB');
  Route::get('liderazgoRelacionesBByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoBController@liderazgoRelacionesBByFecha');
  
Route::get('controlSobreRolB/{idEmp}', 'formatoBController@controlSobreRolB');
Route::get('controlSobreRolBByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoBController@controlSobreRolBByFecha');

Route::get('DemandasTrabajoB/{idEmp}', 'formatoBController@DemandasTrabajoB');
Route::get('DemandasTrabajoBByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoBController@DemandasTrabajoBByFecha');

Route::get('recompensasB/{idEmp}', 'formatoBController@recompensasB');
Route::get('recompensasBByFecha/{idEmp}/{fecha1}/{fecha2}', 'formatoBController@recompensasBByFecha');
 
 Route::get('allestres', 'estresController@index');
 Route::post('createestres', 'estresController@store');
 Route::put('updateestres/{id}', 'estresController@update');
 Route::delete('deleteestres/{id}', 'estresController@destroy');
 Route::get('getideEstres/{idEmp}', 'estresController@buscarid');
 
 Route::get('ESTRES/{idEmp}', 'estresController@ESTRES');
 Route::get('ESTRESByFecha/{idEmp}/{fecha1}/{fecha2}', 'estresController@ESTRESByFecha');
 
 Route::get('ESTRES_DETALLES/{idEmp}', 'estresController@ESTRES_DETALLES');
 Route::get('ESTRES_DETALLESByFecha/{idEmp}/{fecha1}/{fecha2}', 'estresController@ESTRES_DETALLESByFecha');
 
 Route::get('allextra', 'extralaboralController@index');
 Route::post('createextra', 'extralaboralController@store');
 Route::put('updateextra/{id}', 'extralaboralController@update');
 Route::delete('deleteextra/{id}', 'extralaboralController@destroy');
 Route::get('getideExtra/{idEmp}', 'extralaboralController@buscarid');
 
 Route::get('PSICOSOCIAL_EXTRALABORAL/{idEmp}', 'extralaboralController@PSICOSOCIAL_EXTRALABORAL');
 Route::get('PSICOSOCIAL_EXTRALABORALByFecha/{idEmp}/{fecha1}/{fecha2}', 'extralaboralController@PSICOSOCIAL_EXTRALABORALByFecha');

Route::get('buscarReportesDetallados/{idEmp}/{valor}/{variable}/{tipo}/{fecha1}/{fecha2}', 'reportesController@buscarReportesDetallados');
Route::get('buscarReportesGenerales', 'reportesController@buscarReporteDetalladoGeneral');
Route::get('ReporteExcelDetallado/{idEmp}', 'reportesController@ReporteExcelDetallado');
Route::get('CiudadReporte/{idEmp}', 'reportesController@CiudadReporte');
Route::get('ReporteArea/{idEmp}', 'reportesController@reporteAreas');
Route::get('buscarAreaFecha/{idEmp}/{fecha1}/{fecha2}', 'reportesController@buscarAreaFecha');
Route::get('DatosFooter', 'utilsController@index');



Route::get('allvalorFisico', 'valorFisicoController@index');
Route::post('createValorFisico', 'valorFisicoController@store');
Route::put('updateValorFisico/{id}', 'valorFisicoController@update');
Route::delete('deleteValorFisico/{id}', 'valorFisicoController@destroy');
Route::get('getidempValor/{idEmp}', 'valorFisicoController@buscarValoracionFisica');
Route::get('buscarVFFecha/{idEmp}/{fecha1}/{fecha2}', 'valorFisicoController@buscarValoracionFisicaFecha');
Route::get('getidAreaVF/{idEmp}/{idArea}', 'valorFisicoController@buscarIdAreaVF');

Route::get('allvalorRiesgo', 'valorRiesgoController@index');
Route::post('createValorRiesgo', 'valorRiesgoController@store');
Route::put('updateValorRiesgo/{id}', 'valorRiesgoController@update');
Route::delete('deleteValorRiesgo/{id}', 'valorRiesgoController@destroy');
Route::get('getidempValorRiesgo/{idpempresa}', 'valorRiesgoController@buscarvaloracionRiesgo');
Route::get('getidAreaVR/{idEmp}/{idArea}', 'valorRiesgoController@buscarIdAreaVR');
  
Route::get('allUsers', 'usersController@index');
Route::post('createUser', 'usersController@store');
Route::put('updateUser/{id}', 'usersController@update');
Route::delete('deleteUser/{id}', 'usersController@destroy');

Route::get('allEmpleadosPendientes/{idemp}', 'empleados_pendientesController@EmpleadosPendiente');
  
  
 
 
 