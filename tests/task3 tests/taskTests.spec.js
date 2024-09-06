// @ts-ignore
import { test, expect } from '@playwright/test';

test('Verify that allows creating a User', async ({ request }) => {
    const newUser = {
        id: 0,
        username: "john.smith",
        firstName: "John",
        lastName: "Smith",
        email: "j.smith@gmail.com",
        password: "Qwertyu1",
        phone: "358235912",
        userStatus: 0
    };
    
    const response = await request.post('https://petstore.swagger.io/v2/user', {
        data: newUser,
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(typeof responseBody.message).toBe('string');
});

test('Verify that allows login as a User', async ({ request }) => {
    const userName = 'john.smith';
    const userPassword = 'Qwertyu1'
    
    const response = await request.get(`https://petstore.swagger.io/v2/user/login?username=${userName}&password=${userPassword}`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toContain('logged in user session:');
});

test('Verify that allows creating the list of Users', async ({ request }) => {
    const newUsers = [
        {
            username: "john.smith",
            firstName: "John",
            lastName: "Smith",
            email: "j.smith@gmail.com",
            password: "Qwertyu1",
            phone: "358235912",
            userStatus: 0
        },
        {
            username: "tim.cook",
            firstName: "Tim",
            lastName: "Cook",
            email: "t.cook@apple.com",
            password: "Qwertyu1",
            phone: "358685912",
            userStatus: 0
        },
    ];
    
    const response = await request.post('https://petstore.swagger.io/v2/user/createWithArray', {
        data: newUsers,
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toBe('ok');
});

test('Verify that allows Log out User', async ({ request }) => {
    const response = await request.get(`https://petstore.swagger.io/v2/user/logout`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.code).toBe(200);
    expect(responseBody.type).toBe('unknown');
    expect(responseBody.message).toBe('ok');
});

test('Verify that allows adding a new Pet', async ({ request }) => {
    const newPet = {
        id: 0,
        category: {
          id: 0,
          name: "dog"
        },
        name: "doggie",
        photoUrls: [
          "https://petstore.com/pics-doggie"
        ],
        tags: [
          {
            id: 0,
            name: "tag"
          }
        ],
        status: "available"
    };
    
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
        data: newPet,
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(typeof responseBody.id).toBe('number');
    expect(responseBody.category.id).toBe(newPet.category.id);
    expect(responseBody.category.name).toBe(newPet.category.name);
    expect(responseBody.name).toBe(newPet.name);
    expect(responseBody.photoUrls[0]).toBe(newPet.photoUrls[0]);
    expect(responseBody.tags[0].id).toBe(newPet.tags[0].id);
    expect(responseBody.tags[0].name).toBe(newPet.tags[0].name);
    expect(responseBody.status).toBe(newPet.status);
});

test('Verify that allows updating Pet’s image', async ({ request }) => {
    const pet = {
        id: 0,
        category: {
          id: 0,
          name: "dog"
        },
        name: "doggie",
        photoUrls: [
          "https://petstore.com/pics-doggie"
        ],
        tags: [
          {
            id: 0,
            name: "tag"
          }
        ],
        status: "available"
    };
    
    const newPetResponse = await request.post('https://petstore.swagger.io/v2/pet', {
        data: pet,
    });

    const responseBody = await newPetResponse.json();

    const petId = await responseBody.id
    const petWithNewPic = {
        ...pet,
        id: petId,
        photoUrls: [
            "https://petstore.com/new-pic-doggie"
        ]
    }

    const newPetPicResponse = await request.put('https://petstore.swagger.io/v2/pet', {
        data: petWithNewPic,
    });

    const newPetPicResponseBody = await newPetPicResponse.json();

    expect(newPetPicResponse.status()).toBe(200);
    expect(newPetPicResponseBody.photoUrls[0]).toBe(petWithNewPic.photoUrls[0]);
});

test('Verify that allows updating Pet’s name and status', async ({ request }) => {
    const pet = {
        id: 0,
        category: {
          id: 0,
          name: "dog"
        },
        name: "doggie",
        photoUrls: [
          "https://petstore.com/pics-doggie"
        ],
        tags: [
          {
            id: 0,
            name: "tag"
          }
        ],
        status: "available"
    };
    
    const newPetResponse = await request.post('https://petstore.swagger.io/v2/pet', {
        data: pet,
    });

    const responseBody = await newPetResponse.json();

    const petId = await responseBody.id
    const petWithNewNameAndStatus = {
        ...pet,
        id: petId,
        name: "new doggie",
        status: "reserved"
    }

    const newPetPicResponse = await request.put('https://petstore.swagger.io/v2/pet', {
        data: petWithNewNameAndStatus,
    });

    const newPetNameStatusResponseBody = await newPetPicResponse.json();

    expect(newPetPicResponse.status()).toBe(200);
    expect(newPetNameStatusResponseBody.name).toBe(petWithNewNameAndStatus.name);
    expect(newPetNameStatusResponseBody.status).toBe(petWithNewNameAndStatus.status);
});

test('Verify that allows deleting Pet', async ({ request }) => {
    const pet = {
        id: 0,
        category: {
          id: 0,
          name: "dog"
        },
        name: "doggie",
        photoUrls: [
          "https://petstore.com/pics-doggie"
        ],
        tags: [
          {
            id: 0,
            name: "tag"
          }
        ],
        status: "available"
    };
    
    const newPetResponse = await request.post('https://petstore.swagger.io/v2/pet', {
        data: pet,
    });

    const responseBody = await newPetResponse.json();

    const petId = await responseBody.id

    const deletePetResponse = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);

    const deletePetResponseBody = await deletePetResponse.json();

    expect(deletePetResponse.status()).toBe(200);
    expect(deletePetResponseBody.type).toBe("unknown");
    expect(deletePetResponseBody.message).toBe(`${petId}`);
});