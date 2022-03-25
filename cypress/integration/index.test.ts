describe('Index', () => {
	it('should go to step 2 successfully', () => {
		// Start from the index page
		cy.visit('/');

		// Select provider
		cy.get('#selectProvider').select('Yahoo');

		// Select sport
		cy.get('#selectSport').select('NBA');

		// Click next
		cy.get('button[data-testid="to-next-step"]').click();

		// expect(cy.get('h1'))

		// // Find a link with an href attribute containing "about" and click it
		// cy.get('a[href*="about"]').click();

		// // The new url should include "/about"
		// cy.url().should('include', '/about');

		// // The new page should contain an h1 with "About page"
		// cy.get('h1').contains('About Page');
	});
});

export {};
