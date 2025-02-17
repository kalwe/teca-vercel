// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

generator zod {
  provider = "prisma-zod-generator"
  output   = "../src/schemas/zod-generated"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Gender {
  MALE
  FEMALE
  UNDEFINED
}

enum Marital {
  SINGLE
  MARRIED
  DIVORCED
  LIVING_TOGETHER
  STABLE_UNION
  WIDOWER
}

enum Role {
  ADMIN
  USER
}

model User {
  id              Int       @id @default(autoincrement())
  active          Boolean   @default(true)
  createdAt       DateTime  @default(now()) @db.Timestamp(0) @map("created_at")
  updatedAt       DateTime? @updatedAt @map("updated_At")
  deletedAt       DateTime? @map("deleted_at")
  email           String
  name            String
  password        String
  role            Role      @default(USER)
  permission      PermissionOnUser[]

  @@unique([email, name])
  @@map("user")
}

model Permission {
  id          Int     @id @default(autoincrement())
  name        String
  description String?
  users       PermissionOnUser[]

  @@map("permission")
}

model PermissionOnUser {
  user          User          @relation(fields: [userId], references: [id])
  userId        Int
  permission    Permission    @relation(fields: [permissionId], references: [id])
  permissionId  Int
  assignedAt    DateTime      @default(now())
  assignedBy    String

  @@id([userId, permissionId])
  @@map("permission_on_user")
}

model Function {
  id      Int       @id @default(autoincrement())
  active  Boolean   @default(true)
  name    String

  @@map("function")
}

// TODO: implements function to set relations field active=false, instead use onDelete=Cascade
model Employee {
  id            Int       @id @default(autoincrement())
  active        Boolean   @default(true)
  createdAt     DateTime  @default(now()) @db.Timestamp(0) @map("created_at")
  updatedAt     DateTime? @updatedAt @map("updated_At")
  deletedAt     DateTime? @map("deleted_at")
  name          String
  registration  String
  supervisor    Boolean   @default(false)
  manager       Boolean   @default(false)
  salary        Decimal   @db.Money
  contractDate  String    @map("contract_date")
  removalDate   String    @map("removal_date")
  functionId    Int       @map("function_id")
  address       Address?
  contact       Contact?
  bank          Bank?
  clothing      Clothing?
  overtime      Overtime?
  gender        Gender
  marital       Marital

  @@map("employee")
}

model Address {
  id            Int       @id @default(autoincrement())
  street        String
  number        String
  neighborhood  String
  city          String
  postCode      String
  state         String
  employee      Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  employeeId    Int       @unique @map("employee_id")

  @@map("address")
}

model Contact {
  id            Int       @id @default(autoincrement())
  phone         String
  email         String
  webSite       String
  employee      Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  employeeId    Int       @unique @map("employee_id")

  @@map("contact")
}

// salario, corrente, conjunta
enum AccountType {
  SALARIO
  CORRENTE
  CONJUNTA
  POUPANCA
  UNIVERSITARIA
  EMPRESARIAL
}

model Bank {
  id            Int           @id @default(autoincrement())
  bank          String
  agency        String
  account       String
  type          AccountType
  employee      Employee      @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  employeeId    Int           @unique @map("employee_id")

  @@map("bank")
}

enum Sizes {
  PP
  P
  M
  G
  GG
}

model Clothing {
  id            Int       @id @default(autoincrement())
  shirt         String
  pants         String
  shoes         String
  employee      Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  employeeId    Int       @unique @map("employee_id")

  @@map("clothing")
}

model Resume {
  id            String     @id @default(uuid())
  createdAt     DateTime   @default(now()) @map("created_at")
  updatedAt     DateTime?  @updatedAt @map("updated_at")
  bucket        String
  name          String
  type          String
  url           String

  @@map("resume")
}

model Name {
  id    Int   @id   @default(autoincrement())

  @@map("name")
}

model Vacancy {
  id            Int       @id @default(autoincrement())
  active        Boolean   @default(true)
  createdAt     DateTime  @default(now()) @db.Timestamp(0) @map("created_at")
  updatedAt     DateTime? @updatedAt @map("updated_at")
  deletedAt     DateTime? @map("deleted_at")
  quantity      Int
  position      String
  description   String
  requirements  String
  benefits      String
  salary        Decimal   @db.Money

  @@map("vacancy")
}

model Overtime {
  id            Int       @id   @default(autoincrement())
  hoursWorked   Int?
  hoursOvertime Int?
  hoursBalance  Int?
  date          String
  employee      Employee  @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  employeeId    Int       @unique

  @@map("overtime")
}

model Reminder {
  id          Int         @id @default(autoincrement())
  active      Boolean     @default(true)
  createdAt   DateTime    @default(now()) @db.Timestamp(0) @map("created_at")
  updatedAt   DateTime?   @updatedAt @map("updated_at")
  deletedAt   DateTime?   @map("deleted_at")
  date        String
  time        String?
  reason      String
  description String?

  @@map("reminder")
}
