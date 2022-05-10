import { Country } from "./country.model";

export interface Vote {
    firstPlace?: Country,
    secondPlace?: Country,
    thirdPlace?: Country
}