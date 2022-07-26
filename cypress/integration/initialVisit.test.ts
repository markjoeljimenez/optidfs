describe('Index', () => {
	beforeEach(() => {
		cy.intercept('/?provider=draftkings', { fixture: 'sports.json' }).as(
			'matchedUrl'
		);
		cy.intercept('/contests?provider=draftkings&sport=NBA&sportId=4', {
			fixture: 'contests.draftkings.json',
		}).as('matchedUrl');
		cy.intercept('/players?id=65923&provider=draftkings&gameType=Classic', {
			fixture: 'players.draftkings.json',
		}).as('matchedUrl');
	});

	it('should go to step 2 successfully', () => {
		// Start from the index page
		cy.visit('/');

		// Select provider
		cy.get('select[data-testid=provider-select]').select('draftkings');

		// Select sport
		cy.get('select[data-testid=sports-select]').select('NBA');

		// Click next
		cy.get('button[data-testid="to-next-step"]').click();

		// Assert
		expect(cy.url().should('include', '/optimize/start/2'));
	});

	it('should complete step 2 and go to dashboard successfully', () => {
		// Select contest
		cy.get('[data-testid="downshift"] button').click();
		cy.get('[data-testid="downshift"] li:first-child').click();
		cy.get('button[data-testid="to-next-step"]').click();

		// Assert
		expect(cy.url().should('eq', 'http://localhost:3000/optimize'));
	});

	it('should go back to step 1 if local storage is cleared', () => {
		// Start from the index page
		cy.visit('/');

		// Select provider
		cy.get('select[data-testid=provider-select]').select('draftkings');

		// Select sport
		cy.get('select[data-testid=sports-select]').select('NBA');

		// Click next
		cy.get('button[data-testid="to-next-step"]').click();

		// Clear storage and reload
		cy.clearLocalStorage();
		cy.reload();

		expect(cy.url().should('eq', 'http://localhost:3000/optimize/start/1'));
	});
});

export {};
