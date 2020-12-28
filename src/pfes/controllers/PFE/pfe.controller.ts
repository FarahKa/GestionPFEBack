import { Body, Controller, Get, Post } from '@nestjs/common';
import { PFE } from 'src/entities/pfe.entity';
import { SearchPFEsDto } from 'src/pfes/dto/search_pfes.dto';
import { ValidateInvalidateSubjectDto } from 'src/pfes/dto/validate-invalidate_subject.dto';
import { AffectSubjectToMentorDto } from 'src/pfes/dto/affect_sub_mentor.dto';
import { PfeService } from 'src/pfes/services/pfe/pfe.service';

@Controller('pfe')
export class PfeController {

    constructor(private pfeService: PfeService) { }

    @Get("pfe_by_id")
    async getPFEById(body: ValidateInvalidateSubjectDto): Promise<PFE | undefined> {
        if (body.pfe_id)
            return await this.pfeService.getPFEById(body.pfe_id)
        return undefined
    }

    @Post("validsate")
    async validateSubject(@Body() body: ValidateInvalidateSubjectDto) {
        if (body.pfe_id)
            return await this.pfeService.validateOrInvalidateSubject(body.pfe_id, true)
        return undefined
    }

    @Post("invalidate")
    async invalidateSubject(@Body() body: ValidateInvalidateSubjectDto) {
        if (body.pfe_id)
            return await this.pfeService.validateOrInvalidateSubject(body.pfe_id, false)
        return undefined
    }

    @Get("pfes_by_subject_hosting_enterprise_year")
    async getPFEsBySubjectHostOrYear(@Body() body: SearchPFEsDto): Promise<PFE[] | undefined> { //: Promise<PFE>  
        return await this.pfeService.getPFEsBySubjectHostingEnterpriseOrYear(body.subject, body.hosting_enterprise, body.uni_year)
    }

    @Get("pfes_by_student_id_year")
    async getPFEsByStudentId(@Body() body: SearchPFEsDto): Promise<PFE[] | undefined> { //: Promise<PFE> 
        return await this.pfeService.getPFEsByStudentIDOrYear(body.student_id, body.uni_year)
    }

    @Get("pfes_by_mentor_id_subject_host_ent_year")
    async getPFEsByMentorANDSubjectHostEntOrYear(@Body() body: SearchPFEsDto): Promise<PFE[] | undefined> { //: Promise<PFE> 
        if (body.mentor_id)
            return await this.pfeService.getPFEsByMentorANDSubjectHostEntOrYear(body.mentor_id, body.subject, body.hosting_enterprise, body.uni_year)
        return undefined
    }

    @Get("pfes_by_year")
    async getPFEsByYear(@Body() body: SearchPFEsDto): Promise<PFE[]> { //: Promise<PFE> 
        return await this.pfeService.getPFEsByStudentIDOrYear(undefined, body.uni_year)

    }

    @Post("affect_subject_to_mentor")
    async affectSubjectToMentor(@Body() body: AffectSubjectToMentorDto){
        if( body.mentor_id && body.pfe_id )
            return await this.pfeService.affectSubjectToMentor(body.mentor_id, body.pfe_id)
        return undefined
    }
}

/*
create pfe
delete pfe
update pfe
*/