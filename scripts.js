// Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Select list elements
const expenseList = document.querySelector("ul")

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
        
    } catch (error) {
        // alert("Não foi possível atualizar a lista de despesas.")
        // console.log(error)
    }
}