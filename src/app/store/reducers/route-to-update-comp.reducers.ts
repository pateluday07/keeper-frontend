import { Action, createReducer, on } from "@ngrx/store";
import { routeToUpdateCompTrue } from "../actions/route-to-update-comp.actions";

export const initialState = {
    isRouteToUpdateComp: false
}

const _routeToUpdateCompReducer = createReducer(initialState,
    on(routeToUpdateCompTrue, state => { return { ...state, isRouteToUpdateComp: true } }));

export function routeToUpdateCompReducer(state: any, action: Action){
    return _routeToUpdateCompReducer(state, action);
}