// core/domain/models/SecondGate.ts

export interface SecondGateState {
    state: 'open' | 'closed';
    timestamp?: Date;
  }
  
  export interface ISecondGateRepository {
    getSecondGateState(): Promise<SecondGateState>;
    updateSecondGateState(state: 'open' | 'closed'): Promise<void>;
  }
  