import { createSelector } from "@ngrx/store";

export interface FeatureState {
    isRouteToUpdateComp: boolean;
}

export interface AppState {
    isRouteToUpdateCompState: FeatureState;
}

export const selectFeature = (state: AppState) => { return state.isRouteToUpdateCompState };

export const selectFeatureRouteToUpdateComp = createSelector(selectFeature,
    (state: FeatureState) => state.isRouteToUpdateComp);