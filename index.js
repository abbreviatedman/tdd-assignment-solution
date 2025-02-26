function getCartTotal(cart, state = 'none') {
    const taxMultipliers = {
        MA: 1.1,
        NJ: 1.05,
        NY: 1.08,
        none: 1
    }

    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }

    total *= taxMultipliers[state];

    if (total < 100) {
        for (const item of cart) {
            total += item.weight * 2;
        }
    }

    return '$' + total.toFixed(2);
}

module.exports = getCartTotal;