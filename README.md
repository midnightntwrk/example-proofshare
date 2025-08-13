# Example Proofshare dApp

🚧 🚧 🚧  
This GitHub repository is actively under construction. It will provide a privacy-focused smart contract and dApp prototype demonstrating selective disclosure of personal data using Midnight Network.
This template is meant to be an example for developers to understand how Compact and MidnightJS work and is not intended for production.  
🚧 🚧 🚧

## Overview

This project simulates a real-world scenario where individuals or families can selectively disclose only the necessary parts of their personal or dependent data—such as for signing up for daycare, applying for a job, or registering at a new clinic—while keeping all other information private.

It demonstrates a core concept of **selective disclosure** using a zero-knowledge pattern, where the data owner proves something about their data (e.g., “this person is over 18 and has valid insurance”) without revealing the data itself unless explicitly required.

## What Is Selective Disclosure?

[Selective disclosure](https://docs.midnight.network/blog/web3-intro-selective-disclosure) is a privacy-preserving method where a user proves facts about their data without sharing all of it. This is especially powerful for sensitive applications like:

- Medical or school forms
- Rental applications
- Government ID renewals
- Employment onboarding

This dApp currently simulates that process using a mocked smart contract and off-chain logic in TypeScript.

## File Structure


```
├── README.md  
├── example-smart-contract.ts  
└── contract.compact
```

- `example-smart-contract.ts`: TypeScript file that contains the entire logic for the dApp, including mock data, disclosure circuits, and use case examples.
- `contract.compact`: A Compact smart contract implementing the on-chain logic for selective disclosure, structured to align with the simulated model in the TypeScript file. This contract is currently under construction, so any feedback is welcome!

  
### About `example-smart-contract.ts`

The `example-smart-contract.ts` file is a **mock smart contract** written in TypeScript. It’s designed as an educational tool to demonstrate what a smart contract _could_ look like before transitioning into a real implementation in Compact on the Midnight Network.

It follows smart contract patterns such as:

- Ledgers: storing user data
- Constructors: initializing that data
- Circuits: simulating verification and selective disclosure logic
- Off-chain logic: to perform the actual work while maintaining privacy boundaries

This is _not_ a deployable contract but a helpful step in understanding what your Compact contract will eventually do and how your dApp logic might call it.

### Features
- Simulated smart contract structure with **ledger**, **constructor**, and **circuits**
- Off-chain logic that performs **selective disclosure** from obfuscated personal data
- Mock dataset of a fictional user ("Riley") with dozens of personal data fields
- Example disclosure requests for:
    - Doctor’s office
    - Job application
    - Rental application
    - School enrollment
    - Government ID renewal

### How It Works

1. **Personal Data Ledger**  
    Simulates an on-chain or private data store with obfuscated personal information.
2. **Constructor Function**  
    Loads user data into the ledger (in this mock, Riley's data).
3. **Selective Disclosure Circuit**  
    Accepts a request indicating which fields to disclose and returns only those fields as valid, obfuscated results.
4. **Off-Chain Logic**  
    Implements the core selective disclosure functionality. Mimics the behavior of a zero-knowledge proof without full cryptographic infrastructure.
5. **Use Case Examples**  
    Simulate different real-world data requests by customizing disclosure profiles for various service providers.

### Structure Notes

- Types like `Opaque<T>` and `Maybe<T>` are defined to model obfuscated data and optional values.
- The `PersonalData` enum represents the full range of data that could be selectively disclosed, from name and age to medical history and employment records.
- `DisclosureRequest` is an array of booleans, with each index corresponding to a `PersonalData` enum value, indicating whether that field should be disclosed.
- The core logic lives in a function (`circuit_selective_disclosure`) that evaluates the request and returns only the permitted fields in a DisclosureResult.

### Development Best Practices Modeled

- Circuits should be pure and lightweight — no side effects or unnecessary iteration-heavy computation.
- Iteration and heavy logic should be moved off-chain or to dApp-side helpers.
- Smart contract functions should ideally only validate or return values, not mutate state directly (except in constructors or initializers).

## Concepts Demonstrated

- Privacy-first data architecture: Inspired by real-world needs to minimize oversharing of sensitive data.
- Smart contract patterning: Simulates how data can be verified and validated without exposure.
- User-centric disclosure: Data owner remains in control at all times.

## Example Use Case: Doctor's Office

Instead of filling out a full medical history form, the user can choose to share just the relevant fields:

```
doctorDisclosureRequest[PersonalData.name] = true; doctorDisclosureRequest[PersonalData.age] = true; doctorDisclosureRequest[PersonalData.healthRecords] = true;
```
This keeps everything else—like social security number, address, or employment history—hidden and safe.

## Future Work

This mock serves as a stepping stone toward a full dApp using Midnight's privacy-preserving stack. Future enhancements will include:

- Writing a functional actual smart contract using Compact
- Integrating real zero-knowledge proofs
- Adding a front-end UI for user interaction and data requests
- Implementing APIs or a storage layer for private off-chain data management

## Built With

- Compact
- TypeScript
- Midnight smart contract architecture (modeled via Compact pattern)
- Privacy-first dApp design principles

## Further Reading:
 - [Midnight Dev Diaries: Understanding Selective Disclosure](https://docs.midnight.network/blog/web3-intro-selective-disclosure)

## Authors
- Developed by Samantha Holstine
