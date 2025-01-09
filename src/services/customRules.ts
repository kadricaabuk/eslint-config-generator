import fs from 'fs';
import path from 'path';
import { CustomRuleSet, CustomRule } from '../types/index.js';
import { RuleLevel } from '../types/enums.js';

export class CustomRuleService {
  private readonly configPath: string;

  constructor() {
    this.configPath = path.join(process.cwd(), '.eslint-custom-rules.json');
  }

  public loadCustomRuleSets(): CustomRuleSet[] {
    if (!fs.existsSync(this.configPath)) {
      return [];
    }

    try {
      const content = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(content) as CustomRuleSet[];
    } catch (error) {
      console.error('Error loading custom rule sets:', error);
      return [];
    }
  }

  public saveCustomRuleSet(ruleSet: CustomRuleSet): void {
    const existingRuleSets = this.loadCustomRuleSets();
    const index = existingRuleSets.findIndex(rs => rs.name === ruleSet.name);

    if (index !== -1) {
      existingRuleSets[index] = ruleSet;
    } else {
      existingRuleSets.push(ruleSet);
    }

    fs.writeFileSync(this.configPath, JSON.stringify(existingRuleSets, null, 2), 'utf8');
  }

  public deleteCustomRuleSet(name: string): void {
    const existingRuleSets = this.loadCustomRuleSets();
    const filteredRuleSets = existingRuleSets.filter(rs => rs.name !== name);
    fs.writeFileSync(this.configPath, JSON.stringify(filteredRuleSets, null, 2), 'utf8');
  }

  public validateRule(rule: CustomRule): boolean {
    if (!rule.name || !rule.level) {
      return false;
    }

    if (!Object.values(RuleLevel).includes(rule.level)) {
      return false;
    }

    return true;
  }

  public validateRuleSet(ruleSet: CustomRuleSet): boolean {
    if (!ruleSet.name || !ruleSet.description || !Array.isArray(ruleSet.rules)) {
      return false;
    }

    return ruleSet.rules.every(rule => this.validateRule(rule));
  }
} 