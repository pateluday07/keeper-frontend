import { Action, createReducer, on } from "@ngrx/store";
import { routeToUpdateCompTrue, routeToUpdateCompFalse } from "../actions/route-to-update-comp.actions";

export const initialState = {
    isRouteToUpdateComp: false
}

const _routeToUpdateCompReducer = createReducer(initialState,
    on(routeToUpdateCompTrue, state => { return { ...state, isRouteToUpdateComp: true } }),
    on(routeToUpdateCompFalse, state => { return { ...state, isRouteToUpdateComp: false } }));

export function routeToUpdateCompReducer(state: any, action: Action){
    return _routeToUpdateCompReducer(state, action);
}