<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Models\usuariosl;
class empleados_pendientesController extends Controller
{

    
    
    public function EmpleadosPendiente($idEmp)
    {
        $result = DB::select('SELECT * FROM vw_empleado_pendiente where emdempresa = (?);',[$idEmp]);
        $array = array();
        $arrayTotal = array();
        $Restotal_intralaboral;
        $Restotal_extralaboral = "";
        $Restotal_estres = "";
        for($i = 0, $size = count($result); $i < $size; ++$i)
        {
            $x = $result[$i];
                $emdcedula = $x -> emdcedula;
                $emdnombres= $x -> emdnombres;
                $emdapellidos= $x -> emdapellidos;
                $emdempresa= $x -> emdempresa;
                $empnombre= $x -> empnombre;
                $formato= $x -> formato;
                $emdactivo= $x -> emdactivo;
                $total_intralaboral= $x -> total_intralaboral;
                $total_extralaboral= $x -> total_extralaboral;
                $total_estres= $x ->total_estres;
                
                if($total_intralaboral == null){
                    $Restotal_intralaboral = 0;
                }else{
                     $Restotal_intralaboral = 1;
                }
                
                 if($total_extralaboral == null){
                    $Restotal_extralaboral = 0;
                }else{
                    $Restotal_extralaboral = 1;
                }
                
                 if($total_estres == null){
                    $Restotal_estres = 0;
                }else{
                    $Restotal_estres = 1;
                }
                
                
                $array = array("emdcedula"=>$emdcedula,
                               "emdnombres"=>$emdnombres,
                               "emdapellidos"=>$emdapellidos,
                               "emdempresa"=>$emdempresa,
                               "empnombre"=>$empnombre,
                               "formato"=>$formato,
                               "emdactivo"=>$emdactivo,
                               "total_intralaboral"=>$Restotal_intralaboral,
                               "total_extralaboral"=>$Restotal_extralaboral,
                               "total_estres"=>$Restotal_estres);
                array_push($arrayTotal,$array);
        }
        return $arrayTotal;
        
    }
}