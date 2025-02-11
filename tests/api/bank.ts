import { bankAccountSchema } from "@/app/schemas/bankAccountSchema";

// Define the BankAccount type based on the JSON schema
type BankAccount = {
    bank: string,
    agency: string,
    account: string,
    account_type: string
    id?: number | null;
};

// Bank account storage array
const bankAccountList: BankAccount[] = [];

/**
 * Adds a new bank account to the list.
 * @param newAccount - The new bank account object to add.
 * @returns The updated list of bank accounts.
 */
export function createBankAccount(newAccount: BankAccount): BankAccount[] {
    // Ensure new account follows the schema
    if (!newAccount.account ||
        !newAccount.agency ||
        !newAccount.bank ||
        !newAccount.account_type

    ) {
        throw new Error("Invalid bank account: Required fields are missing.");
    }

    // Assign a unique ID if not provided
    newAccount.id = newAccount.id ?? bankAccountList.length + 1;

    // Add to the list
    bankAccountList.push(newAccount);

    return bankAccountList;
}

/**
 * Retrieves a bank account by its ID.
 * @param id - The ID of the bank account to retrieve.
 * @returns The bank account object if found, or null if not found.
 */
export function getBankAccountById(id: number): BankAccount | null {
    return bankAccountList.find(account => account.id === id) || null;
}

/**
 * Retrieves all bank accounts from the list.
 * @returns An array of all stored bank accounts.
 */
export function getAllBankAccounts(): BankAccount[] {
    return bankAccountList;
}

/**
 * Updates an existing bank account by ID.
 * @param id - The ID of the bank account to update.
 * @param updatedData - The new bank account data to merge with the existing record.
 * @returns The updated bank account object, or null if not found.
 */
export function updateBankAccount(id: number, updatedData: Partial<BankAccount>): BankAccount | null {
    // Find index of the account with the given ID
    const index = bankAccountList.findIndex(account => account.id === id);

    // If not found, return null
    if (index === -1) {
        console.error(`Bank account with ID ${id} not found.`);
        return null;
    }

    // Merge existing data with new updates
    bankAccountList[index] = { ...bankAccountList[index], ...updatedData };

    // Return the updated bank account
    return bankAccountList[index];
}

/**
 * Deletes a bank account by ID.
 * @param id - The ID of the bank account to delete.
 * @returns True if the bank account was deleted, false if not found.
 */
export function deleteBankAccount(id: number): boolean {
    // Find index of the account with the given ID
    const index = bankAccountList.findIndex(account => account.id === id);

    // If not found, return false
    if (index === -1) {
        console.error(`Bank account with ID ${id} not found.`);
        return false;
    }

    // Remove the bank account from the array
    bankAccountList.splice(index, 1);
    return true;
}

// Example usage:
const newAccount: BankAccount = {
    account: "123456789",
    agency: "0001",
    bank: "Global Bank",
    account_type: "checking",

};

const validatedAccount = bankAccountSchema.parse(newAccount);

// CREATE
console.log(createBankAccount(validatedAccount));

// GET BY ID
const retrievedAccount = getBankAccountById(1);
console.log(retrievedAccount);

// GET ALL
console.log(getAllBankAccounts());

// UPDATE
const updatedAccount = updateBankAccount(1, { bank: "New Bank Corp" });
console.log(updatedAccount);

// DELETE
const isDeleted = deleteBankAccount(1);
console.log(`Deleted: ${isDeleted}`);
