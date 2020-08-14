const TAX_TABLE_2019 = [
    {
        minIncome: 0,
        maxIncome: 18200,
        rate: 0,
        base: 0,
        message: 'Nil'
    },
    {
        minIncome: 18200,
        maxIncome: 37000,
        rate: 0.19,
        base: 0,
        message: '19c for each $1 over 18,200'
    },
    {
        minIncome: 37000,
        maxIncome: 90000,
        rate: 0.325,
        base: 3572,
        message: '$3,572 plus 32.5% of amounts over $37,000'
    },
    {
        minIncome: 90000,
        maxIncome: 180000,
        rate: 0.37,
        base: 20797,
        message: '$20,797 plus 37% of amounts over $90,000'
    },
    {
        minIncome: 180000,
        maxIncome: Infinity,
        rate: 0.45,
        base: 54097,
        message: '$54,096 plus 45% of amounts over $180,000'
    }    
];

function validateTaxTable(taxTable){
    for (let i = 0; i < taxTable.length - 1; i++) {
        if (taxTable[i].maxIncome !== taxTable[i + 1].minIncome) {
            return 'tax table is invalid'
        }
    }
}

function calculateTax(income, taxTable) {
    
    const getTaxConfigInRange = (config) => income > config.minIncome && income <= config.maxIncome;
    const taxConfigIndex = taxTable.findIndex(getTaxConfigInRange);
    
    if (taxConfigIndex === -1) {
        throw new Error('Can not find the tax config corresponding to Income');
    }

    const taxConfig = taxTable[taxConfigIndex];
    const {minIncome, rate, base, message } = taxConfig;
    
    const taxPayable = (income - minIncome) * rate + base;
    
    return {
        taxPayable,
        message,
        rate,
    };
};

const result = calculateTax(200000, TAX_TABLE_2019);