import { Injectable } from '@angular/core';

import { Rule, ResultRule, ResultStatus } from 'app/models/rule';

@Injectable()
export class SimulatorService {

  constructor() { }

  sortRulesByPriority(rules: Rule[]): Rule[] {
    var all_device_rules: Rule[];
    var preference_device_rules: Rule[];
    var device_rules: Rule[];
    var all_segment_rules: Rule[];
    var preference_segment_rules: Rule[];
    var segment_rules: Rule[];
    var all_rules: Rule[];
    var ruleSets: ResultRule[] = new Array<ResultRule>();

    all_device_rules = rules.filter((element)=>{
      return element.device_id != null;
    });

    preference_device_rules = all_device_rules.filter((element) => {
      return element.preference == true;
    });

    device_rules = all_device_rules.filter((element) => {
      return element.preference == false;
    });

    all_segment_rules = rules.filter((element)=>{
      return element.segment_id != null;
    });

    preference_segment_rules = all_segment_rules.filter((element) => {
      return element.preference == true;
    });

    segment_rules = all_segment_rules.filter((element) => {
      return element.preference == false;
    });


    preference_device_rules.sort(this.compareRulesPriority);
    device_rules.sort(this.compareRulesPriority);

    all_device_rules = preference_device_rules.concat(device_rules);

    preference_segment_rules.sort(this.compareRulesPriority);
    segment_rules.sort(this.compareRulesPriority);

    all_segment_rules = preference_segment_rules.concat(segment_rules);

    all_rules = all_device_rules.concat(all_segment_rules);
    return all_rules;
  }

  compareRulesPriority(ruleA: Rule, ruleB: Rule): number {
    if(ruleA.priority > ruleB.priority)
      return -1;
    else if(ruleA.priority < ruleB.priority)
      return 1;
    else {
      return 0;
    }
  }

  applyPolices(rules: Rule[], simulatorParameters: {
    enabled: boolean
    time: boolean,
    hours: number,
    minutes: number,
    raining: boolean,
    fog: boolean
  }): ResultStatus {
    var orderedRules: Rule[] = this.sortRulesByPriority(rules).reverse();
    var intensity: number = 0.0;
    var result: ResultStatus = new ResultStatus();

    result.resultRules = new Array<ResultRule>();

    orderedRules.forEach(rule => {
      var active = false;
      var observation = null;
      var resultRule: ResultRule = new ResultRule;
      var br: boolean = false;

      resultRule.rule = rule;

      if(simulatorParameters.enabled){

        if(rule.enabled == false){
          resultRule.active = false;
          resultRule.observation = "Motiu: No habilitada";
          br = true;
        }

        if(!br && simulatorParameters.time === true){
          var simulatorTime = new Date()
          simulatorTime.setHours(simulatorParameters.hours, simulatorParameters.minutes, 0);
          var startTimeRule = new Date()
          startTimeRule.setHours(rule.start_rule_hours, rule.start_rule_minutes, 0);
          var endTimeRule = new Date()
          endTimeRule.setHours(rule.end_rule_hours, rule.end_rule_minutes, 0);

          if(startTimeRule > endTimeRule) {
            if(simulatorTime > endTimeRule && simulatorTime < startTimeRule){
              resultRule.active = false;
              resultRule.observation = "Motiu: Horari";
              br = true;
            }
          } else {
            if(simulatorTime > endTimeRule || simulatorTime < startTimeRule){
              resultRule.active = false;
              resultRule.observation = "Motiu: Horari";
              br = true;
            }
          }
        }

        if(!br && rule.raining !== null){
          if(simulatorParameters.raining !== rule.raining ){
            resultRule.active = false;
            resultRule.observation = "Motiu: Condició climàtica de pluja";
            br = true;
          }
        }

        if(!br && rule.fog !== null){
          if(simulatorParameters.fog !== rule.fog ){
            resultRule.active = false;
            resultRule.observation = "Motiu: Condició climàtica de boira";
            br = true;
          }
        }

        if(!br){
          resultRule.active = true;
          intensity = this.getRuleIntensity(resultRule, intensity);
          resultRule.observation = null;
        }
      } else {
        resultRule.active = true;
        resultRule.observation = null;
      }

      result.resultRules.push(resultRule);
    });

    result.resultRules = result.resultRules.reverse();
    result.intensity = intensity

    return result;
  }

  clearPolices(resultStatus: ResultStatus): ResultStatus {
    resultStatus.intensity = null;
    resultStatus.resultRules.forEach(resultRule => {
      resultRule.active = null;
      resultRule.observation = null;
    });

    return resultStatus;
  }

  getRuleIntensity(resultRule: ResultRule, intensity: number): number {
    if(resultRule.rule.inherit_intensity)
      return intensity;

    if(resultRule.rule.intensity_value = "absolute")
      return resultRule.rule.intensity
    if(resultRule.rule.intensity_value = "percentual")
      return resultRule.rule.intensity
  }
}
