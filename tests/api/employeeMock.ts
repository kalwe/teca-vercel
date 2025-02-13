// import { employeeSchema } from "@/app/schemas/employeeSchema"
// import { deletedJson } from "../data/employee"
import { AddressTypeMock } from "./addressMock"
import { ContactTypeMock } from "./contactMock"
import { BankAccountType } from "../../src/app/types/bankAccount"
import { ClothingType } from "../../src/app/types/clothing"


// type FunctionType = {
//   id: string
//   name: string
// }

enum GenderEnum {
  male = 'Masculino',
  female = 'Feminino',
  other = 'Outro',
  not_given = 'Não informado',
}

enum MaritalStatusEnum {
  SINGLE = 'Solteiro',
  MARRIED = 'Casado',
  DIVORCED = 'Divorciado',
  LIVING_TOGETHER = "Amasiado/Concubinado",
  STABLE_UNION = "União Estável",
  WIDOWER = "Viúvo",
}

type PersonType = {
  full_name: string
  tax_id: string
  national_id: string
  date_of_birth: Date | null
  issuing_body: string
  gender: GenderEnum
  marital_status: MaritalStatusEnum
}

// Define the EmployeeTypeMock type based on the JSON schema
type EmployeeTypeMock = {
  active: boolean
  position: string
  full_name: string
  id?: number
  person: PersonType // TODO: should inherence person type
  name: string
  registration: string
  supervisor: boolean
  manager: boolean
  salary: number
  contract_date: Date
  removal_date: Date
  function: number
  address: AddressTypeMock
  contact: ContactTypeMock
  bank: BankAccountType
  clothing: ClothingType
}

// Employee storage array
const employeeList: EmployeeTypeMock[] = []

// employeeSchema = EmployeeSchema


// function createEmployee(newEmployee: EmployeeSchema): EmployeeSchema[] {
export function createEmployeeMock(data_mock: EmployeeTypeMock): EmployeeTypeMock[] {
    data_mock.id = Math.floor(Math.random() * 6) + 1
    data_mock.supervisor = false
    data_mock.manager = false
    data_mock.active = true
    // const validatedEmployee = employeeSchema.parse(data_mock)
    // Add to the list
    employeeList.push(data_mock)

    return employeeList
}

// function getEmployeeById(id: number): EmployeeSchema | null {
export function getEmployeeByIdMock(id: number): EmployeeTypeMock | null {
    return employeeList.find(employee => employee.id === id) || null
}

// function getAllEmployees(): EmployeeSchema[] {
export function getAllEmployeesMock(): EmployeeTypeMock[] {
    return employeeList
}

// function updateEmployee(id: number, k: Partial<EmployeeSchema>): EmployeeSchema | null {
export function updateEmployeeMock(id: number, updated_data_mock: Partial<EmployeeTypeMock>): EmployeeTypeMock | null {
    // Find index of the employee with the given ID
    const index = employeeList.findIndex(employee => employee.id === id)

    // If not found, return null
    if (index === -1) {
        console.error(`Employee with ID ${id} not found.`)
        return null
    }

    updated_data_mock.supervisor = true
    updated_data_mock.manager = true

    // Merge existing data with new updates
    employeeList[index] = { ...employeeList[index], ...updated_data_mock }

    // Return the updated employee
    return employeeList[index]
}

export function deleteEmployeeMock(id: number): boolean {
    // Find index of the employee with the given ID
    const index = employeeList.findIndex(employee => employee.id === id)

    // If not found, return false
    if (index === -1) {
        console.error(`Employee with ID ${id} not found.`)
        return false
    }

    // Remove the employee from the array
    employeeList.splice(index, 1)
    // return deletedJson
    return true
}
