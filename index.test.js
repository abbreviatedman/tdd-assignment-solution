const getCartTotal = require('./index');

it('returns 0 dollars and 0 cents if there are no items in the cart', () => {
    expect(getCartTotal([])).toBe('$0.00');
})

it('should return the total price for a single item in the cart.', () => {
    const cart = [{ name: 'apple', price: 1, weight: 0, quantity: 1 }];
    expect(getCartTotal(cart)).toBe("$1.00");
    const cart2 = [{ name: 'banana', price: 2, weight: 0, quantity: 1 }];
    expect(getCartTotal(cart2)).toBe("$2.00");
})

it('should return the total price for multiple items in the cart.', () => {
    const cart1 = [
        { name: 'apple', price: 1, weight: 0, quantity: 1 },
        { name: 'banana', price: 2, weight: 0, quantity: 1 }
    ]

    const cart2 = [
        { name: 'mango', price: 3, weight: 0, quantity: 1 },
        { name: 'orange', price: 4, weight: 0, quantity: 1 }
    ]

    expect(getCartTotal(cart1)).toBe('$3.00');
    expect(getCartTotal(cart2)).toBe('$7.00');
})

it('should return the total price for multiple items with quantity taken into account.', () => {
    const cart1 = [
        {
            name: 'apple',
            price: 1,
            weight: 0,
            quantity: 2
        },
        {
            name: 'banana',
            price: 2,
            weight: 0,
            quantity: 1
        }
    ]

    const cart2 = [
        {
            name: 'mango',
            price: 3,
            weight: 0,
            quantity: 3
        },
        {
            name: 'orange',
            price: 4,
            weight: 0,
            quantity: 2
        }
    ]

    expect(getCartTotal(cart1)).toBe('$4.00');
    expect(getCartTotal(cart2)).toBe('$17.00');
})

it('should return the total price for multiple items with shipping taken into account. Shipping will be $2 per pound of weight.', () => {
    const cart1 = [
        { name: 'apple', price: 1, weight: 2, quantity: 2 },
        { name: 'banana', price: 2, weight: 1, quantity: 1 }
    ]

    const cart2 = [
        { name: 'mango', price: 3, weight: 3, quantity: 3 },
        { name: 'orange', price: 4, weight: 2, quantity: 2 }
    ]

    expect(getCartTotal(cart1)).toBe('$10.00');
    expect(getCartTotal(cart2)).toBe('$27.00');
})

it('should return the total price for multiple items with shipping taken into account. Shipping will be $2 per pound of weight. If the total price without shipping or tax reaches $100, the shipping cost will be removed.', () => {
    const cart1 = [
        { name: 'watermelon', price: 15, weight: 10, quantity: 20 },
        { name: 'cantaloupe', price: 10, weight: 5, quantity: 1 }
    ]

    const cart2 = [
        { name: 'watermelon', price: 15, weight: 10, quantity: 6 },
        { name: 'cantaloupe', price: 10, weight: 5, quantity: 1 }
    ]

    expect(getCartTotal(cart1)).toBe('$310.00');
    expect(getCartTotal(cart2)).toBe('$100.00');
})

it('should take tax into account if passed a second argument. 3 states should be handled: NY has an 8% tax, MA has a 10% tax, NJ has a 5% tax. These taxes should apply only to the pre-shipping total.', () => {
    const cart1 = [
        { name: 'pumpkin', price: 10, weight: 20, quantity: 4 },
        { name: 'mango', price: 5, weight: 12, quantity: 32 }
    ]

    const cart2 = [
        { name: 'pumpkin', price: 10, weight: 5, quantity: 1 },
        { name: 'mango', price: 5, weight: 3, quantity: 8 }
    ]

    expect(getCartTotal(cart1, 'MA')).toBe('$220.00');
    expect(getCartTotal(cart2, 'NJ')).toBe('$68.50');
})