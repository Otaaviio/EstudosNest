import { PartialType } from "@nestjs/mapped-types";
import { CriaRecadoDto } from "./cria-recado.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateRecadoDto extends PartialType(CriaRecadoDto) {

    @IsBoolean()
    @IsOptional()
    readonly lido?: boolean;

}
