
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { empresaReducer, EmpresaState } from "./store/reducers/empresa.reducer";
import { hydrationMetaReducer } from "./store/reducers/hydrations.reducer";
import { ValoraFisicaState, valoraFisicaReducer } from './store/reducers/vf.reducer';



export interface AppState {
    empresas: EmpresaState;
    valoFisica: ValoraFisicaState;
}

export const appReducers: ActionReducerMap<AppState> = {
    empresas: empresaReducer,
    valoFisica: valoraFisicaReducer
};

// export const metaReducers: MetaReducer<any>[] = [hydrationMetaReducer];


