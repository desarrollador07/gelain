import { ActionReducer, INIT } from "@ngrx/store";
import { AppState } from "./../../app.reducer";

export function hydrationMetaReducer (
    reducer: ActionReducer<AppState>
): ActionReducer<AppState>  {
    return (state, action) => {
        if (action.type === INIT) {
            const storageValue = localStorage.getItem("state");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("state");
                }
            }
        }
        const nextState = reducer(state, action);
        return nextState;
        
    };
};
