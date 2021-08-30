import { Action, createReducer, on } from '@ngrx/store';
import { Empresa } from 'src/app/models/empresa.model';
import * as empresasAction from '../actions/empresa.actions';


export interface EmpresaState {
    list: any[],
    empresa?: Empresa
    empresas?: Empresa[];
}
const initialState: EmpresaState = {
    list: [],
    empresa: {}
}

const _empresaReducer = createReducer(
    initialState,
    on(empresasAction.addEmpresas, (state, { list }) => ({
        ...state,
        list: [...list]
    })),
    on(empresasAction.listEmpresas, (state) => ({
        ...state,
    })),
    on(empresasAction.addEmpresa, (state, { empresa }) => ({
        ...state,
        list: [...state.list, empresa]
    })),
    on(empresasAction.selectEmpresa, (state, { id }) => ({
        ...state,
        empresa: state.list.find(el => el.id == id)
    })),
    on(empresasAction.deleteEmpresa, (state, { id }) => ({
        ...state,
        list: state.list.filter(x => x.id != id)
    })),
    on(empresasAction.updateListEmpresas, (state, { id, empresa }) => ({
        ...state,
        list: state.list.map((el) => {
        
            if (el.id == id) {
                return el = {
                    ...empresa
                }

            } else {
                return el;
            }
        })
    }))
)


export function empresaReducer(state: EmpresaState, action: Action) {
    return _empresaReducer(state, action);
}