import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSoutenanceDto } from '../dto/create-soutenance.dto';
import { Soutenance } from '../../entities/soutenance.entity';

@Injectable()
export class SoutenanceService {
  constructor(
    @InjectRepository(Soutenance)
    private soutenanceRepository: Repository<Soutenance>,
  ) {}

  

//   async createSoutenance(newSoutenance: CreateSoutenanceDto): Promise<Soutenance> {
//     const soutenance = this.soutenanceRepository.create(newSoutenance);
//     return await this.soutenanceRepository.save(soutenance);
//   }

  findAll(): Promise<Soutenance[]> {
    return this.soutenanceRepository.find();
  }

  findOne(id: string): Promise<Soutenance> {
    return this.soutenanceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.soutenanceRepository.delete(id);
  }
}
