import { createAction, props } from '@ngrx/store';
import { Empresa } from '../../models/empresa.model';



export const listEmpresas = createAction('[EMPRESAS] List Empresas');

export const addEmpresas = createAction('[EMPRESAS] Add List Empresas', props<{ list: Empresa[] }>());

export const addEmpresa = createAction('[EMPRESAS] Add Empresa', props<{ empresa: Empresa }>());

export const selectEmpresa = createAction('[EMPRESAS] Select Empresa',props<{id:number}>())

export const updateListEmpresas = createAction('[EMPRESAS] Update List Empresas', props<{ id: number, empresa: Empresa }>());

export const deleteEmpresa = createAction('[EMPRESAS] Delete Empresa', props<{id: number}>());