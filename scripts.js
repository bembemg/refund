// Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Select list elements
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

// Capture input event to format value
amount.oninput = () => {
    // Catch de value and remove letters
    let value = amount.value.replace(/\D/g, "")

    // Transform the value in centavos (example: 150/100 = 1,50)
    value = Number(value) / 100

    // Update input value
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Format the value in the BRL standard
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

// Capture the submit event of form to obtain value
form.onsubmit = (event) => {
    // Prevents the default behavior of reloading the page
    event.preventDefault()

    // Create an object with expense details
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    }

    console.log(newExpense)

    // Calls the function
    expenseAdd(newExpense)

}

// Add new item on list
function expenseAdd(newExpense) {
    try {
        // Create the element for add item (li) to list (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Create the category icon
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Create expense info
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Create expense name
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Create expense category
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Add name and category in expense info div
        expenseInfo.append(expenseName, expenseCategory)

        // Add item value on list
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Create remove icon
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "./img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // Add item information
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Add item on list
        expenseList.append(expenseItem)
        
        // Update totals
        updateTotals()
        
    } catch (error) {
        // alert("Não foi possível atualizar a lista de despesas.")
        // console.log(error)
    }
}

// Update total value
function updateTotals() {
    try {
        // Retrieve all items (li) from the list (ul)
        const items = expenseList.children

        // Updates the number of items in the list
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // Variable to increment the total
        let total = 0

        // Go through each item (li) in the list (ul)
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            // Remove NaN characters and replace "," for "."
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            // Convert the value to float
            value = parseFloat(value)

            // Check if it is a valid number
            if(isNaN(value)){
                return alert("Não foi possível calcular o total. O valor não parece ser um número.")
            }

            // Increment total value
            total += Number(value)
        }

        // Create span to add format "R$"
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // Format value and remove the "R$" previously added <small> with css style
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        // Clean element content
        expensesTotal.innerHTML = ""

        // Add BRL symbol and value
        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais")
    }
}