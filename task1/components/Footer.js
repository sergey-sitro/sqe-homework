// @ts-ignore
import { expect } from '@playwright/test';

export class Footer {
    constructor(page) {
        this.page = page;

        this.policies = page.locator('.policies');
        this.policyItems = this.policies.locator('ul a.fat-links');
    }

    async validatePolicies() {
        const expectedPolicies = [
            'INVESTORS',
            'COOKIE POLICY',
            'OPEN SOURCE',
            'APPLICANT PRIVACY NOTICE',
            'PRIVACY POLICY',
            'WEB ACCESSIBILITY'
        ];
        
        const policyTexts = await this.policyItems.evaluateAll(elements => elements.map(el => el.textContent.trim()));

        for (const policy of expectedPolicies) {
            await expect(policyTexts).toContain(policy);
        }
    }
}