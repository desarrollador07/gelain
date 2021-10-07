import { createAction, props } from '@ngrx/store';
import { ValorFisico } from '../../models/valorFisico.model';



export const listValoFisicas = createAction('[VF] List ValoFisicas');

export const addValoFisicas = createAction('[VF] Add List ValoFisicas', props<{ list: ValorFisico[] }>());

export const addValoFisica = createAction('[VF] Add ValoFisica', props<{ valoFisica: ValorFisico }>());

export const selectValoFisica = createAction('[VF] Select ValoFisica',props<{id:number}>())

export const updateListValoFisicas = createAction('[VF] Update List ValoFisicas', props<{ id: number, valoFisica: ValorFisico }>());

export const deleteValoFisica = createAction('[VF] Delete ValoFisica', props<{id: number}>());