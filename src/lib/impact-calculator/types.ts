export type SolutionType =
  | "automation"
  | "website"
  | "landing-page"
  | "system"
  | "app";

export type AppObjective =
  | "service"
  | "automation"
  | "sales"
  | "customer-channel"
  | "internal";

export interface AutomationInput {
  people: number;
  weeklyHoursPerPerson: number;
  hourlyCost: number;
  automatablePercent: number;
}

export interface AutomationImpact {
  monthlyHours: number;
  automatedHoursMonthly: number;
  remainingHoursMonthly: number;
  monthlyCapacity: number;
  annualCapacity: number;
  annualHoursReleased: number;
}

export interface WebsiteInput {
  monthlyLeads: number;
  averageTicket: number;
  conversionRate: number;
  opportunityIncreasePercent: number;
}

export interface WebsiteImpact {
  monthlyLeads: number;
  currentClientsMonthly: number;
  newOpportunitiesMonthly: number;
  additionalClientsMonthly: number;
  additionalClientsAnnual: number;
  potentialMonthlyRevenue: number;
  potentialAnnualRevenue: number;
  conversionRate: number;
  opportunityIncreasePercent: number;
}

export interface LandingPageInput {
  monthlyTraffic: number;
  currentConversionRate: number;
  averageTicket: number;
  targetConversionRate: number;
}

export interface LandingPageImpact {
  monthlyTraffic: number;
  currentConversionRate: number;
  targetConversionRate: number;
  currentConversions: number;
  estimatedConversions: number;
  additionalConversions: number;
  potentialMonthlyRevenue: number;
  potentialAnnualRevenue: number;
}

export interface SystemInput {
  collaborators: number;
  weeklyProcessHours: number;
  hourlyCost: number;
  reductionPercent: number;
  monthlyReworkCount?: number;
  hoursPerRework?: number;
}

export interface SystemImpact {
  collaborators: number;
  currentMonthlyHours: number;
  remainingMonthlyHours: number;
  releasedMonthlyHours: number;
  avoidedReworkHoursMonthly: number;
  releasedAnnualHours: number;
  monthlyCapacity: number;
  annualCapacity: number;
  reductionPercent: number;
}

export interface AppInput {
  objective: AppObjective;
  monthlyUsers: number;
  interactionsPerUser: number;
  minutesSavedPerInteraction: number;
  hourlyCost: number;
}

export interface AppImpact {
  objective: AppObjective;
  monthlyInteractions: number;
  monthlyMinutesSaved: number;
  monthlyHoursSaved: number;
  annualHoursSaved: number;
  monthlyCapacity: number;
  annualCapacity: number;
}