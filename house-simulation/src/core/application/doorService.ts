import { DoorState, IDoorRepository } from '../domain/models/door';

export class DoorService {
  constructor(private doorRepository: IDoorRepository) {}

  async getDoorState(): Promise<DoorState> {
    return this.doorRepository.getDoorState();
  }

  async updateDoorState(state: 'open' | 'closed'): Promise<void> {
    await this.doorRepository.updateDoorState(state);
  }
}
