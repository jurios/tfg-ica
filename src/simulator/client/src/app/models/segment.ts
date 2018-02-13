import { Device } from '../models/device';

export class Segment {
  id: number;
  segment_id: string;
  devices_ids: number[];
  devices: Device[];
  segment_type_id: number;
}
