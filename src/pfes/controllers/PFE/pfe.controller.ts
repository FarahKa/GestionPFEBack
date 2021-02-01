import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PFE } from 'src/entities/pfe.entity';
import { SearchPFEsDto } from 'src/pfes/dto/search_pfes.dto';
import { ValidateInvalidateSubjectDto } from 'src/pfes/dto/validate-invalidate_subject.dto';
import { AffectSubjectToMentorDto } from 'src/pfes/dto/affect_sub_mentor.dto';
import { PfeService } from 'src/pfes/services/pfe/pfe.service';
import { ParseIntPipe } from '@nestjs/common';
import { CreatePFEDto } from 'src/pfes/dto/create_pfe.dto';
import { identity } from 'rxjs';

@Controller('pfe')
export class PfeController {

    /** 
     * IM REDOING THIS WHOLE THING TO MAKE IT JUST PULL ONCE FROM THE DB AND THE FILTERING WILL BE
     * DONE FL FRONT 
     * SO ALL THIS CLASS WILL DO IS GET ML SERVICE E NECESSARY JOINTS
     */

    constructor(private pfeService: PfeService) { }

    @Post("create")
    async postPFE(@Body() body: CreatePFEDto): Promise<PFE | void | undefined> {
        console.log("here")
        if (body.student_id)
            return await this.pfeService.create_PFE(body.student_id)
        return undefined
    }

    @Get(":id")
    async getPFEById(@Param('id', new ParseIntPipe()) id): Promise<PFE | undefined> {
        console.log(id)
        return await this.pfeService.get_PFE_by_id(id)
    }

    @Get("all")
    async getPFEs() {
        return await this.pfeService.get_PFEs_by_year_with_students_teachers(undefined)
    }

    @Get(":year/all")
    async getPFEsByYear(@Param('year', new ParseIntPipe()) year) {
        console.log(year)
        return await this.pfeService.get_PFEs_by_year_with_students_teachers(year)
    }
    /*
        @Get("pfes/etudiants")
        async getPFEById(body: ValidateInvalidateSubjectDto): Promise<PFE | undefined> {
            if (body.pfe_id)
                return await this.pfeService.getPFEById(body.pfe_id)
            return undefined
        }
    
    */
    @Post("validate")
    async validateSubject(@Body() body: ValidateInvalidateSubjectDto) {
        if (body.pfe_id)
            return await this.pfeService.validate_or_invalidate_subject(body.pfe_id, true)
        return undefined
    }

    @Post("invalidate")
    async invalidateSubject(@Body() body: ValidateInvalidateSubjectDto) {
        if (body.pfe_id)
            return await this.pfeService.validate_or_invalidate_subject(body.pfe_id, false)
        return undefined
    }
    /*
        @Get("pfes_by_subject_hosting_enterprise_year")
        async getPFEsBySubjectHostOrYear(@Body() body: SearchPFEsDto): Promise<PFE[] | undefined> { //: Promise<PFE>  
            return await this.pfeService.getPFEsBySubjectHostingEnterpriseOrYear(body.subject, body.hosting_enterprise, body.uni_year)
        }
    
        @Get("pfes_by_student_id_year")
        async getPFEsByStudentId(@Body() body: SearchPFEsDto): Promise<PFE[] | undefined> { //: Promise<PFE> 
            return await this.pfeService.getPFEsByStudentIDOrYear(body.student_id, body.uni_year)
        }
    
        @Get("pfes_by_mentor_id_subject_host_ent_year")
        async getPFEsByMentorANDSubjectHostEntANDYearANDFiliere(@Body() body: SearchPFEsDto): Promise<PFE[] | undefined> { //: Promise<PFE> 
            if (body.mentor_id)
                return await this.pfeService.getPFEsByMentorANDSubjectHostEntANDYearANDFiliere(body.mentor_id, body.subject, body.hosting_enterprise, body.uni_year, body.filiere)
            return undefined
        }
    
        @Get("pfes_by_year")
        async getPFEsByYear(@Body() body: SearchPFEsDto): Promise<PFE[]> { //: Promise<PFE> 
            return await this.pfeService.getPFEsByStudentIDOrYear(undefined, body.uni_year)
    
        }
    
        @Get("pfes_by_filiere")
        async getPFEsByFiliere(@Body() body: SearchPFEsDto): Promise<PFE[]> { //: Promise<PFE> 
            return await this.pfeService.getPFEsByStudentIDOrYear(undefined, body.uni_year)
    
        }
    
        @Post("affect_subject_to_mentor")
        async affectSubjectToMentor(@Body() body: AffectSubjectToMentorDto){
            if( body.mentor_id && body.pfe_id )
                return await this.pfeService.affectSubjectToMentor(body.mentor_id, body.pfe_id)
            return undefined
        }*/
}

/*
create pfe
delete pfe
update pfe
*/