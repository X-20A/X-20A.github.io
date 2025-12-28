import { AdoptFleet } from "../../../models/fleet/AdoptFleet";

export const NO_CONDITIONS = 'No_conditions' as const;

export type CompositionCondition = boolean | 'No_conditions'

export interface QuestCompositionCondition {
    (fleet: AdoptFleet): CompositionCondition;
}