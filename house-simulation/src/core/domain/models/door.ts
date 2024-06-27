export interface DoorState {
  id?: number;
  state: 'open' | 'closed';
  timestamp?: Date;
}

export interface IDoorRepository {
  getDoorState(): Promise<DoorState>;
  updateDoorState(state: 'open' | 'closed'): Promise<void>;
}
