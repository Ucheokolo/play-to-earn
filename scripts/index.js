let form = document.querySelector('form');
let nameInput = document.querySelector('#student');
let investTier = document.querySelector('#tier');
let investAmt = document.querySelector('#amount');
let investDate = document.querySelector('#date');
let investbtn = document.querySelector('#submit');
let mapInvestor = [];
let poolTotal = document.querySelector('.totaled');
window.withdrawalfunc = withdrawalfunc


// Object position in array
let currentId = 0;



// form Validation
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Form Validation
    if (!nameInput.value && !investTier.value && !investAmt.value && !investDate.value) {
        alert('Fill out all fields!');
        return
    }
    if (!nameInput.value) {
        nameInput.classList.add('errorClass');
        return
    }
    if (!investAmt.value) {
        investAmt.classList.add('errorClass');
        return
    }
    if (!investDate.value) {
        investDate.classList.add('errorClass');
        return
    }
    if (mapInvestor.length >= 12) {
        alert('Maximum Pool Entry Reached!!!')
        return;

    }

    if (investAmt.value != 10000 && investTier.value === 'silver') {
        investAmt.classList.add('errorClass');
        alert('Amount for this Tier is 10000')
        return
    }
    else if (investAmt.value != 20000 && investTier.value === 'gold') {
        investAmt.classList.add('errorClass')
        alert('Amount for this Tier is 20000')
        return
    }
    else if (investAmt.value != 30000 && investTier.value === 'platinum') {
        investAmt.classList.add('errorClass')
        alert('Amount for this Tier is 30000')
        return
    } else {
        //objects for table array(mapInvestor)
        let info = {
            id: currentId++,
            name: nameInput.value,
            invtier: investTier.value,
            invAmt: investAmt.value,
            invDate: investDate.value,
        }


        mapInvestor.push(info);
        populateData(mapInvestor);

        //total group savings
        let totals = mapInvestor.reduce((partialSum, a) => partialSum + parseInt(a.invAmt), 0);
        poolTotal.innerHTML = totals;

        //Interest display message
        let interestDisplay = document.querySelector('.interestDisplay');
        interestDisplay.innerText = `Your Expected Interest is ${getInterest(+investAmt.value)}\n
        Final Interest Dependent On Changes In Pool Total`;

        nameInput.value = ''
        investAmt.value = ''
        investDate.value = ''

    }

})

//function to populate table columns
function populateData(userArray) {
    let tdTemplate = mapInvestor.map((item, index) => {
        //Calculate withdrawal date
        let withdrawalDate = 24 * 60 * 60 * 1000 * 7 + Date.parse(item.invDate)
        return `<tr>
        <td>${item.name}</td>
        <td>${item.invtier}</td>
        <td>${item.invAmt}</td>
        <td>${item.invDate}</td>
        <td>${new Date(withdrawalDate).toLocaleDateString()}</td>
        <td>${getTotalWithdrawal(+item.invAmt)}</td>
        <td><button type='button' class='withdraw-button' onclick ='withdrawalfunc("${index}")'>Withdraw</button></td>
        </tr>`
    })

    let tableInfo = `<table class="enrolled">
    <tr class="display-header">
        <th class="name">Investor Name</th>
        <th class="tiers">Investment Tier</th>
        <th class="investment">Amount</th>
        <th class="inv-date">Investment Date</th>
        <th class="withdrawal-date">Withdrawal Date</th>
        <th class="withdrawal-amt">Total Withdrawal</th>
        <th class="action">Action</th>
     </tr>
        ${tdTemplate.join(' ')}
     </table>`
    newTable.innerHTML = tableInfo;
}

// function to calculate total withdrawal
function getTotalWithdrawal(amount) {
    let sum = mapInvestor.reduce((partialSum, a) => partialSum + parseInt(a.invAmt), 0);
    if (amount == 10000) {
        return +(sum * 0.05) + 10000;

    }

    if (amount == 20000) {
        return +(sum * 0.1) + 20000;

    }

    if (amount == 30000) {
        return +(sum * 0.2) + 30000;

    }

}

// function update table record after withdrawal
function withdrawalfunc(user) {
    mapInvestor.splice(user, 1);
    populateData(mapInvestor);
    let remainingTotal = mapInvestor.reduce((partialSum, a) => partialSum + parseInt(a.invAmt), 0);
    poolTotal.innerHTML = remainingTotal;
}

// function to get interest
function getInterest(money) {
    let sum = mapInvestor.reduce((partialSum, a) => partialSum + parseInt(a.invAmt), 0);
    if (money == 10000) {
        return +(sum * 0.05);

    }

    if (money == 20000) {
        return +(sum * 0.1);

    }

    if (money == 30000) {
        return +(sum * 0.2);

    }
}



