import { Action, createReducer, on } from '@ngrx/store';
import * as valoraFisicaAction from '../actions/vf.actions';
import { ValorFisico } from '../../models/valorFisico.model';


export interface ValoraFisicaState {
    list: any[],
    valoraFisica?: ValorFisico
    valoraFisicas?: ValorFisico[];
}
const initialState: ValoraFisicaState = {
    list: [],
    valoraFisica: {}
}

const _valoraFisicaReducer = createReducer(
    initialState,
    on(valoraFisicaAction.addValoFisicas, (state, { list }) => ({
        ...state,
        list: [...list]
    })),
    on(valoraFisicaAction.listValoFisicas, (state) => ({
        ...state,
    })),
    on(valoraFisicaAction.addValoFisica, (state, { valoFisica }) => ({
        ...state,
        list: [...state.list, valoFisica]
    })),
    on(valoraFisicaAction.selectValoFisica, (state, { id }) => ({
        ...state,
        valoraFisica: state.list.find(el => el.vafid === id)
    })),
    on(valoraFisicaAction.deleteValoFisica, (state, { id }) => ({
        ...state,
        list: state.list.filter(x => x.id != id)
    })),
    on(valoraFisicaAction.updateListValoFisicas, (state, { id, valoFisica }) => ({
        ...state,
        list: state.list.map((el) => {
        
            if (el.id == id) {
                return el = {
                    ...valoFisica
                }

            } else {
                return el;
            }
        })
    }))
)


export function valoraFisicaReducer(state: ValoraFisicaState, action: Action) {
    return _valoraFisicaReducer(state, action);
}