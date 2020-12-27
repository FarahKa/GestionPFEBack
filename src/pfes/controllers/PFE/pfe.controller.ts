import { Body, Controller, Get, Post } from '@nestjs/common';
import { PFE } from 'src/entities/pfe.entity';
import { SearchPFEsDto } from 'src/pfes/dto/search_pfes.dto';
import { ValidateInvalidateSubjectDto } from 'src/pfes/dto/validate-invalidate_subject.dto';
import { PfeService } from 'src/pfes/services/pfe/pfe.service';

@Controller('pfe')
export class PfeController {

    constructor(private pfeService: PfeService) {}
/*
    @Post("valider")
    validateSubject(@Body() body: ValidateInvalidateSubjectDto){ //: Promise<PFE> 
        this.pfeService.validateSubject()
    }

    @Post("invalider")
    invalidateSubject(@Body() body: ValidateInvalidateSubjectDto){ //: Promise<PFE> 
        this.pfeService.invalidateSubject()
    }

    @Get("sudents")
    getstudents(){
        return null
    }
    
    @Get("pfe_by_subject")
    getPFEsBySubject(@Body() body: SearchPFEsDto) : Promise<PFE[]>{ //: Promise<PFE> 
        this.pfeService.getPFEsBySubject()
        return null
    }

    @Get("pfe_by_student_id")
    getPFEsByStudentId(@Body() body: SearchPFEsDto) : Promise<PFE[]>{ //: Promise<PFE> 
        this.pfeService.getPFEsByStudentID()
        return null
    }

    @Get("pfe_by_hosting_enterprise")
    getPFEsByHostingEnterprise(@Body() body: SearchPFEsDto) : Promise<PFE[]>{ //: Promise<PFE> 
        this.pfeService.getPFEsByHostingEnterprise()
        return null
    }

    @Get("pfe_by_mentor_id")
    getPFEsByMentorId(@Body() body: SearchPFEsDto) : Promise<PFE[]>{ //: Promise<PFE> 
        this.pfeService.getPFEsByMentor()
        return null
    }

    @Get("pfe_by_keywords")
    getPFEsByKeywords(@Body() body: SearchPFEsDto) : Promise<PFE[]>{ //: Promise<PFE> 
        this.pfeService.getPFEsByKeywords()
        return null
    }*/
}

/*
L'administrateur pourra valider ou invalider un sujet ajouté par un étudiant
L'administrateur pourra consulter la liste des sujets de pfe par année universitaire
L'administrateur pourra rechercher un pfe
L'administrateur pourra consulter un pfe (état, fichiers d'il y en a, encadreurs, juré, session et soutenance si programmées)
L'administrateur pourra affecter un sujet de pfe à un encadrant
*/