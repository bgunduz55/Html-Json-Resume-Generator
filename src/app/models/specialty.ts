import { FunctionalInfo } from "./functionalInfo";
import { SpecialRow } from "./specialRow";

export interface Specialty{
    title: string;
    annotation?: string;
    specialsMap : Array<SpecialRow>;
    functionalInfos?: Array<FunctionalInfo>;
}