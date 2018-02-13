import { Device } from 'app/models/device';
import { Segment } from 'app/models/segment';

export class Rule {
  id: number;
  preference: boolean;
  priority: number;

  inherit_hibernate: boolean;
  allow_hibernate: boolean;
  total_hibernate: boolean;
  delay_hibernate: number;

  inherit_intensity: boolean;
  intensity: number;
  intensity_value: string;
  intensity_sign: string;

  inherit_schedule: boolean;
  start_rule_hours: number;
  start_rule_minutes: number;
  end_rule_hours: number;
  end_rule_minutes: number;

  inherit_weather: boolean;
  raining: boolean;
  fog: boolean;

  enabled: boolean;

  segment: Segment;
  segment_id: number;

  device: Device;
  device_id: number;

};

export class ResultRule {
  rule: Rule;
  active: boolean;
  observation: string;
};

export class ResultStatus {
  resultRules: ResultRule[];
  intensity: number;
}
