import { ActionReducer, INIT } from "@ngrx/store";
import { AppState } from "./../../app.reducer";

export function hydrationMetaReducer (
    reducer: ActionReducer<AppState>
): ActionReducer<AppState>  {
    return (state, action) => {
        if (action.type === INIT) {
            const storageValue = sessionStorage.getItem("state");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    sessionStorage.removeItem("state");
                }
            }
        }
        const nextState = reducer(state, action);
        const bandera = sessionStorage.getItem("idEmpresa");
        if (bandera === "0") {
            sessionStorage.removeItem("state");
        } else {
            sessionStorage.setItem("state", JSON.stringify(nextState));
            return nextState;
        } 
    };
};
