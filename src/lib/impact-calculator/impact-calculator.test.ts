import {
  describe,
  expect,
  it,
} from "vitest";

import {
  calculateAppImpact,
  calculateAutomationImpact,
  calculateLandingPageImpact,
  calculateSystemImpact,
  calculateWebsiteImpact,
} from "./index";

describe("impact calculator", () => {
  it("calcula impacto da automação", () => {
    const result =
      calculateAutomationImpact({
        people: 2,
        weeklyHoursPerPerson: 10,
        hourlyCost: 50,
        automatablePercent: 70,
      });

    expect(result.monthlyHours).toBeCloseTo(
      86.6,
    );

    expect(
      result.automatedHoursMonthly,
    ).toBeCloseTo(60.62);

    expect(
      result.monthlyCapacity,
    ).toBeCloseTo(3031);
  });

  it("calcula oportunidade potencial de site", () => {
    const result =
      calculateWebsiteImpact({
        monthlyLeads: 100,
        averageTicket: 1000,
        conversionRate: 10,
        opportunityIncreasePercent: 10,
      });

    expect(
      result.newOpportunitiesMonthly,
    ).toBe(10);

    expect(
      result.additionalClientsMonthly,
    ).toBe(1);

    expect(
      result.potentialMonthlyRevenue,
    ).toBe(1000);
  });

  it("não permite meta de landing abaixo da conversão atual", () => {
    const result =
      calculateLandingPageImpact({
        monthlyTraffic: 1000,
        currentConversionRate: 5,
        averageTicket: 500,
        targetConversionRate: 2,
      });

    expect(
      result.targetConversionRate,
    ).toBe(5);

    expect(
      result.additionalConversions,
    ).toBe(0);
  });

  it("calcula capacidade liberada por sistema", () => {
    const result =
      calculateSystemImpact({
        collaborators: 5,
        weeklyProcessHours: 20,
        hourlyCost: 40,
        reductionPercent: 50,
        monthlyReworkCount: 10,
        hoursPerRework: 1,
      });

    expect(
      result.currentMonthlyHours,
    ).toBeCloseTo(96.6);

    expect(
      result.releasedMonthlyHours,
    ).toBeCloseTo(48.3);
  });

  it("calcula impacto de aplicativo", () => {
    const result =
      calculateAppImpact({
        objective: "service",
        monthlyUsers: 100,
        interactionsPerUser: 4,
        minutesSavedPerInteraction: 3,
        hourlyCost: 60,
      });

    expect(
      result.monthlyInteractions,
    ).toBe(400);

    expect(
      result.monthlyHoursSaved,
    ).toBe(20);

    expect(
      result.monthlyCapacity,
    ).toBe(1200);
  });

  it("protege os cálculos contra Infinity e números absurdos", () => {
    const result =
      calculateAutomationImpact({
        people: Infinity,
        weeklyHoursPerPerson: Infinity,
        hourlyCost: Infinity,
        automatablePercent: Infinity,
      });

    expect(
      Number.isFinite(result.monthlyCapacity),
    ).toBe(true);

    expect(
      Number.isFinite(result.annualCapacity),
    ).toBe(true);
  });
});