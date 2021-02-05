import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PFE } from 'src/entities/pfe.entity';
import { SearchPFEsDto } from 'src/pfes/dto/search_pfes.dto';
import { ValidateInvalidateSubjectDto } from 'src/pfes/dto/validate-invalidate_subject.dto';
import { AffectSubjectToMentorDto } from 'src/pfes/dto/affect_sub_mentor.dto';
import { PfeService } from 'src/pfes/services/pfe/pfe.service';
import { ParseIntPipe } from '@nestjs/common';
import { CreatePFEDto } from 'src/pfes/dto/create_pfe.dto';
import { identity } from 'rxjs';
import { UpdatePFEDto } from 'src/pfes/dto/update_pfe.dto';
import { Soutenance } from 'src/entities/soutenance.entity';

@Controller('pfe')
export class PfeController {

    /** 
     * if you need anything 9oulouli eni w ill do it 
     * dont do it yourselves
     * 
     * 
     * 
     * ne9esni add w remove mentor to pfe 
     */

    constructor(private pfeService: PfeService) { }

    // create an empty pfe along with an empty soutenance
    @Post("create")
    async postPFE(@Body() body: CreatePFEDto): Promise<PFE | void | undefined> {
        console.log("here")
        if (body.student_id)
            return await this.pfeService.createPFE(body.student_id)
        return undefined
    }

    @Put("update")
    async updatePFE(@Body() body: UpdatePFEDto){
        return await this.pfeService.updatePFE(body)
    }

    @Get(":id")
    async getPFEById(@Param('id', new ParseIntPipe()) id): Promise<PFE | undefined> {
        console.log(id)
        return await this.pfeService.getPFEByID(id)
    }

    // get all pfes along with teacher and student data
    @Get("all")
    async getPFEs() {
        return await this.pfeService.get_PFEs_by_year_with_students_teachers(undefined)
    }

    // get all pfes of a specific year along with teacher and student data 
    @Get(":year/all")
    async getPFEsByYear(@Param('year', new ParseIntPipe()) year) {
        console.log(year)
        return await this.pfeService.get_PFEs_by_year_with_students_teachers(year)
    }
    
    @Post("validate/:pfe_id")
    async validateSubject(@Param('pfe_id', new ParseIntPipe()) pfe_id) {
            return await this.pfeService.validateOrInvalidateSubject(pfe_id, true)
    }

    @Post("invalidate/:pfe_id")
    async invalidateSubject(@Param('pfe_id', new ParseIntPipe()) pfe_id) {
            return await this.pfeService.validateOrInvalidateSubject(pfe_id, false)
    }

    @Get("student/:student_id")
    async getPFEsByStudentID(@Param("student_id", new ParseIntPipe()) student_id){
        return await this.pfeService.getPFEsByStudentID(student_id)
    }

    // maybe add more security bch maynajjamch a teacher ychouf e stuff mt3 another teacher ?
    @Get("encadrant/:year/:encadrant_id")
    async getPFEsByEncadrantID(@Param('year', new ParseIntPipe()) year, @Param("encadrant_id", new ParseIntPipe()) encadrant_id){
        return await this.pfeService.getPFEsByMentor(year, encadrant_id)
    }
/*
        @Post("affect_subject_to_mentor")
        async affectSubjectToMentor(@Body() body: AffectSubjectToMentorDto){
            if( body.mentor_id && body.pfe_id )
                return await this.pfeService.affectSubjectToMentor(body.mentor_id, body.pfe_id)
            return undefined
        }*/
}

/*
update pfe
*/