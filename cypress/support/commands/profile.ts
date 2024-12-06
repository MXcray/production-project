export const updateProfile = (firstname: string, lastname: string) => {
	cy.getByTestId(('EditableProfileCardHeader.EditButton')).click();
	cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
	cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
	cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
	return cy.request({
		method: 'PUT',
		url: `http://localhost:8000/profile/${profileId}`,
		headers: { Authorization: 'asdad' },
		body: {
			id: "4",
			first: "test",
			lastname: "user",
			age: 18,
			currency: "RUB",
			country: "Russia",
			city: "Izhevsk",
			username: "testuser",
			avatar: "https://i.pinimg.com/564x/d8/b1/c4/d8b1c4a62b80f8310aad578cf957f176.jpg"
		},
	})
}

declare global {
	namespace Cypress {
		interface Chainable {
			updateProfile(firstname: string, lastname: string): Chainable<void>;
			resetProfile(profileId: string): Chainable<void>;
		}
	}
}