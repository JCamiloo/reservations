describe('Reservations', () => {
  const headers = { 'Content-Type': 'application/json' };
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'jcamilo.osorio15@gmail.com',
      password: 'StrongPassword123!@',
    };

    await fetch('http://auth:3001/users', {
      headers,
      method: 'POST',
      body: JSON.stringify(user),
    });

    const response = await fetch('http://auth:3001/auth/login', {
      headers,
      method: 'POST',
      body: JSON.stringify(user),
    });

    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const newReservation = await createReservation();
    const getResponse = await fetch(
      `http://reservations:3000/reservations/${newReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );

    const reservationFetched = await getResponse.json();
    expect(newReservation).toEqual(reservationFetched);
  });

  const createReservation = async () => {
    const createResponse = await fetch(
      'http://reservations:3000/reservations',
      {
        headers: {
          ...headers,
          Authentication: jwt,
        },
        method: 'POST',
        body: JSON.stringify({
          startDate: '2024/12/24',
          endDate: '2024/12/30',
          placeId: '123',
          invoiceId: '456',
          charge: {
            amount: 180,
            card: {
              cvc: '413',
              expMonth: 12,
              expYear: 2027,
              number: '4242 4242 4242 4242',
            },
          },
        }),
      },
    );

    expect(createResponse.ok).toBeTruthy();

    return createResponse.json();
  };
});
