export const getMonthlySpends = (transactions) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const currentYear = currentDate.getFullYear();
    const monthlySpends = transactions.reduce((accumulator, transaction) => {
        const date = new Date(transaction.date);
        const transactionMonth = date.getMonth() + 1;
        const transactionYear = date.getFullYear();

        if (transactionMonth === currentMonth && transactionYear === currentYear) {
            accumulator += transaction.amount;
        }

        return accumulator;
    }, 0);

    return monthlySpends;
};

export const calculateInvestments = (investments) => {
    let totalValue = 0;
    
    investments.holdings.forEach(holding => {
        const { institution_price, quantity } = holding;
        totalValue += institution_price * quantity;
    });
    
    return totalValue;
}

export function getMonthlyIncomeAndOutcome(transactions) {
    const monthlyIncome = {};
    const monthlyOutcome = {};

    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        const amount = transaction.amount;

        if (!monthlyIncome[yearMonth]) {
            monthlyIncome[yearMonth] = [];
        }
        if (!monthlyOutcome[yearMonth]) {
            monthlyOutcome[yearMonth] = [];
        }

        if (amount > 0) {
            monthlyIncome[yearMonth].push(amount);
        } else {
            monthlyOutcome[yearMonth].push(-amount);
        }
    });

    // Fill in missing months with empty arrays
    const currentYear = new Date().getFullYear();
    for (let year = 2018; year <= currentYear; year++) {
        for (let month = 1; month <= 12; month++) {
            const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
            if (!monthlyIncome[yearMonth]) {
                monthlyIncome[yearMonth] = [];
            }
            if (!monthlyOutcome[yearMonth]) {
                monthlyOutcome[yearMonth] = [];
            }
        }
    }

    // Sum up the values for each month
    const summedIncome = [];
    const summedOutcome = [];
    for (let month = 1; month <= 12; month++) {
        const monthStr = month.toString().padStart(2, '0');
        let totalIncome = 0;
        let totalOutcome = 0;
        for (let year = 2018; year <= currentYear; year++) {
            const yearMonth = `${year}-${monthStr}`;
            totalIncome += monthlyIncome[yearMonth].reduce((acc, cur) => acc + cur, 0);
            totalOutcome += monthlyOutcome[yearMonth].reduce((acc, cur) => acc + cur, 0);
        }
        summedIncome.push(totalIncome);
        summedOutcome.push(totalOutcome);
    }

    return { summedIncome, summedOutcome };
}
