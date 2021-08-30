
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { empresaReducer, EmpresaState } from "./store/reducers/empresa.reducer";
import { hydrationMetaReducer } from "./store/reducers/hydrations.reducer";



export interface AppState {
    empresas: EmpresaState;

   
}

export const appReducers: ActionReducerMap<AppState> = {
    empresas: empresaReducer,
};

// export const metaReducers: MetaReducer<any>[] = [hydrationMetaReducer];


