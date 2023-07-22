import { SpecialRow } from "./specialRow";

export interface FunctionalInfo{
    title: string;
    returnVal?: string;
    annotation?: string;
    inputMaps? : Array<SpecialRow>;
    specialsMap? : Array<SpecialRow>;
}