import { addressSchema } from "@/app/schemas/addressSchema";

// Define the AddressInput type based on the JSON schema
type AddressInput = {
    version?: number | null;
    id?: number | null;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zip_code: string;
    state: string;
    employee?: number | null;
};

// Address storage array
const addressList: AddressInput[] = [];

// addressSchema = AddressSchema

/**
 * Adds a new address to the address list.
 * @param newAddress - The new address object to add.
 * @returns The updated list of addresses.
 */
// function createAddress(newAddress: AddressSchema): AddressSchema[] {
export function createAddress(newAddress: AddressInput): AddressInput[] {
    // Ensure new address follows the schema
    if (!newAddress.street ||
         !newAddress.city ||
         !newAddress.zip_code ||
         !newAddress.state
        ) {
        throw new Error("Invalid address: Required fields are missing.");
    }

    // Assign a unique ID if not provided
    newAddress.id = newAddress.id ?? addressList.length + 1;

    // Add to the list
    addressList.push(newAddress);

    return addressList;
}



/**
 * Retrieves an address by its ID.
 * @param id - The ID of the address to retrieve.
 * @returns The address object if found, or null if not found.
 */
// function getAddressById(id: number): AddressSchema | null {
export function getAddressById(id: number): AddressInput | null {
    return addressList.find(address => address.id === id) || null;
}

/**
 * Retrieves all addresses from the address list.
 * @returns An array of all stored addresses.
 */
// function getAllAddresses(): AddressSchema[] {
export function getAllAddresses(): AddressInput[] {
    return addressList;
}

/**
 * Updates an existing address by ID.
 * @param id - The ID of the address to update.
 * @param updatedData - The new address data to merge with the existing record.
 * @returns The updated address object, or null if not found.
 */
// function updateAddress(id: number, updatedData: Partial<AddressSchema>): AddressSchema | null {
export function updateAddress(id: number, updatedData: Partial<AddressInput>): AddressInput | null {
    // Find index of the address with the given ID
    const index = addressList.findIndex(address => address.id === id);

    // If not found, return null
    if (index === -1) {
        console.error(`Address with ID ${id} not found.`);
        return null;
    }

    // Merge existing data with new updates
    addressList[index] = { ...addressList[index], ...updatedData };

    // Return the updated address
    return addressList[index];
}

/**
 * Deletes an address by ID.
 * @param id - The ID of the address to delete.
 * @returns True if the address was deleted, false if not found.
 */
export function deleteAddress(id: number): boolean {
    // Find index of the address with the given ID
    const index = addressList.findIndex(address => address.id === id);

    // If not found, return false
    if (index === -1) {
        console.error(`Address with ID ${id} not found.`);
        return false;
    }

    // Remove the address from the array
    addressList.splice(index, 1);
    return true;
}

// Example usage:
const newAddress: AddressInput = {
    street: "456 Elm St",
    number: "12B",
    neighborhood: "Uptown",
    city: "Metropolis",
    zip_code: "54321-876",
    state: "California",
    employee: null
};

const validatedData = addressSchema.parse(newAddress)


// CREATE
//console.log(createAddress(validatedData));

// GET BY ID
const retrievedAddress = getAddressById(1);
console.log(retrievedAddress);

// GET ALL
console.log(getAllAddresses());

// UPDATE
const updatedAddress = updateAddress(1, { city: "New Gotham", zip_code: "11111-222" });
console.log(updatedAddress);

// DELETE
const isDeleted = deleteAddress(1);
console.log(`Deleted: ${isDeleted}`);
