// TypeScript example demonstrating selective disclosure of personal data. 
// It defines a data type and a function to share only specific chosen details, 
// useful for forms at a doctor’s office, school, job applications, etc.

// ------------Ledger-------------

// In-memory ledger simulating a personal data database
let publicLedger: { data: PersonalDataStorage } = {
    data: {} as PersonalDataStorage
};

// ---------Witness------------

// Simulates fetching personal data (from a database in real life)
function witness_get_data(): PersonalDataStorage {
    return rileyData; // Riley’s data isn’t preloaded on-chain for privacy.
}


// -----------Constructor------------

// This function simulates the process of uploading personal data to the ledger.
function circuit_upload_data(): void {
    const data: PersonalDataStorage = witness_get_data();
    publicLedger.data = data;
}


// -----------Circuit------------
// Circuit simulating selective disclosure based on a request
function circuit_selective_disclosure(request: DisclosureRequest): DisclosureResult {
    // Retrieve the personal data from the ledger
    const data = witness_get_data();
    return perform_selective_disclosure(request, data); // Perform selective disclosure off-chain
}

// --------------------------------------------------------------------

// -------------Dapp Logic--------------
// dapp logic consists of: types and off-chain functions. 

// -------------Types--------------
type Opaque<T extends string> = string; // Opaque wrapper for obfuscated data
type Maybe<T> = {is_some: boolean; value?: T}; // Type for optional data
// PersonalData:
//  This enum defines various types of personal data that can be selectively disclosed.
export enum PersonalData {
    name,
    surname,
    age,
    email,
    phone,
    address,
    gender,
    maritalStatus,
    nickname,
    dateOfBirth,
    placeOfBirth,
    socialSecurityNumber,
    bankAccountNumber,
    creditCardNumber,
    passportNumber,
    driverLicenseNumber,
    healthInsuranceNumber,
    taxIdentificationNumber,
    // Medical-type information
    healthRecords,
    medicalConditions,
    height,
    weight,
    hairColor,
    eyeColor,
    familyMedicalHistory,
    allergies,
    medications,
    // Employment-related information
    employmentHistory,
    employmentStatus,
    salary,
    jobTitle,
    skills,
    languagesSpoken,
    hobbies,
    interests,
    references,
    educationHistory,
    criminalHistory,
    socialMediaProfiles,
    resume,
    coverLetter,
    profilePicture,
    length
}
// PersonalDataStorage represents a storage system for personal data, where each key is a directory handle
// and the value is an obfuscated string representing the personal data.
type PersonalDataStorage = Record<FileSystemDirectoryHandle, Opaque<"string">>;

type DisclosureRequest = boolean[]; // Array of booleans indicating which data to disclose

type DisclosureResult = Record<FileSystemDirectoryHandle, Maybe<Opaque<"string">>>; // Result of the disclosure request



//--------------Off-Chain Function--------------
function perform_selective_disclosure(request: DisclosureRequest, data: PersonalDataStorage): DisclosureResult {
    // Iterate over the request and selectively disclose data
    const result: Partial<DisclosureResult> = {};
    for (const [key, value] of Object.entries(data)) {
        const index = parseInt(key as string, 10);
        if (request[index]) {
            result[key] = { is_some: true, value }; // Disclose the data
        } else {
            result[key] = { is_some: false }; // Do not disclose the data
        }
    }
    return result as DisclosureResult;
}


// ------------Example usage--------------
// Personal input data for Riley (fictional person):
const rileyData: PersonalDataStorage = {
    [PersonalData.name]: "Riley",
    [PersonalData.surname]: "Smith",
    [PersonalData.age]: "30",
    [PersonalData.email]: "riley.smith@test.com",
    [PersonalData.phone]: "123-456-7890",
    [PersonalData.address]: "123 Main St, Anytown, USA",
    [PersonalData.gender]: "Non-binary",
    [PersonalData.maritalStatus]: "Single",
    [PersonalData.nickname]: "Riley",
    [PersonalData.dateOfBirth]: "1993-01-01",
    [PersonalData.placeOfBirth]: "Anytown, USA",
    [PersonalData.socialSecurityNumber]: "123-45-6789",
    [PersonalData.bankAccountNumber]: "987654321",
    [PersonalData.creditCardNumber]: "4111-1111-1111-1111",
    [PersonalData.passportNumber]: "X123456789",
    [PersonalData.driverLicenseNumber]: "D123456789",
    [PersonalData.healthInsuranceNumber]: "H123456789",
    [PersonalData.taxIdentificationNumber]: "T123456789",
    [PersonalData.healthRecords]: "Record1, Record2",
    [PersonalData.medicalConditions]: "Condition1, Condition2",
    [PersonalData.height]: "180cm",
    [PersonalData.weight]: "70kg",
    [PersonalData.hairColor]: "Blonde",
    [PersonalData.eyeColor]: "Green",
    [PersonalData.familyMedicalHistory]: "History1, History2",
    [PersonalData.allergies]: "Allergy1, Allergy2",
    [PersonalData.medications]: "Medication1, Medication2",
    [PersonalData.employmentHistory]: "Job1, Job2",
    [PersonalData.employmentStatus]: "Employed",
    [PersonalData.salary]: "100000",
    [PersonalData.jobTitle]: "Software Engineer",
    [PersonalData.skills]: "JavaScript, TypeScript, React, Compact",
    [PersonalData.languagesSpoken]: "English, Spanish",
    [PersonalData.hobbies]: "Reading, Hiking, Dancing, Cooking",
    [PersonalData.interests]: "Technology, Art, Musicm, Traveling",
    [PersonalData.references]: "Reference1, Reference2",
    [PersonalData.educationHistory]: "Degree1, Degree2",
    [PersonalData.criminalHistory]: "None",
    [PersonalData.socialMediaProfiles]: "Profile1, Profile2",
    [PersonalData.resume]: "Resume content",
    [PersonalData.coverLetter]: "Cover letter content",
    [PersonalData.profilePicture]: "profile-pic.jpg"
};

// Create a disclosure request for a new doctor's office form:
const doctorDisclosureRequest: DisclosureRequest = Array(PersonalData.length).fill(false);
// Only disclose name, surname, age, email, phone, address, health records, family medical history, medications, and allergies:
doctorDisclosureRequest[PersonalData.name] = true;
doctorDisclosureRequest[PersonalData.surname] = true;
doctorDisclosureRequest[PersonalData.age] = true;
doctorDisclosureRequest[PersonalData.email] = true;
doctorDisclosureRequest[PersonalData.phone] = true;
doctorDisclosureRequest[PersonalData.address] = true;
doctorDisclosureRequest[PersonalData.healthRecords] = true;
doctorDisclosureRequest[PersonalData.familyMedicalHistory] = true;
doctorDisclosureRequest[PersonalData.medications] = true;
doctorDisclosureRequest[PersonalData.allergies] = true;

// Run constructor to upload Riley's data to the ledger:
circuit_upload_data();
// Run the selective disclosure circuit with the doctor's office request:
const doctorDisclosureResult = circuit_selective_disclosure(doctorDisclosureRequest);
// Log the result of the selective disclosure for the doctor's office:
console.log("Doctor's Office Disclosure Result:");
for (const [key, value] of Object.entries(doctorDisclosureResult)) {
    if (value.is_some) {
        console.log(`${PersonalData[key]}: ${value.value}`);
    }
}


// Create a disclosure request for a new job application:
const jobDisclosureRequest: DisclosureRequest = Array(PersonalData.length).fill(false);
// Only disclose name, surname, email, phone, address, job title, skills,
//  languages spoken, references, education history, and resume:
jobDisclosureRequest[PersonalData.name] = true;
jobDisclosureRequest[PersonalData.surname] = true;
jobDisclosureRequest[PersonalData.email] = true;
jobDisclosureRequest[PersonalData.phone] = true;
jobDisclosureRequest[PersonalData.address] = true;
jobDisclosureRequest[PersonalData.jobTitle] = true;
jobDisclosureRequest[PersonalData.skills] = true;
jobDisclosureRequest[PersonalData.languagesSpoken] = true;
jobDisclosureRequest[PersonalData.references] = true;
jobDisclosureRequest[PersonalData.educationHistory] = true;
jobDisclosureRequest[PersonalData.resume] = true;
// Run the selective disclosure circuit with the job application request:
const jobDisclosureResult = circuit_selective_disclosure(jobDisclosureRequest);
// Log the result of the selective disclosure for the job application:
console.log("Job Application Disclosure Result:");
for (const [key, value] of Object.entries(jobDisclosureResult)) {
    if (value.is_some) {
        console.log(`${PersonalData[key]}: ${value.value}`);
    }
}

// Create a disclosure request for a new rental application:
const rentalDisclosureRequest: DisclosureRequest = Array(PersonalData.length).fill(false); 
// Only disclose name, surname, email, phone, address, employment status,
//  salary, references, and profile picture:
rentalDisclosureRequest[PersonalData.name] = true;
rentalDisclosureRequest[PersonalData.surname] = true;
rentalDisclosureRequest[PersonalData.email] = true;
rentalDisclosureRequest[PersonalData.phone] = true;
rentalDisclosureRequest[PersonalData.address] = true;
rentalDisclosureRequest[PersonalData.employmentStatus] = true;
rentalDisclosureRequest[PersonalData.salary] = true;
rentalDisclosureRequest[PersonalData.references] = true;
rentalDisclosureRequest[PersonalData.profilePicture] = true;
// Run the selective disclosure circuit with the rental application request:
const rentalDisclosureResult = circuit_selective_disclosure(rentalDisclosureRequest);
// Log the result of the selective disclosure for the rental application:
console.log("Rental Application Disclosure Result:");
for (const [key, value] of Object.entries(rentalDisclosureResult)) {
    if (value.is_some) {
        console.log(`${PersonalData[key]}: ${value.value}`);
    }
}

// Create a disclosure request for a new school enrollment:
const schoolDisclosureRequest: DisclosureRequest = Array(PersonalData.length).fill(false);
// Only disclose name, surname, age, email, phone, address, date of birth,
//  education history, and profile picture:
schoolDisclosureRequest[PersonalData.name] = true;
schoolDisclosureRequest[PersonalData.surname] = true;
schoolDisclosureRequest[PersonalData.age] = true;
schoolDisclosureRequest[PersonalData.email] = true;
schoolDisclosureRequest[PersonalData.phone] = true;
schoolDisclosureRequest[PersonalData.address] = true;
schoolDisclosureRequest[PersonalData.dateOfBirth] = true;
schoolDisclosureRequest[PersonalData.educationHistory] = true;
schoolDisclosureRequest[PersonalData.profilePicture] = true;
// Run the selective disclosure circuit with the school enrollment request:
const schoolDisclosureResult = circuit_selective_disclosure(schoolDisclosureRequest);
// Log the result of the selective disclosure for the school enrollment:
console.log("School Enrollment Disclosure Result:");
for (const [key, value] of Object.entries(schoolDisclosureResult)) {        
    if (value.is_some) {
        console.log(`${PersonalData[key]}: ${value.value}`);
    }
}


// Create a disclosure request for renewing a government ID:
const idRenewalDisclosureRequest: DisclosureRequest = Array(PersonalData.length).fill(false);
// Only disclose name, surname, age, email, phone, address, date of birth,
//  social security number, passport number, and driver license number:
idRenewalDisclosureRequest[PersonalData.name] = true;
idRenewalDisclosureRequest[PersonalData.surname] = true;
idRenewalDisclosureRequest[PersonalData.age] = true;
idRenewalDisclosureRequest[PersonalData.email] = true;
idRenewalDisclosureRequest[PersonalData.phone] = true;
idRenewalDisclosureRequest[PersonalData.address] = true;
idRenewalDisclosureRequest[PersonalData.dateOfBirth] = true;
idRenewalDisclosureRequest[PersonalData.socialSecurityNumber] = true;
idRenewalDisclosureRequest[PersonalData.passportNumber] = true;
idRenewalDisclosureRequest[PersonalData.driverLicenseNumber] = true;
// Run the selective disclosure circuit with the ID renewal request:
const idRenewalDisclosureResult = circuit_selective_disclosure(idRenewalDisclosureRequest);
// Log the result of the selective disclosure for the ID renewal:
console.log("ID Renewal Disclosure Result:");
for (const [key, value] of Object.entries(idRenewalDisclosureResult)) {
    if (value.is_some) {
        console.log(`${PersonalData[key]}: ${value.value}`);
    }
}
